# 📚 Grade Notifier Bot
Grade Notifier Bot is a Telegram bot written in Node.js, it notifies when new grade is posted on IDC's website.
</br>
This bot was created so IDC students wouldn't have to constantly refresh the IDC website while waiting for their exam grades to be published.

# How to run
You can run the bot by executing the following commands:
```
$ git clone https://github.com/shacharyaron/grade-notifier-bot.git
$ cd grade-notifier-bot
$ npm install
$ npm start
```
**:rotating_light: IMPORTANT NOTE:**<br>
In order for the bot to run, you must add a ```config.json``` file into the root directory, the file should have the following properties :
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


# Use case :calling:
1. Run the bot
2. Follow the link to start chatting with the bot on Telegram
<img width=750px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot1.jpg">

3. Click on the "START" button and wait for the bot to greet you
<img width=300px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot2.jpg">

4. Once a new grade is posted, the bot will send you a message :inbox_tray:
<img width=300px src="https://github.com/shacharyaron/grade-notifier-bot/blob/master/screenshots/screenshot3.jpg">
  
# License 
This project is licensed under the Apache-2.0 License :page_facing_up:.
