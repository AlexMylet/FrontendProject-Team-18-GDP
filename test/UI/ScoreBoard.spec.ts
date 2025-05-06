import { test, expect } from '@playwright/test';

test('Navigation_Bar', async ({ page }) => {
  await page.goto('http://localhost:8080/ask-anything');
  await expect(page.getByRole('textbox', { name: 'Ask me anything...' })).toBeVisible();
});
test('Progress_Profit_div', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await expect(page.locator('div').filter({ hasText: /^Profit$/ })).toBeVisible();
});
test('Progress_ProductProfitablity_div', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await expect(page.locator('div').filter({ hasText: /^Product Profitability$/ }).first()).toBeVisible();
});
test('Progress_CostAnalysis_div', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await expect(page.locator('div').filter({ hasText: /^Cost Analysis$/ })).toBeVisible();
});
test('Progress_ComperativePerformance_div', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await expect(page.locator('div').filter({ hasText: /^Comparative Performance$/ })).toBeVisible();
});

test('Progress_Profit_ext', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await page.locator('div').filter({ hasText: /^Profit$/ }).getByRole('button').click();
  await expect(page.getByRole('dialog', { name: 'Profit Breakdown' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Profit Breakdown' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Profit Breakdown');
  await expect(page.getByLabel('Profit Breakdown')).toContainText('Metricvs Last Monthvs Last Year');
  await expect(page.getByLabel('Profit Breakdown')).toContainText('Revenue');
  await expect(page.getByLabel('Profit Breakdown')).toContainText('Costs');
  await expect(page.getByLabel('Profit Breakdown')).toContainText('Gross Profit');
  await expect(page.getByLabel('Profit Breakdown')).toContainText('Profit Margin');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
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
test('Progress_ProductProfitablity_ext', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await page.locator('.p-6 > svg').first().click(); 
  await page.waitForURL('http://localhost:8080/product-analysis');
});

test('Progress_CostAnalysis_ext', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');
  await page.locator('div').filter({ hasText: /^Cost Analysis$/ }).getByRole('img').click();
  await expect(page.getByRole('dialog', { name: 'Understanding Costs' })).toBeVisible();
  await expect(page.locator('h2')).toContainText('Understanding Costs');
  await expect(page.getByLabel('Understanding Costs')).toContainText('Variable Costs');
  await expect(page.getByLabel('Understanding Costs')).toContainText('These costs change in proportion to your business activity. Examples include raw materials, direct labor, and sales commissions. As your production or sales increase, these costs increase accordingly.');
  await expect(page.getByLabel('Understanding Costs')).toContainText('Fixed Costs');
  await expect(page.getByLabel('Understanding Costs')).toContainText('These costs remain constant regardless of your business activity level. Examples include rent, insurance, and salaries of permanent staff. They don\'t change with production or sales volume.');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
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
test('Progress_ComperativePerformance_ext', async ({ page }) => {
  await page.goto('http://localhost:8080/scorecard');

  await page.locator('div').filter({ hasText: /^Comparative Performance$/ }).getByRole('button').click();
  await expect(page.getByRole('dialog', { name: 'Performance Benchmarking' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Performance Benchmarking');
  await expect(page.getByRole('paragraph')).toContainText('Your advisor has conducted a comprehensive benchmarking analysis of your business performance against comparable businesses in your industry and adjacent sectors. This analysis helps assess your relative value creation and identify areas for potential improvement. The benchmarking takes into account various factors including market conditions, business size, and operational metrics to provide meaningful comparisons.');
  await expect(page.getByRole('button', { name: 'Talk to my advisor for more' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
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

