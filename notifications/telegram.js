import { config } from "../config";
const Telegram = require("telegraf/telegram");
import { telegraph } from "../utils/telegraph";
import { html } from "../utils/html";
let sendto = config.TG_SENDID;
export async function reply(feed, item) {
  const telegram = new Telegram(config.TG_TOKEN);
  await telegram.sendMessage(
    sendto,
    `<b>${html(feed.title)}</b>\n${html(item.title)}\n${
      feed.telegraph
        ? item.content
          ? `<a href="${await telegraph(item)}">telegraph</a>`
          : ""
        : ""
    }  ${item.link ? `<a href="${item.link}">origin</a>` : ""}`,
    { parse_mode: "HTML" }
  );
}
export async function replyWhenError(feed) {
  const telegram = new Telegram(config.TG_TOKEN);
  await telegram.sendMessage(
    sendto,
    `<b>${html(feed.title)}</b>\n 连续多次失败，将暂停更新，请检查订阅源是否正常。`,
    { parse_mode: "HTML" }
  );
}
