const puppeteer = require("puppeteer");

const IDC_URL = "https://my.idc.ac.il/my.policy#/?lang=hebrew";

let browser;
let context;
let page;

const initConnection = async () => {
  browser = await puppeteer.launch();
  context = await browser.createIncognitoBrowserContext();
  page = await context.newPage();
};

const login = async () => {
  await page.goto(IDC_URL);

  try {
    await page.click("div[id=newSessionDIV] > a");
    await page.waitForSelector("input[name=username]");
  } catch {}

  await page.type("input[name=username]", USER_NAME);
  await page.type("input[name=password]", PASSWORD);
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

  console.log(courseName);
  console.log(courseGrade);
};

const closeConnection = async () => {
  await browser.close();
};

const fetchGradeFromIDC = async () => {
  console.log("initialize connection");
  await initConnection();
  console.log(`logging into ${IDC_URL}`);
  await login();
  console.log('fetching latest grade');
  await fetchGrade();
  console.log('closing connection');
  await closeConnection();
};

fetchGradeFromIDC();
