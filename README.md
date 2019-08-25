# Discord Repo notifier

## Installation
1. clone repo
2. npm install
3. cp .env.dist .env
4. set all env variables
5. node app
6. go to repo settings -> webhooks
7. set create pull request webhook url to route `/pull-request/create`
8. set build status update webhook url to route `/build/status/update`
9. invite Discord bot to your channel using `https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=537361552` where CLIENTID is a bot client id