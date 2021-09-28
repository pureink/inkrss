//choose telegram / wechat / bark

export const mode = NOTIFIER || "bark"

export const config = {
    maxErrorCount: 15,
    PARSE_URL,
    SECRET_PATH,
    ...require(`./config/${mode}`).default,
}
