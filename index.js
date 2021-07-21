import { Router } from 'itty-router'
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import { handleScheduled } from './schedule'
import { config, mode } from './config'
import { identify } from './utils/identify'
import { setTgBot } from './bot'
const secret_path = config.SECRET_PATH
const router = Router()
if (mode === 'telegram') {
    setTgBot(router)
}

const errorHandler = error =>
    new Response(error.message || 'Server Error', {
        status: error.status || 500,
    })
router.get('/', async () => {
    return new Response('Only the wise can see this page', { status: 200 })
})
router.get(`/${secret_path}`, async (req, e) => {
    const data = await KV.get('sub')
    if (!data) {
        await KV.put('sub', '[]')
    }
    return await getAssetFromKV(e, {
        mapRequestToAsset: req => {
            let defaultAssetKey = mapRequestToAsset(req)
            let url = new URL(defaultAssetKey.url)
            url.pathname = url.pathname.replace(secret_path, '/')
            return new Request(url.toString(), defaultAssetKey)
        },
    })
})
router.get(`/${secret_path}/feeds`, async () => {
    const raw = await KV.get('sub')
    return new Response(raw, { status: 200 })
})
router.post(`/${secret_path}/subitem`, async req => {
    const subraw = (await KV.get('sub')) || '[]'
    let sub = JSON.parse(subraw)
    const body = await req.json()
    if (body.url === undefined) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Url not found',
            })
        )
    }
    const msg = body.url
    const resp = await fetch(`${config.PARSE_URL}/api/xml2json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            url: msg,
        }),
    })
    if (resp.status === 200) {
        let feed = {}
        const data = await resp.json()
        feed.title = data.title.replaceAll('\n', '')
        feed.url = msg
        feed.telegraph = false
        feed.active = true
        feed.errorTimes = 0
        if (
            sub.findIndex(e => e.url === feed.url) != -1 ||
            sub.findIndex(e => e.title === feed.title) != -1
        ) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: 'Already subscribed',
                })
            )
        } else {
            const now = new Date()
            feed.lastUpdateTime = now
            const textres = await fetch(msg)
            feed.id = identify(await textres.text())
            sub.push(feed)
            await KV.put('sub', JSON.stringify(sub))
            return new Response(
                JSON.stringify({
                    status: 0,
                    message: `${feed.title} add succeed`,
                })
            )
        }
    } else {
        return new Response(
            JSON.stringify({
                status: 400,
                message: "can't parse this url",
            })
        )
    }
})
router.post(`/${secret_path}/deleteitem`, async req => {
    const subraw = await KV.get('sub')
    let sub = JSON.parse(subraw)
    const body = await req.json()
    const url = body.url
    const index = sub.findIndex(e => e.url === url)
    if (index === -1) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Url not found',
            })
        )
    } else {
        sub.splice(index, 1)
        await KV.put('sub', JSON.stringify(sub))
        return new Response(
            JSON.stringify({
                status: 0,
                message: 'Delete succeed!',
            })
        )
    }
})
router.post(`/${secret_path}/active`, async req => {
    const subraw = await KV.get('sub')
    let sub = JSON.parse(subraw)
    const body = await req.json()
    const url = body.url || ''
    const state = body.state
    const index = sub.findIndex(e => e.url === url)
    if (index === -1 || state === undefined) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Please verify your input!',
            })
        )
    }
    sub[index].active = state
    sub[index].errorTimes = 0
    await KV.put('sub', JSON.stringify(sub))
    return new Response(
        JSON.stringify({
            status: 0,
            message: `修改成功，当前状态为 ${state ? 'on' : 'off'}`,
        })
    )
})
router.post(`/${secret_path}/telegraph`, async req => {
    const subraw = await KV.get('sub')
    let sub = JSON.parse(subraw)
    const body = await req.json()
    const url = body.url || ''
    const state = body.state
    const index = sub.findIndex(e => e.url === url)
    if (index === -1 || state === undefined) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: 'Please verify your input!',
            })
        )
    }
    sub[index].telegraph = state
    await KV.put('sub', JSON.stringify(sub))
    return new Response(
        JSON.stringify({
            status: 0,
            message: `修改成功，当前状态为 ${state ? 'on' : 'off'}`,
        })
    )
})
router.get('/test', async (req, e) => {
    e.waitUntil(handleScheduled(e))
})
router.get('*', async (req, e) => {
    try {
        return await getAssetFromKV(e)
    } catch (err) {
        return new Response('An unexpected error occurred', { status: 500 })
    }
})
addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request, e).catch(errorHandler))
})
addEventListener('scheduled', async event => {
    event.waitUntil(handleScheduled(event))
})
