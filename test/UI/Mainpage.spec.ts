import { test, expect } from "playwright/test";

test("MainPage_Sales_div", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await expect(
    page.locator("div").filter({ hasText: /^Sales$/ }),
  ).toBeVisible();
});
test("MainPage_ProductSales_div", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await expect(
    page.locator("div").filter({ hasText: /^Product Sales$/ }),
  ).toBeVisible();
});
test("MainPage_WeekOverwiew_div", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Week Overview$/ })
      .nth(1),
  ).toBeVisible();
});
test("Sales_ext", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await page
    .locator("div")
    .filter({ hasText: /^Sales$/ })
    .getByRole("button")
    .click();
  await expect(
    page.getByRole("dialog", { name: "Today's Salient Points" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
      - navigation:
        - link "Today":
          - /url: /
          - img
        - link "Coach":
          - /url: /ask-anything
          - img
        - link "Progress":
          - /url: /scorecard
          - img
        - link "Goals":
          - /url: /goals
          - img
        - link "Forecast":
          - /url: /forecast
          - img
        - link "Customize":
          - /url: /notifications
          - img
      `);
});
test("Week_Overwiew_ext", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await page.getByRole("button").nth(1).click();
  await expect(
    page.getByRole("dialog", { name: "This Week's Performance" }),
  ).toBeVisible();
  await expect(page.getByLabel("This Week's Performance")).toMatchAriaSnapshot(`
      - dialog "This Week's Performance":
        - heading "This Week's Performance" [level=2]
        - text: /Metric Current vs Last Week vs Last Year Sales £\\d+,\\d+ \\+9\\.2% \\+\\d+\\.\\d+% Expenses £\\d+,\\d+ \\+2\\.9% \\+\\d+\\.\\d+% Estimated Gross Profit £\\d+,\\d+ \\+\\d+\\.\\d+% \\+\\d+\\.\\d+% Estimated Net Profit £\\d+,\\d+ \\+\\d+\\.\\d+% \\+\\d+\\.\\d+%/
        - button "Close":
          - img
      `);
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
      - navigation:
        - link "Today":
          - /url: /
          - img
        - link "Coach":
          - /url: /ask-anything
          - img
        - link "Progress":
          - /url: /scorecard
          - img
        - link "Goals":
          - /url: /goals
          - img
        - link "Forecast":
          - /url: /forecast
          - img
        - link "Customize":
          - /url: /notifications
          - img
      `);
});
test("Navigation_Bar", async ({ page }) => {
  await page.goto("http://localhost:8080/auth");
  await page.getByRole("link", { name: "Today" }).click();
  await page.waitForURL("http://localhost:8080");
  await page.getByRole("link", { name: "Coach" }).click();
  await page.waitForURL("http://localhost:8080/ask-anything");
  await page.getByRole("link", { name: "Progress" }).click();
  await page.waitForURL("http://localhost:8080/scorecard");
  await page.getByRole("link", { name: "Goals" }).click();
  await page.waitForURL("http://localhost:8080/goals");
  await page.getByRole("link", { name: "Forecast" }).click();
  await page.waitForURL("http://localhost:8080/forecast");
  await page.getByRole("link", { name: "Customize" }).click();
  await page.waitForURL("http://localhost:8080/notifications");
});
