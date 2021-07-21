import { config } from '../config'
export async function reply(feed, item) {
    await fetch(
        config.BARK_URL +
            encodeURIComponent(feed.title) +
            '/' +
            encodeURIComponent(item.title)
    )
}
export async function replyWhenError(feed) {
    await fetch(
        config.BARK_URL +
            feed.title +
            '/' +
            '连续多次失败，将暂停更新，请检查订阅源是否正常'
    )
}
