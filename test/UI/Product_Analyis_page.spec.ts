import { test, expect } from "playwright/test";

test("ProductAnalysis_Div", async ({ page }) => {
  await page.goto("http://localhost:8080/product-analysis");
  await expect(page.locator("#root")).toContainText(
    "Your business performance",
  );
  await expect(
    page.locator("div").filter({ hasText: /^Product Overview$/ }),
  ).toBeVisible();
});
test("ProductAnalysis_Button", async ({ page }) => {
  await page.goto("http://localhost:8080/product-analysis");
  await page.getByRole("button").click();
  await page.waitForURL("http://localhost:8080/scorecard");
});
