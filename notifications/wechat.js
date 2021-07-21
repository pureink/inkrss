import { config } from '../config'
export async function reply(feed, item) {
    await fetch(config.WECHAT_URL + `${feed.title}\n${item.title}`)
}
export async function replyWhenError(feed) {
    await fetch(
        config.WECHAT_URL +
            `${feed.title}\n连续多次失败，将暂停更新，请检查订阅源是否正常。`
    )
}
