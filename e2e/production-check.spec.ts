import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://portfolio-e12.pages.dev' });

test('首页 /zh 返回 200', async ({ page }) => {
  const res = await page.goto('/zh');
  expect(res?.status()).toBe(200);
});

test('英文首页 /en 返回 200', async ({ page }) => {
  const res = await page.goto('/en');
  expect(res?.status()).toBe(200);
});

test('关于页面正常', async ({ page }) => {
  await page.goto('/zh/about');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=技能树').first()).toBeVisible();
});

test('项目列表正常', async ({ page }) => {
  await page.goto('/zh/projects');
  await page.waitForLoadState('networkidle');
  const cards = page.locator('a[href*="/projects/"]');
  expect(await cards.count()).toBeGreaterThanOrEqual(2);
});

test('联系页面正常', async ({ page }) => {
  await page.goto('/zh/contact');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('发送邮件')).toBeVisible();
});

test('sitemap.xml 可访问', async ({ page }) => {
  const res = await page.goto('/sitemap.xml');
  expect(res?.status()).toBe(200);
});

test('robots.txt 可访问', async ({ page }) => {
  const res = await page.goto('/robots.txt');
  expect(res?.status()).toBe(200);
});
