const puppeteer = require("puppeteer");

const IDC_URL = "https://my.idc.ac.il/my.policy#/?lang=english";

let browser;
let context;
let page;

const initConnection = async () => {
  browser = await puppeteer.launch();
  context = await browser.createIncognitoBrowserContext();
  page = await context.newPage();
};

const loginToIDC = async (userName, password) => {
  await page.goto(IDC_URL);

  try {
    await page.click("div[id=newSessionDIV] > a");
    await page.waitForSelector("input[name=username]");
  } catch { }

  await page.type("input[name=username]", userName);
  await page.type("input[name=password]", password);
  await page.click("input[value=Logon]");
};

const fetchGrade = async () => {
  await page.goto(IDC_URL);
  await page.waitForSelector(".exam_row .title");

  const courseName = await page.evaluate(
    (element) => element.innerHTML,
    await page.$(".exam_row .title")
  );

  const courseGrade = await page.evaluate(
    (element) => element.innerHTML,
    await page.$(".exam_row .number")
  );

  return {
    courseName,
    courseGrade
  }
};

const closeConnection = async () => {
  await browser.close();
};

const fetchGradeFromIDC = async (userName, password) => {
  console.log("initialize connection");
  await initConnection();
  console.log(`logging into ${IDC_URL}`);
  await loginToIDC(userName, password);
  console.log('fetching latest grade');
  const grade = await fetchGrade();
  console.log('closing connection');
  await closeConnection();
  return grade;
};

export default fetchGradeFromIDC;

