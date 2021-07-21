export async function botUnSubAll(ctx) {
    await KV.put('sub', '[]')
    await ctx.reply('全部订阅已删除')
}
