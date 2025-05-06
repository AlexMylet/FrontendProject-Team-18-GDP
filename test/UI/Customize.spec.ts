import { test, expect } from "playwright/test";

test("ConectedPlatforms_div", async ({ page }) => {
  await page.goto("http://localhost:8080/notifications");
  await expect(
    page.getByRole("button", { name: "Connected platforms" }),
  ).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Request a custom feature' })).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Connect your advisor, accountant, or bookkeeper to Trajex' })).toBeVisible();
});
test("ConectedPlatforms_ext", async ({ page }) => {
  await page.goto("http://localhost:8080/notifications");
  await page.getByRole("button", { name: "Connected platforms" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Xero$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^QuickBooks$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^HubSpot$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Monday$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Pipedrive$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Shopify$/ })
      .getByRole("switch"),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^WooCommerce$/ })
      .getByRole("switch"),
  ).toBeVisible();
});
