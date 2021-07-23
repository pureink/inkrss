<p align="center">
    <h1 align="center">INK RSS</h1>
</p>
  <p align="center">
    管理订阅，接收通知
    <br />
    <br />
    <a href="https://channel.1nk.workers.dev/channel">示例网页</a>
    ·
    <a href="https://t.me/inkrss_chat">
    示例群组</a>
    ·
    <a href="https://github.com/pureink/inkrss/issues">报告Bug</a>
  </p>
    <p align="center">
<img src="https://img.shields.io/github/license/pureink/inkrss?style=for-the-badge"/>
</p>

- [介绍](#介绍)
- [特点](#特点)
- [项目背景](#项目背景)
- [TODO](#todo)
- [注意事项](#注意事项)
- [部署](#部署)
- [额外附赠](#额外附赠)
- [使用建议](#使用建议)
- [调查](#调查)
- [贡献](#贡献)
- [作者](#作者)
- [协议](#协议)

## 介绍

INK RSS 提供及时且多样的 rss 通知服务，借助现有的接口你可以在任意位置订阅，并使用任意方式接收通知，并且所有服务均开源且免费。

已包含的订阅方式：
网页，telegram bot

已实现的通知方式：telegram（支持instant view），bark，微信

## 特点

🎊 **免费** - 整个应用部署在 cloudflare workers（包括前后端，机器人）

⚡️ **即时** - 最短一分钟进行一次监测。

♻️ **省心** - serverless，无需管理服务器和数据库。

🎨 **定制** - 多种订阅和通知方式，包括不限于 telegram，bark，微信

## 项目背景

部分 rss 提供者并没有提供全文输出，在阅读器订阅此类信息体验并不完整。随着 rsshub 的出现，更多种的信息可以被订阅。这些源或许更适合被动接收更新。

大部分阅读器并不提供通知功能，因为这需要后端定时去获取，inoreader 等功能强大的软件提供此服务，但即使每月支出\$6.99,也只有 60 分钟的刷新周期保证。IFTTT 是个好选择，但它无法保证延迟并且在去年（2020）只对免费用户提供三个 Applet。

telegram 有不少开源的机器人，使用公益公开的机器人，隐私安全是一小方面，telegram 对机器人发送信息频率有限制，一个服务器往往也不能保证所有人的订阅即时更新，也无法保证稳定性。自行部署可以解决以上问题但服务器和数据库的支出和维护也不是小问题，通知方式和订阅方式也局限于 telegram。

## TODO

-   [ ] 关键词过滤

-   [ ] 翻译功能

-   [ ] 多语言支持

## 注意事项

1. 对于所有项目都可以使用网页进行订阅

    <img src="https://user-images.githubusercontent.com/44235276/126451080-1c16cc60-9f7e-4423-b67a-ce8b26134a90.gif" alt="screen" style="zoom: 50%;" />

2. 使用 telegram 不仅可以使用网页，还包含借助 telegraph 提供的即时预览功能（instant view）以及一个提供增删查功能的机器人。部署后访问

    ```
    https://api.telegram.org/bot<your token>/setwebhook?url=https://example.com/secret_path
    ```

    即可开始使用 bot 进行订阅，注意替换 token 以及 url

3. 连续更新 15 次失败后将会收到错误通知，并将暂时关闭此订阅源更新，如确认订阅源无误，可自行在网页中开启更新。如无法确保订阅源的高可用性，也可在配置中调高此数值。

4. 由于 workers 的限制，无法自行解析 xml，需要配置 PARSE_URL 用于提供解析功能，可以点击以下按钮自行部署，或者适量使用我已部署的 https://inkrssparse.vercel.app

<p align="center"><a href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fpureink%2Finkrss%2Ftree%2Fmain%2Fparse"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a></p>

5. 需要配置 SECRET_PATH,网页将部署在https://inkrss.example.workers.dev/secret_path，请仅使用大小写字母和数字进行编写。

## 部署

本项目不依赖于本地环境，但需要在本地进行打包和上传，推荐使用 mac os 系统或者 linux 系统进行以下操作。

-   前期准备

1. 在[官网](https://workers.cloudflare.com)注册 cloudflare 账号，验证邮箱后找到 workers 界面，选择一个子域如 inkrss.workers.dev 即可。
2. 畅通无阻的网络。

3. 安装 wrangler


    推荐根据[官方文档](https://github.com/cloudflare/wrangler)进行安装，以避免不确定的问题。

    在[nodejs 官网](https://nodejs.org/zh-cn/)安装 nodejs（选择长期支持版即可）安装后运行

    ```bash
    npm i @cloudflare/wrangler -g
    ```

    如果在命令行输入以下命令成功输出版本号，即安装成功。

    ```
    wrangler -V
    ```

4.  wrangler 登录

    ```
    wrangler login
    ```

    在一般情况下，会打开浏览器申请授权，授权后即成功登陆，可以跳转到下一步。但有些情况 wrangler 会收不到返回的 token，此时应使用另一种方式登陆.

    在[api tokens 界面](https://dash.cloudflare.com/profile/api-tokens) 找到创建令牌，选择编辑 cloudflare workers 模版，账户资源选择所有账户，区域资源选择所有区域其他默认即可点击确定并复制 api token。


    ```bash
    wrangler config
    ```

    ![login](https://user-images.githubusercontent.com/44235276/126451261-50b79eda-90f3-462e-8af4-2feaa0fe8ee6.png)

-   开始部署

1.  克隆本项目并解压，在文件夹目录打开命令行（windows 用户可直接在资源管理器输入 cmd 并回车）

    ```
    wrangler kv:namespace create "KV"
    ```

    根据提示将输出的内容粘贴在 wrangler.toml 文件中 kv_namespaces 位置。

2.  配置

    在 cloudflare 网页找到自己的 account id,粘贴在 wrangler.toml 的对应位置。

    ![api screenshot](https://user-images.githubusercontent.com/44235276/126452407-8f7fb995-1ba1-4daf-91c5-d931e893ccc6.png)

    选择你的通知方式，出于覆盖性考虑目前支持以下方式，将支持 Slack，Discord，钉钉等其他通知方式。

    -   telegram（包括即时预览和机器人订阅，功能丰富，受限于网络）
    -   bark（部署最便捷，受限于平台）
    -   wechat（部署较麻烦，仅支持纯文本，适用性广）

    首先在 config.js 中修改 mode 为你想要的通知方式，然后在 config 文件夹的指定文件夹中根据 readme 配置变量。

3.  发布

    ```
    wrangler publish
    ```

    ![publish](https://user-images.githubusercontent.com/44235276/126451441-6af7df11-ae99-4bae-bad5-e1db46de1ef8.png)

    wrangler 会自动安装相应的依赖，进行打包和上传，并返回一个部署好的 url,之后就可以立即在https://ink-rss.xxx.workers.dev/secret_path 访问到前端进行订阅.但由于cloudflare的一些延迟，定时计划可能在半小时后才会开始运行

## 额外附赠

-   [IOS 桌面小插件](https://github.com/pureink/scripts/tree/master/scriptable/inkrss)


    <p align="center">
    <img src="https://user-images.githubusercontent.com/44235276/126298401-3370afa4-878d-4243-a587-302e60a19fa3.png" alt="screenshot" width="50%"/></p>

      默认部署后的 url 很长，使用此小部件可以一键跳转，并展示基本信息。


- 功能丰富的telegram bot（还没有做完）

    cloudflare workers开发机器人只能使用过时的框架并且开发体验较差。目前仅支持四个命令/list /sub /unsub /unsuball

    具有完整功能以及行内键盘支持的机器人将部署在其他无服务器平台

## 使用建议

-   由于对 cpu 时间的限制，cloudflare worker 会分批进行监测，如果订阅数过多，或者希望多渠道接收消息，只需要在 wrangler.toml 中修改名称重新部署即可部署多个 worker。
-   频繁的通知提醒会打扰到正常的生活，建议适量订阅。
-   建议和阅读器结合使用。

## 调查

此开源方案在功能上解决了问题，但多人订阅相同源，必然会造成带宽的浪费并对源站造成压力。如 websub（原 pubsubhubbub）这样的方案我认为太过理想，大部分已使用的协议很难发生变化，我认为存在更合适的过渡方案，请协助填写此[问卷](https://we7wfgpi9so.typeform.com/to/NeSpJMyn)帮助我了解 RSS 用户。

## 贡献

本项目仍在起步阶段，无论是机器人，前端后端的交互，还是 worker 的逻辑和功能都可能有所缺陷，任何贡献都将起到帮助。

## 作者

21 岁，是学生。

[@pureink](https://github.com/pureink)

## 协议

The MIT License.
