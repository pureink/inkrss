//3 subrequest to send a telegraph link
import { config } from '../config'
export async function telegraph(item) {
    const getnode = await fetch(`${config.PARSE_URL}/api/html2node`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ content: item.content }),
    })
    const node = await getnode.text()
    const gettelegraph = await fetch('https://api.telegra.ph/createPage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author_name: item.author || 'ink-rss',
            content: node,
            title: item.title,
            access_token: config.TELEGRAPH_TOKEN,
        }),
    })
    const telegraph = await gettelegraph.json()
    return telegraph.result.url
}
