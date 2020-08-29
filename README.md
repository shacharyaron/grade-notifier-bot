# grade-notifier-bot
Grade Notifier Bot is a Node.js application that notifies whenever a new grade is posted on IDC's website.
</br>
This Telegram bot was created so IDC students wouldn't have to refresh the IDC website while waiting for their exam grades to be published.

# How to run
You can run the project by performing the following steps:
```
$ git clone https://github.com/shacharyaron/grade-notifier-bot.git
$ cd grade-notifier-bot
$ npm install
$ npm start
```
**IMPORTANT NOTE:**<br>
In order for the app to run, you must add a ```config.json``` file into the root directory, the file should have the following properties :
```
{
    "moodle": {
        "userName": "YOUR-USER-NAME-HERE", //NOT MANDATORY
        "password": "YOUR-PASSWORD-HERE" //NOT MANDATORY
    },
    "telegram": {
        "botName": "BOT-NAME-HERE",
        "botKey": "BOT-API-KEY-HERE"
    },
    "settings": {
        "gradePollingIntervalInMinutes": 10  //NOT MANDATORY
    }
}
```


# Use case

1. Run the bot

2. Follow the link to start chatting with the bot
<kbd>
  <img width=750px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot1.jpg">
</kbd>

3. After clicking on the "START", the bot will greet you
<kbd>
  <img width=300px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot2.jpg">
</kbd>

4. Once a new grade is posted, the bot will send you a message
<kbd>
  <img width=300px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot3.jpg">
</kbd>

# License
This project is licensed under the Apache-2.0 License.
