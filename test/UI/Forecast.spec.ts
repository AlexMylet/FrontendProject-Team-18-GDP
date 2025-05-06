import { test, expect } from "playwright/test";

test("Forecast_div", async ({ page }) => {
  await page.goto("http://localhost:8080/forecast");
  await expect(page.getByText("Saas Metrics")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "SaaS Metrics" }),
  ).toBeVisible();
  await expect(page.getByText("3-way forecastRevenue")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Share this with my advisor" }),
  ).toBeVisible();
});

test("SaaSMetric_ext", async ({ page }) => {
  await page.goto("http://localhost:8080/forecast");

  await expect(page.locator("#root")).toContainText("LTV:CAC");
  await expect(page.locator("#root")).toContainText("Rule of 40");
  await expect(page.locator("#root")).toContainText("ARR");

  await page.locator(".rounded-lg > .flex > .lucide").click();
  await expect(
    page.getByRole("dialog", { name: "SaaS Metrics Explained" }),
  ).toBeVisible();
  await expect(page.getByLabel("SaaS Metrics Explained")).toMatchAriaSnapshot(`
    - dialog "SaaS Metrics Explained":
      - heading "SaaS Metrics Explained" [level=2]
      - img
      - heading "LTV:CAC (3.5x)" [level=3]
      - paragraph: Lifetime Value to Customer Acquisition Cost ratio. A healthy ratio is 3:1 or higher.
      - heading /Rule of \\d+ \\(\\d+%\\)/ [level=3]
      - paragraph: /Combined growth rate and profit margin should exceed \\d+%\\. Currently performing above benchmark\\./
      - heading /ARR \\(£[\\d,.]+[bkmBKM]+\\)/ [level=3]
      - paragraph: Annual Recurring Revenue, showing steady growth trajectory.
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

test("3WayForecast_ext", async ({ page }) => {
  await page.goto("http://localhost:8080/forecast");

  await page
    .locator("div")
    .filter({ hasText: /^3-way forecast$/ })
    .getByRole("img")
    .click();
  await expect(
    page.getByRole("dialog", { name: "-way forecast Details" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Export 3-way complete forecast" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Revenue Forecast" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Cashflow Forecast" }),
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
