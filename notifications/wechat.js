import { config } from "../config";
export async function reply(feed, item) {
  await fetch(
    `${config.WECHAT_URL}&msg_type=text&msg=${feed.title}\n${item.title}\n${item.link}`
  );
}
export async function replyWhenError(feed) {
  await fetch(
    `${config.WECHAT_URL}&msg_type=text&msg=${feed.title}\n连续多次失败，将暂停更新，请检查订阅源是否正常。`
  );
}
