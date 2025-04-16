import { test, expect, Page, Locator } from '@playwright/test';

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text: string;
  attribute: {
    type: string;
    value: string;
  };
}

const elements: Element[] = [
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: "Playwright logo",
    text: "Playwright",
    attribute: { type: "href", value: "/" }
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Docs' }),
    name: "Docs",
    text: "Docs",
    attribute: { type: "href", value: "/docs/intro" }
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'API' }),
    name: "API",
    text: "API",
    attribute: { type: "href", value: "/docs/api/class-playwright" }
  },
  {
    locator: (page: Page) => page.getByRole('button', { name: 'Node.js' }),
    name: "Node.js",
    text: "Node.js",
    attribute: { type: "href", value: "#" }
  },
  {
    locator: (page: Page) => page.getByRole('link', { name: 'Community' }),
    name: "Community",
    text: "Community",
    attribute: { type: "href", value: "/community/welcome" }
  }
];

test.describe("Тест элементов навигации", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test("Проверка значения элементов навигации", async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`Проверка видимости элемента: ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    }
  });

  test("Проверка текста элементов навигации", async ({ page }) => {
    for (const { locator, name, text } of elements) {
      await test.step(`Проверка видимости элемента: ${name}`, async () => {
        await expect(locator(page)).toContainText(text);
      });
    }
  });

  test("Проверка href элементов навигации", async ({ page }) => {
    for (const { locator, name, text, attribute } of elements) {
      await test.step(`Проверка видимости элемента: ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(`${attribute.type}`,`${attribute.value}`);
      });
    }
  });



});
