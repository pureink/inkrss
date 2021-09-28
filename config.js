//choose telegram / wechat / bark

export const mode = self.NOTIFIER || "bark"

export const config = {
    SUB_ERROR_RETRY_INTERVAL_MIN: self.SUB_ERROR_RETRY_INTERVAL_MIN || 5,   // 5 min
    SUB_FETCH_INTERVAL_MIN: self.SUB_FETCH_INTERVAL_MIN || 0,    // 0 min
    MAX_ERROR_COUNT: self.MAX_ERROR_COUNT || 15,
    MAX_SUBS_PER_SCHEDULE: self.MAX_SUBS_PER_SCHEDULE || 7,
    MAX_SUB_ITEMS: self.MAX_SUB_ITEMS || 10,
    PARSE_URL: self.PARSE_URL || "",
    SECRET_PATH: self.SECRET_PATH || "subs",
    ...require(`./config/${mode}`).default,
}
