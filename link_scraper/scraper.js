const puppeteer = require("puppeteer");
const { promiseHooks } = require("v8");

async function scrape_links(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waittil: "load", timeout: 0 });
  await page.waitForSelector("body");
  const link_title = await page.$$eval("body >>> a", (el) => {
    return el.map((el) => el.textContent);
  });

  const link_url = await page.$$eval("body >>> a", (el) => {
    return el.map((el) => el.href);
  });

  await browser.close();

  const arr = [];
  const len = link_title.length;
  for (let index = 0; index < len; index++) {
    const element = link_title[index] + "," + link_url[index];
    arr.push(element);
  }
  console.log("No of links : " + len);
  console.log(arr.join());
}
const site = "https://www.w3schools.com/";
scrape_links(site);
