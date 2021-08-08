import { html} from "../html";
export async function botList(ctx) {
  let subraw = (await KV.get("sub")) || "[]";
  const sub = JSON.parse(subraw);
  if (sub.length == 0) {
    await ctx.reply("还没有进行过订阅");
  } else {
    let msg = "";
    for (let i = 0; i < sub.length; i++) {
      msg += `[${html(sub[i].title)}](${sub[i].url})\n`;
    }
    await ctx.reply(msg, { parse_mode: "HTML" });
  }
}
