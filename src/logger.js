const moment = require('moment');
const colors = require('colors');

const DATE_FORMAT = "DD-MM-YY HH:mm";

const log = (message) => {
    const coloredMessage = colors.white(message);
    console.log(coloredMessage);
}

const debug = (message) => {
    const time = moment().format(DATE_FORMAT);
    const coloredMessage = colors.grey(`[${time}]: ${message}`);
    console.log(coloredMessage);
}

module.exports = { log, debug };