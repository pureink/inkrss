import { mode, config } from "./config";
import { identify } from "./utils/identify";

const { reply, replyWhenError } = require(`./notifications/${mode}`);
const {
  SUB_ERROR_RETRY_INTERVAL_MIN,
  SUB_FETCH_INTERVAL_MIN,
  MAX_ERROR_COUNT,
  MAX_SUBS_PER_SCHEDULE,
  MAX_SUB_ITEMS,
  PARSE_URL,
} = config

export async function handleScheduled(event) {
  const subraw = await KV.get("sub");

  const allSubs = JSON.parse(subraw)

  const now = new Date();
  const filteredSubs = allSubs
    // Get all ACTIVE subs, also filter out recently failed subs
    .filter(s =>
      s.active === true
      && (now - new Date(s.lastUpdateTime)) > SUB_FETCH_INTERVAL_MIN * 60 * 1000
      && (
        s.errorTimes == 0
        || (now - new Date(s.lastUpdateTime)) > SUB_ERROR_RETRY_INTERVAL_MIN * 60 * 1000
      )
    )
    // sort picked subs by `lastUpdateTime`
    .sort((a, b) => a.lastUpdateTime - b.lastUpdateTime)
    // limit max subs to check in this run
    .slice(0, MAX_SUBS_PER_SCHEDULE);

  for (const sub of filteredSubs) {
    try {
      const resp = await fetch(sub.url);
      const text = await resp.text();
      const id = identify(text);
      console.log(`latest update  id of '${sub.title}': ${id}`);
      console.log(`kv update id of '${sub.title}': ${sub.id}`);
      if (id != sub.id) {
        const res = await fetch(`${PARSE_URL}/api/xml2json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            url: sub.url,
          }),
        });
        const data = await res.json();
        const items = (data.items || []).slice(0, MAX_SUB_ITEMS)
        for (const item of items) {
          // Not recommended to use `pubDate` as stop sign, due to:
          // - feeds don't sort items by `pubDate` values, e.g. https://rakuen.thec.me/PixivRss/weekly-10
          // - feeds don't provide correct `pubDate`, e.g. same timestamp for batch generated items
          // - feeds don't have `pubDate` field
          // Here we assume the items are maintained in desired order from feed provider.
          const { title, guid, link } = item;
          console.log('item info: ', [title, guid, link])
          // Preferred `id` field:  `guid` > `link` > `title`, as same logic as in identify()
          const itemId = guid || link || title;
          // Stop if we meet previous stored update id
          if (itemId && itemId == sub.id) {
            break
          }
          !self.DEBUG_DISABLE_NOTIFY && await reply(sub, item);
        }
        sub.errorTimes = 0;
        sub.lastUpdateTime = now;
        sub.id = id;
        console.log('updating sub states: ', sub)
        await KV.put("sub", JSON.stringify(allSubs));
        break;
      }
    } catch (err) {
      console.error(err);
      sub.errorTimes += 1;
      sub.lastUpdateTime = now;
      if (sub.errorTimes >= MAX_ERROR_COUNT) {
        console.log("error over max start notify");
        sub.active = false;
        await replyWhenError(sub);
        await KV.put("sub", JSON.stringify(allSubs));
        break;
      } else {
        await KV.put("sub", JSON.stringify(allSubs));
      }
    }
  }
}
