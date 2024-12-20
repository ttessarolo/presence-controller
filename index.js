import puppeteer from "puppeteer";
import envSchema from "env-schema";

const required = [
  "ROUTER_ADDRESS",
  "OVERVIEW_PAGE",
  "LOGIN_USERNAME",
  "LOGIN_PASSWORD",
  "PRESENCE_MAC_ADDRESSES"
];

const envConfig = envSchema({
  schema: {
    type: "object",
    properties: {
      ROUTER_ADDRESS: {
        type: "string"
      },
      OVERVIEW_PAGE: {
        type: "string",
        default: "/overview.html"
      },
      LOGIN_USERNAME: {
        type: "string"
      },
      LOGIN_PASSWORD: {
        type: "string"
      },
      PRESENCE_MAC_ADDRESSES: {
        type: "string",
        separator: ",",
        default: []
      }
    }
  },
  dotenv: true
});

const launchOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  args: ["--start-maximized", "--ignore-certificate-errors"]
};

const checkRequired = (config) => {
  required.forEach((key) => {
    if (!config[key]) {
      throw new Error(`Missing required config key: ${key}`);
    }
  });
};

const checkOverviewPage = (config) => {
  if (config.OVERVIEW_PAGE.startsWith("/")) {
    config.OVERVIEW_PAGE = config.OVERVIEW_PAGE.slice(1);
  }
};

async function getPresences(configOpts = {}) {
  const config = { ...envConfig, ...configOpts };

  checkRequired(config);
  checkOverviewPage(config);

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto(`https://${config.ROUTER_ADDRESS}/${config.OVERVIEW_PAGE}`);
  await page.waitForSelector("#activation-content-right");
  await page.type("input[type=text]", config.LOGIN_USERNAME);
  await page.type("input[type=password]", config.LOGIN_PASSWORD);
  await page.evaluate(() => {
    document.querySelector("input[type=button]").click();
  });
  await page.waitForSelector(".column-wifi");
  const macs = new Set(
    (
      await page.$$eval(".row-overview", (el) => {
        return el.map((e) => e.getAttribute("mac_addr"));
      })
    ).filter(Boolean)
  );

  const presence = config.PRESENCE_MAC_ADDRESSES.every((mac) => macs.has(mac));

  // Logout
  await page.evaluate(() => {
    document.querySelector("li:nth-child(3)").click();
  });

  await browser.close();

  return [presence, macs];
}
console.log(await getPresences());
export default getPresences;
