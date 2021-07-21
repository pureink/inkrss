## TG_TOKEN

和@BotFather 对话，使用/newbot 进行创建，根据要求进行设定,我们需要的是创建成功后返回的 token。

## TELEGRAPH_TOKEN

用于提供即时预览，你可以直接访问此 url 获得

https://api.telegra.ph/createAccount?short_name=ink&author_name=inkrss

## TG_USERID

与@getuseridbot 对话，获取自己的 userid，机器人只识别此 id 发送的命令。

## TG_SENDID

为发送对象的 iD，可以是频道，群组或个人，频道需要先将 bot 加为管理员，要获取频道 ID，可以尝试在频道中发送信息，bot 收到此信息后，可以在

```
https://api.telegram.org/bot<修改为你的bot_token>/getUpdates
```

查看到 bot 最近收到的消息，其中包括频道 id
