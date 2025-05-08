import { test, expect } from "playwright/test";

test("Goals_div", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await expect(page.getByText("The app has made you: £")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Goals & Quests" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Add New" })).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Goals$/ }),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Quests$/ }),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Leaderboards$/ }),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Streaks$/ }),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Awards$/ }),
  ).toBeVisible();
  await expect(page.getByText("The app has made you: £")).toBeVisible();
});

test("Goals_add", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await page.getByRole("button", { name: "Add New" }).click();
  await expect(
    page.getByRole("dialog", { name: "Add New Goal" }),
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Unit" })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: "Target" })).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Target$/ })
      .locator("#target"),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("test");
  await page.getByRole("textbox", { name: "Unit" }).click();
  await page.getByRole("textbox", { name: "Unit" }).fill("$");
  await page.getByRole("spinbutton", { name: "Target" }).click();
  await page.getByRole("spinbutton", { name: "Target" }).fill("1");
  await page
    .locator("div")
    .filter({ hasText: /^Target$/ })
    .locator("#target")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Target$/ })
    .locator("#target")
    .fill("10");
  await page.getByRole("button", { name: "Add Goal" }).click();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
        - heading "test" [level=3]
        - paragraph: "/Target: \\\\d+ \\\\$/"
        - img
        `);
  await expect(page.locator("#root")).toContainText("Target: 10 $");
});

test("Goals_add_empty", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await page.getByRole("button", { name: "Add New" }).click();
  await expect(
    page.getByRole("dialog", { name: "Add New Goal" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add Goal" }).click();
  await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
      - navigation:
        - link "Today":
          - /url: /
          - img
        - link "Coach":
          - /url: /ask-anything
          - img
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
          - img
        - link "Customize":
          - /url: /notifications
          - img
          - img
      `);
});
test("Goals_edit", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await page.getByRole("button", { name: "Add New" }).click();
  await expect(
    page.getByRole("dialog", { name: "Add New Goal" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add Goal" }).click();
  await page.locator(".pl-4 > .lucide").first().click();
  await page.getByRole("textbox", { name: "Name" }).fill("test-edit");
  await page.getByRole("textbox", { name: "Unit" }).click();
  await page.getByRole("textbox", { name: "Unit" }).fill("#");
  await page.getByRole("spinbutton", { name: "Target" }).click();
  await page.getByRole("spinbutton", { name: "Target" }).fill("15");
  await page
    .locator("div")
    .filter({ hasText: /^Target$/ })
    .locator("#target")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Target$/ })
    .locator("#target")
    .fill("20");
  await page.getByRole("button", { name: "Save Goal" }).click();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
      - heading "test-edit" [level=3]
      - paragraph: "/Target: \\\\d+ #/"
      - img
      `);
  await expect(page.locator("#root")).toContainText("Target: 20 #");
});

test("Quest_mock_data", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");

  await expect(page.locator("#root")).toMatchAriaSnapshot(`
      - heading "New customers today" [level=3]
      - paragraph: "Target: 2 customers"
      `);
  await expect(page.getByText("Target: 2 customers")).toBeVisible();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
      - heading "Revenue today" [level=3]
      - paragraph: "/Target: \\\\d+ £/"
      `);
  await expect(page.getByText("Target: 100 £")).toBeVisible();
});

test("Leadrboard_mock_data", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");

  await expect(page.getByText("Leaderboard of total units")).toBeVisible();
  await expect(page.locator("#root")).toMatchAriaSnapshot(
    `- text: /1 Alice \\d+ units sold 2 Bob \\d+ units sold/`,
  );

  await expect(page.getByText("Tracks the highest earnings")).toBeVisible();
  await expect(page.locator("#root")).toMatchAriaSnapshot(
    `- text: /1 Bob \\d+ GBP 2 Alice \\d+ GBP/`,
  );
});
test("Streaks_mock_data", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - text: Sales
    - img
    - text: /\\d+/
    `);
  await expect(page.getByText("Profit5")).toBeVisible();
});
test("Awards_mock_data", async ({ page }) => {
  await page.goto("http://localhost:8080/goals");
  await expect(page.locator("#root")).toMatchAriaSnapshot(
    `- text: "/Connect your data You connected your business data to platform Achieved: \\\\d+-\\\\d+-\\\\d+/"`,
  );
  await expect(page.getByText("Achieved: 2025-04-11")).toBeVisible();
  await expect(page.locator("#root")).toMatchAriaSnapshot(
    `- text: "/View a leaderboard You viewed a leaderboard to compare against your peers Achieved: \\\\d+-\\\\d+-\\\\d+/"`,
  );
  await expect(page.locator("#root")).toContainText("Achieved: 2025-04-10");
});
