const CONFIG = require('../config.json');
const fetchGrade = require('./grade-fetch');
const logger = require('./logger')
const prompt = require('prompt-sync')({ sigint: true });
const telegramBot = require('./telegram-bot');

const APP_TITLE = `\n===============\n Telegram bot:\n===============\n`;

const gradePollingIntervalInMinutes = CONFIG.settings.gradePollingIntervalInMinutes || 10;
const gradePollingInterval = gradePollingIntervalInMinutes * 60 * 1000;
let userData;
let grade;

const getUserData = async () => {
    logger.log(APP_TITLE);

    if (!CONFIG.moodle.userName || !CONFIG.moodle.password) {
        logger.log("Fill in the folowing fields:\n");
    }

    const userName = CONFIG.moodle.userName || prompt('Moodle user name: ');
    const password = CONFIG.moodle.password || prompt('Moodle password: ');
    const chatId = await telegramBot.startConversation();

    return { userName, password, chatId };
}

const pollGrade = async () => {
    const newGrade = await fetchGrade(userData.userName, userData.password);
    if (!grade) {
        grade = newGrade;
    }

    if (newGrade.courseName != grade.courseName || newGrade.courseGrade != grade.courseGrade) {
        telegramBot.sendGradeMessage(newGrade, userData.chatId);
    }

    grade = newGrade;
}

(async () => {
    userData = await getUserData();
    pollGrade();
    setInterval(pollGrade, gradePollingInterval);
})();