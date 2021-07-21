import { mode, config } from './config'
const { reply, replyWhenError } = require(`./notifications/${mode}`)
import { identify } from './utils/identify'
export async function handleScheduled(event) {
    const subraw = await KV.get('sub')
    let sub = JSON.parse(subraw)
    //kv has write limit (1000)
    sub.sort(() => Math.random() - 0.5)
    let j = 0
    for (let i = 0; i < sub.length; i++) {
        let kvupdate = false
        if (sub[i].active === true) {
            console.log(sub[i].title)
            try {
                const resp = await fetch(sub[i].url)
                const text = await resp.text()
                if (text.slice(0, 5) != '<?xml' && text.slice(0, 5) != '<rss ')
                    throw 'wrong xml'
                const id = identify(text)
                if (id != sub[i].id) {
                    const res = await fetch(
                        `${config.PARSE_URL}/api/xml2json`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json; charset=utf-8',
                            },
                            body: JSON.stringify({
                                url: sub[i].url,
                            }),
                        }
                    )
                    const data = await res.json()
                    for (let j = 0; j < data.items.length; j++) {
                        if (
                            new Date(data.items[j].pubDate) >
                            new Date(sub[i].lastUpdateTime)
                        ) {
                            await reply(sub[i], data.items[j])
                        }
                    }
                    sub[i].errorTimes = 0
                    sub[i].lastUpdateTime = data.items[0].pubDate
                    sub[i].id = id
                    kvupdate = true
                    //有一次更新就进行提交
                }
            } catch (err) {
                sub[i].errorTimes += 1
                if (sub[i].errorTimes >= config.maxErrorTimes) {
                    sub[i].active = false
                    await replyWhenError(sub[i])
                }
                await KV.put('sub', JSON.stringify(sub))
            }
            if (kvupdate === true) {
                await KV.put('sub', JSON.stringify(sub))
                break
            }
            j += 1
        }
        if (j === sub.length || j > 7) {
            break
        }
    }
}
