export async function botUnSub(ctx) {
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
    if (msg.length == 0) {
        await ctx.reply('我需要的是url啦')
    } else {
        const subraw = await KV.get('sub')
        let sub = JSON.parse(subraw)
        if (sub.length == 0) {
            await ctx.reply('还没有进行过订阅')
        } else {
            const find = sub.findIndex(e => e.url === msg)
            if (find === -1) {
                await ctx.reply('没有找到相关到url')
            } else {
                sub.splice(find, 1)
                await KV.put('sub', JSON.stringify(sub))
                await ctx.reply('删除成功')
            }
        }
    }
}
