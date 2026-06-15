import { test, expect } from '@playwright/test';

// ============================================================
// 路由测试：验证所有页面可访问，返回 200
// ============================================================

const routes = [
  { path: '/zh', expectedTitle: '陈鑫鹏' },
  { path: '/en', expectedTitle: 'Chen' },
  { path: '/zh/about', expectedTitle: '技能树' },
  { path: '/en/about', expectedTitle: 'Skills' },
  { path: '/zh/projects', expectedTitle: '项目作品' },
  { path: '/en/projects', expectedTitle: 'Projects' },
  { path: '/zh/projects/desktop-pet', expectedTitle: 'DesktopPet' },
  { path: '/en/projects/desktop-pet', expectedTitle: 'DesktopPet' },
  { path: '/zh/projects/eshop', expectedTitle: 'e数码商城' },
  { path: '/en/projects/eshop', expectedTitle: 'eShop' },
  { path: '/zh/contact', expectedTitle: '联系我' },
  { path: '/en/contact', expectedTitle: 'Contact' },
];

for (const { path, expectedTitle } of routes) {
  test(`路由 ${path} 应返回 200`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
  });

  test(`路由 ${path} 标题应包含 "${expectedTitle}"`, async ({ page }) => {
    await page.goto(path);
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    expect(title).toContain(expectedTitle);
  });
}

// ============================================================
// 导航测试
// ============================================================

test('导航栏链接工作正常 (中文)', async ({ page }) => {
  await page.goto('/zh');
  await page.waitForLoadState('networkidle');

  // 验证所有导航链接存在
  const nav = page.locator('nav');
  await expect(nav.getByText('首页')).toBeVisible();
  await expect(nav.getByText('关于我')).toBeVisible();
  await expect(nav.getByText('项目作品')).toBeVisible();
  await expect(nav.getByText('联系我')).toBeVisible();

  // 点击导航到关于页面
  await nav.getByText('关于我').click();
  await page.waitForURL('**/zh/about');
  await expect(page.locator('text=技能树')).toBeVisible();
});

// ============================================================
// 语言切换测试
// ============================================================

test('语言切换：中文 → 英文 → 中文', async ({ page }) => {
  await page.goto('/zh');
  await page.waitForLoadState('networkidle');

  // Click the language switch button (it shows the NEXT locale: "EN" on zh page)
  const langBtn = page.locator('nav button').filter({ hasText: /EN/i });
  await expect(langBtn).toBeVisible({ timeout: 5000 });

  // Try to click it
  try {
    await langBtn.click();
    await page.waitForURL('**/en', { timeout: 5000 });
  } catch {
    // The LanguageSwitcher component may use a different structure
    // Try clicking the Globe icon parent
    const globeParent = page.locator('nav').locator('button').last();
    await globeParent.click();
    await page.waitForURL('**/en', { timeout: 5000 });
  }

  const enTitle = await page.title();
  expect(enTitle).toContain('Chen');
});

// ============================================================
// 404 测试
// ============================================================

test('404 页面正常显示', async ({ page }) => {
  const res = await page.goto('/zh/nonexistent-page');
  expect(res?.status()).toBe(404);
  await expect(page.locator('text=404')).toBeVisible();
});

// ============================================================
// 项目卡片测试
// ============================================================

test('项目列表页显示两个项目', async ({ page }) => {
  await page.goto('/zh/projects');
  await page.waitForLoadState('networkidle');

  // 验证两个项目卡片存在
  const cards = page.locator('a[href*="/projects/"]');
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(2);
});

test('点击项目卡片导航到详情页', async ({ page }) => {
  await page.goto('/zh/projects');
  await page.waitForLoadState('networkidle');

  // 点击第一个项目卡片
  const firstCard = page.locator('a[href*="/projects/"]').first();
  await firstCard.click();

  // 验证导航到详情页
  await page.waitForURL('**/projects/*');
  await expect(page.locator('text=返回项目列表')).toBeVisible();
});

// ============================================================
// Hero CTA 测试
// ============================================================

test('首页 CTA 按钮可点击', async ({ page }) => {
  await page.goto('/zh');
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('查看项目')).toBeVisible();

  await page.getByText('查看项目').click();
  await page.waitForURL('**/zh/projects');
  expect(page.url()).toContain('/zh/projects');
});

// ============================================================
// 边界测试
// ============================================================

test('不存在的项目 slug 返回 404', async ({ page }) => {
  const res = await page.goto('/zh/projects/nonexistent-project');
  expect(res?.status()).toBe(404);
});

test('未配置的语言返回 404', async ({ page }) => {
  // 只有 zh/en 有效，/jp 应返回 404
  const res = await page.goto('/jp');
  expect(res?.status()).toBe(404);
});

test('技能折叠面板交互 (移动端视口)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/zh/about');
  await page.waitForLoadState('networkidle');

  // On mobile, the SkillAccordion (md:hidden) is visible
  // Find the accordion button that contains "AI Agent" text
  const accordionSection = page.locator('.space-y-3 > div').first();
  const accordionBtn = accordionSection.locator('button');
  await expect(accordionBtn).toBeVisible({ timeout: 5000 });
  await accordionBtn.click();

  // After clicking, the skill list within THIS accordion should be visible
  await expect(accordionSection.locator('text=Prompt Engineering').first()).toBeVisible({ timeout: 5000 });
});

test('技能树显示 (桌面端视口)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/zh/about');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('text=Prompt Engineering').first()).toBeVisible();
  await expect(page.locator('text=精通').first()).toBeVisible();
});

// ============================================================
// SEO 测试
// ============================================================

test('robots.txt 可访问', async ({ page }) => {
  const res = await page.goto('/robots.txt');
  expect(res?.status()).toBe(200);
  const text = await page.textContent('body');
  expect(text).toContain('Sitemap');
});

test('sitemap.xml 可访问且为有效 XML', async ({ page }) => {
  const res = await page.goto('/sitemap.xml');
  expect(res?.status()).toBe(200);
  const text = await page.textContent('body');
  expect(text).toContain('<urlset');
  expect(text).toContain('<loc>');
  expect(text).toContain('/zh');
  expect(text).toContain('/en');
});
