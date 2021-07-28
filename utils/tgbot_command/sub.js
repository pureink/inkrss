import { identify } from '../identify'
import { config } from '../../config'
export async function botSub(ctx) {
    const subraw = (await KV.get('sub')) || '[]'
    let entities = ctx.update.message.entities
    let msg = ''
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].type == 'url') {
            msg = ctx.update.message.text.substring(
                entities[i].offset,
                entities[i].offset + entities[i].length
            )
            break
        }
    }
    let sub = JSON.parse(subraw)
    if (msg.length == 0) {
        await ctx.reply('请输入格式正确的订阅源')
    } else {
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
                await ctx.reply('已经订阅过此信息源')
            } else {
                const now = new Date()
                feed.lastUpdateTime = now
                const textres = await fetch(msg)
                feed.id = identify(await textres.text())
                sub.push(feed)
                await KV.put('sub', JSON.stringify(sub))
                await ctx.reply(`成功订阅${feed.title}`)
            }
        } else {
            await ctx.reply('订阅失败')
        }
    }
}