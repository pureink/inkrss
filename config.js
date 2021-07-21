//choose telegram / wechat / bark

export const mode = 'bark'

export const config = {
    maxErrorCount: 15,
    ...require(`./config/${mode}/config.json`),
}
