const CONFIG = require('../config.json');
const { default: Axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

const telegramBotKey = CONFIG.telegram.botKey;
const telegramBotName = CONFIG.telegram.botName;

const TELEGRAM_API = 'https://api.telegram.org';
const START_BOT_LINK = `https://t.me/${telegramBotName}`;
const WELCOME_MESSAGE = "Hello! I will send you a message once a new grade is posted.";

const startConversation = async () => {
    const userId = uuidv4();

    logger.log(`Enter this link to start the Telegram bot: ${START_BOT_LINK}?start=${userId}`);

    logger.log("Waiting for bot to respond...");
    while (true) {
        const response = await Axios.get(`${TELEGRAM_API}/bot${telegramBotKey}/getUpdates`);
        const chatId = await findChatIdByUserId(response.data, userId);
        if (chatId) {
            sendMessage(WELCOME_MESSAGE, chatId);
            logger.debug(`bot sent welcome messsage to user with id: ${userId}`);
            return chatId;
        }
    }
}

const sendMessage = async (message, chatId) => {
    const sendMessageUrl = encodeURI(`${TELEGRAM_API}/bot${telegramBotKey}/sendMessage?chat_id=${chatId}&text=${message}`);
    const response = await Axios.post(sendMessageUrl);
    return response;
}

const sendGradeMessage = async (grade, chatId) => {
    const gradeMessage = `Your grade in ${grade.courseName} is ${grade.courseGrade}`;
    const response = sendMessage(gradeMessage, chatId);
    logger.debug(`Telegram bot posted a new grade: ${JSON.stringify(grade)}`);
    return response;
}

const findChatIdByUserId = async (messages, userId) => {
    let chatId;

    const allMessages = messages.result;
    allMessages.forEach(messageItem => {
        const text = messageItem.message.text;
        if (text.includes(userId)) {
            chatId = messageItem.message.chat.id;
            return chatId;
        }
    });

    return chatId;
}

module.exports = { startConversation, sendMessage, sendGradeMessage };