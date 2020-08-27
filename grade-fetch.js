const puppeteer = require("puppeteer");
const logger = require('./logger');

const IDC_URL = "https://my.idc.ac.il/my.policy#/?lang=english";

let browser;
let context;
let page;

const initConnection = async () => {
  browser = await puppeteer.launch();
  context = await browser.createIncognitoBrowserContext();
  page = await context.newPage();
}

const loginToIDC = async (userName, password) => {
  await page.goto(IDC_URL);

  //may occasionally appear for security reasons
  try {
    await page.click("div[id=newSessionDIV] > a");
  } catch { }

  await page.waitForSelector("input[name=username]");
  await page.type("input[name=username]", userName);
  await page.type("input[name=password]", password);
  await page.click("input[value=Logon]");
}

const getGradeFromIDC = async () => {
  await page.waitForSelector(".exam_list .title", { timeout: 90000 });

  const courseName = await page.evaluate(
    (element) => element.innerHTML,
    await page.$(".exam_list .title")
  );

  const courseGrade = await page.evaluate(
    (element) => element.innerHTML,
    await page.$(".exam_list .number")
  );

  const gradeInformation = {
    courseName,
    courseGrade
  }

  return gradeInformation;
}

const closeConnection = async () => {
  await browser.close();
}

const fetchGrade = async (userName, password) => {
  logger.debug(`initializing connection`);
  await initConnection();

  logger.debug(`logging into ${IDC_URL}`);
  await loginToIDC(userName, password);

  logger.debug('fetching latest grade');
  const grade = await getGradeFromIDC();

  logger.debug('closing connection');
  await closeConnection();

  return grade;
}

module.exports = fetchGrade;