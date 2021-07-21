import { botList } from './utils/tgbot_command/list'
import { botSub } from './utils/tgbot_command/sub'
import { botUnSub } from './utils/tgbot_command/unsub'
import { botUnSubAll } from './utils/tgbot_command/unsuball'
const { Telegraf } = require('telegraf')
import { config } from './config'
const bot = new Telegraf(config.TG_TOKEN)

bot.command('list', botList)
bot.command('sub', botSub)
bot.command('unsuball', botUnSubAll)
bot.command('unsub', botUnSub)
export function setTgBot(router) {
    router.post(`/${config.SECRET_PATH}`, async (req, e) => {
        const body = await req.json()
        if (body.message != undefined) {
            const msg = body.message
            let cmd = ''
            if (msg.entities != undefined) {
                for (let i = 0; i < msg.entities.length; i++) {
                    if (msg.entities[i].type == 'bot_command') {
                        cmd = msg.text.substring(
                            msg.entities[i].offset,
                            msg.entities[i].offset + msg.entities[i].length
                        )
                        break
                    }
                }
            }
            console.log(cmd)
            if (
                (cmd === '/unsub' ||
                    cmd === '/sub' ||
                    cmd === '/unsuball' ||
                    cmd === '/list') &&
                msg.chat.id == config.TG_USERID
            ) {
                await bot.handleUpdate(body)
                return new Response('ok', { status: 200 })
            } else {
                return new Response('ok', { status: 200 })
            }
        } else {
            return new Response('ok', { status: 200 })
        }
    })
}
