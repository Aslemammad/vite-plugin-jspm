import puppeteer from "puppeteer";
import { createServer, ViteDevServer } from "vite";
import { describe, afterAll, beforeAll, expect, test } from "vitest";
import { sleep } from "./utils";

const url = "http://localhost:3001";

describe("dev", async () => {
  let server: ViteDevServer;

  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    server = await createServer({
      configFile: "./vite.config.ts",
      server: { port: 3001 },
    });
    server.printUrls();
    await server.listen();

    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  // in dev, page should just render
  test("basic render", async () => {
    await page.goto(url);
    await sleep(500);

    expect(await page.content()).toContain("<h1>Hello, world!</h1>");
  });

  afterAll(async () => {
    await browser.close();
    server.close();
  });
});
