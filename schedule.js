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
    sub.lastUpdateTime = now;

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

        let items = (data.items || []);
        // Rankings feed, simply reverse the order of items
        if (sub.rankings) {
          items.reverse();
        }
        else {
          items = items.sort((a, b) => {
            // if `pubDate` exists
            if (a.pubDate && b.pubDate) {
              return new Date(a.pubDate) - new Date(b.pubDate)
            }

            return 0;
          });
          items = items.slice(Math.max(0, items.length - MAX_SUB_ITEMS));
        }

        // Filling _id in each item
        items.forEach(item => {
          // Preferred `id` field:  `guid` > `link` > `title`, as same logic as in identify()
          item._id = item.guid || item.link || item.title;
        });

        items = items.slice(items.findIndex(item => item._id == sub.lastUpdateItem) + 1);
        for (const item of items) {
          console.log('sending item ', item);
          !self.DEBUG_DISABLE_NOTIFY && await reply(sub, item);
          sub.lastUpdateItem = item._id;
        }
        sub.errorTimes = 0;
        sub.id = id;
        console.log('updating sub states: ', sub)
        await KV.put("sub", JSON.stringify(allSubs));
        break;
      }
    } catch (err) {
      console.error(err);
      sub.errorTimes += 1;
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
