# grade-notifier-bot
Grade notifier bot is a node.js application which scans the grade list on your Moodle account every few minuites and check for updats regard new gradeds. Once a new grade is published, you would recieve a message on Telegram which announces you about your score.

# How to run
You can run the gallery by performing the following steps:
```
$ git clone https://github.com/shacharyaron/grade-notifier-bot.git
$ cd grade-notifier-bot
$ npm install
$ cd src\
$ node app.js
```
When you run the application you would be asked to enter your Moodle credentials, and intialize the connection through a given link:
1. Make sure you are connected to Telegram web
2. Follow the link to the next web page:
<kbd>
  <img width=750px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/run-bot-screenShot.jpg">
</kbd></br>
3. press "OPEN IN WEB" button</br>
4. in the open conversions press "strat"</br>
</br>
Congratulations! You don't waste your time on refresh Moodle web page anymore.

# License
This project is licensed under the Apache-2.0 License.
