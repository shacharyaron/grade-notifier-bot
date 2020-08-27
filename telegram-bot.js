const CONFIG = require('./config.json');
const { default: Axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

const TELEGRAM_API = 'https://api.telegram.org';
const START_BOT_LINK = 'https://t.me/idc_grade_notifier_bot';
const WELCOME_MESSAGE = "Hello! I will send you a message once a new grade is posted.";

const telegramBotKey = CONFIG.telegramBotKey;

const initBot = async () => {
    const uuid = uuidv4();
    let chatId = null;

    logger.log(`\nEnter this link to start the Telegram bot: ${START_BOT_LINK}?start=${uuid}`);
    logger.log("Waiting for bot to respond...\n");

    while (true) {
        const response = await Axios.get(`${TELEGRAM_API}/bot${telegramBotKey}/getUpdates`);
        chatId = await findChatIdByUuid(response.data, uuid);
        if (chatId) {
            await Axios.post(`${TELEGRAM_API}/bot${telegramBotKey}/sendMessage?chat_id=${chatId}&text=${WELCOME_MESSAGE}`);
            logger.debug("bot sent welcome messsage");

            return chatId;
        }
    }
}

const sendMessage = async (grade, chatId) => {
    const gradeMessage = `Your grade in ${grade.courseName} is ${grade.courseGrade}`;
    const chatUrl = encodeURI(`${TELEGRAM_API}/bot${telegramBotKey}/sendMessage?chat_id=${chatId}&text=${gradeMessage}`);
    const response = await Axios.post(chatUrl);

    logger.debug("nofity a new grade on Telegram");
}

const findChatIdByUuid = async (messages, uuid) => {
    let chatId;
    const messagesList = messages.result;
    messagesList.forEach(messageItem => {
        const text = messageItem.message.text;
        if (text.includes(uuid)) {
            chatId = messageItem.message.chat.id;
            return chatId;
        }
    });
    return chatId;
}

module.exports = {
    sendMessage,
    initBot
};