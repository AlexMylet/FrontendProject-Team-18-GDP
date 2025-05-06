import { test, expect } from "playwright/test";

test("auth_login", async ({ page }) => {
  await page.goto("http://localhost:8080/auth");
  await expect(
    page.locator("div").filter({ hasText: /^Welcome$/ }),
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Register" })).toBeVisible();
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
test("auth_register", async ({ page }) => {
  await page.goto("http://localhost:8080/auth");

  await page.getByRole("tab", { name: "Register" }).click();
  await expect(page.getByRole("tab", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Register" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Password", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Confirm Password" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
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
