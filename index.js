const CONFIG = require('./config.json');
const fetchGradeFromIDC = require('./grade-fetch');
const TelegramBot = require('./telegram-bot');
const logger = require('./logger')
const prompt = require('prompt-sync')({ sigint: true });
const { default: Axios } = require('axios');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const APP_TITLE = `\n===============
 Telegram bot:
===============\n`;

const minutes = 10;
const reconnectInterval = minutes * 60 * 1000;
let userData;
let grade;

const getUserData = async () => {
    logger.log(APP_TITLE);

    if (!CONFIG.moodleUserName || !CONFIG.moodlePassword) {
        logger.log("Fill in the folowing fields:\n");
    }

    const userName = CONFIG.moodleUserName || prompt('Moodle user name: ');
    const password = CONFIG.moodlePassword || prompt('Moodle password: ');
    const chatId = await TelegramBot.initBot();

    const userCredentials = {
        userName: userName,
        password: password,
        chatId: chatId
    };

    return userCredentials;
}

const pollGrade = async () => {
    const newGrade = await fetchGradeFromIDC(userData.userName, userData.password);
    if (!grade) {
        grade = newGrade;
        TelegramBot.sendGradeMessage(newGrade, userData.chatId);
    }

    if (newGrade.courseName != grade.courseName || newGrade.courseGrade != grade.courseGrade) {
        TelegramBot.sendGradeMessage(newGrade, userData.chatId);
    }

    grade = newGrade;
}

const app = async () => {
    userData = await getUserData();
    pollGrade();
    setInterval(pollGrade, reconnectInterval);
}

app();
