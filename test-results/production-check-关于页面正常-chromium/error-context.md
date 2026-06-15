# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-check.spec.ts >> 关于页面正常
- Location: e2e\production-check.spec.ts:15:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=技能树').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=技能树').first()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ baseURL: 'https://portfolio-e12.pages.dev' });
  4  | 
  5  | test('首页 /zh 返回 200', async ({ page }) => {
  6  |   const res = await page.goto('/zh');
  7  |   expect(res?.status()).toBe(200);
  8  | });
  9  | 
  10 | test('英文首页 /en 返回 200', async ({ page }) => {
  11 |   const res = await page.goto('/en');
  12 |   expect(res?.status()).toBe(200);
  13 | });
  14 | 
  15 | test('关于页面正常', async ({ page }) => {
  16 |   await page.goto('/zh/about');
  17 |   await page.waitForLoadState('networkidle');
> 18 |   await expect(page.locator('text=技能树').first()).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  19 | });
  20 | 
  21 | test('项目列表正常', async ({ page }) => {
  22 |   await page.goto('/zh/projects');
  23 |   await page.waitForLoadState('networkidle');
  24 |   const cards = page.locator('a[href*="/projects/"]');
  25 |   expect(await cards.count()).toBeGreaterThanOrEqual(2);
  26 | });
  27 | 
  28 | test('联系页面正常', async ({ page }) => {
  29 |   await page.goto('/zh/contact');
  30 |   await page.waitForLoadState('networkidle');
  31 |   await expect(page.getByText('发送邮件')).toBeVisible();
  32 | });
  33 | 
  34 | test('sitemap.xml 可访问', async ({ page }) => {
  35 |   const res = await page.goto('/sitemap.xml');
  36 |   expect(res?.status()).toBe(200);
  37 | });
  38 | 
  39 | test('robots.txt 可访问', async ({ page }) => {
  40 |   const res = await page.goto('/robots.txt');
  41 |   expect(res?.status()).toBe(200);
  42 | });
  43 | 
```