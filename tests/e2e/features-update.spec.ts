import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@trusted-v.com';
const ADMIN_PASSWORD = 'bosch@2425';

// Helper to perform admin login (required due to development mode lock)
async function loginAsAdmin(page: any) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  
  await page.getByTestId('email-input').fill(ADMIN_EMAIL);
  await page.getByTestId('password-input').fill(ADMIN_PASSWORD);
  await page.locator('form').getByTestId('login-btn').click();
  
  await page.waitForURL(/\.com\/?$/, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
}

test.describe('Partners Page - "Become a Partner" Focus', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });
  
  test('Partners page shows "Join the TrusteD-V Ecosystem" heading', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Join the TrusteD-V Ecosystem/i })).toBeVisible();
  });

  test('Partners page shows partnership opportunities cards', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Partnership Opportunities/i })).toBeVisible();
    
    await expect(page.getByRole('heading', { name: /Hardware Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Software Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Enterprise Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Academic Partners/i })).toBeVisible();
  });

  test('Partners page has "Become a Partner" button', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    const becomePartnerBtn = page.getByTestId('become-partner-btn');
    await expect(becomePartnerBtn).toBeVisible();
    
    await becomePartnerBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/partner-registration/);
  });

  test('Partners page shows "Apply for Partnership" CTA', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const applyBtn = page.getByTestId('apply-partnership-btn');
    await expect(applyBtn).toBeVisible();
  });
});

test.describe('Hardware Catalog - C-DAC and Mindgrove Only', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });
  
  test('Hardware catalog shows exactly 6 boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByText(/Showing 6 of 6 boards/i)).toBeVisible({ timeout: 10000 });
  });

  test('Hardware catalog shows only C-DAC and Mindgrove manufacturers', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    const cards = page.locator('[data-testid^="hardware-card-"]');
    const count = await cards.count();
    expect(count).toBe(6);
    
    const cdacCards = page.locator('[data-testid^="hardware-card-"] p:has-text("C-DAC")');
    await expect(cdacCards.first()).toBeVisible();
    
    const mindgroveCards = page.locator('[data-testid^="hardware-card-"] p:has-text("Mindgrove")');
    await expect(mindgroveCards.first()).toBeVisible();
  });

  test('Hardware catalog shows C-DAC ARIES boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    await expect(page.getByText(/ARIES V3\.0/i)).toBeVisible();
    await expect(page.getByText(/ARIES IoT v2/i)).toBeVisible();
    await expect(page.getByText(/VEGA DHRUV64 Evaluation/i)).toBeVisible();
  });

  test('Hardware catalog shows Mindgrove boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    await expect(page.getByText(/Mindgrove Secure IoT SoC/i)).toBeVisible();
    await expect(page.getByText(/Mindgrove Vision SoC/i)).toBeVisible();
    await expect(page.getByText(/Mindgrove Industrial SoC/i)).toBeVisible();
  });

  test('Hardware filter by manufacturer works', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    await page.locator('select').last().selectOption('C-DAC');
    
    await expect(page.getByText(/Showing 3 of 6 boards/i)).toBeVisible();
  });
});

test.describe('IDE Downloads', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('IDE Downloads page displays platforms', async ({ page }) => {
    await page.goto('/download-ide');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /TrusteD-V Studio/i }).first()).toBeVisible();
    
    await expect(page.getByRole('button', { name: /Windows/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /macOS/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Linux/i }).first()).toBeVisible();
  });
});

test.describe('Blog Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Blog page displays articles', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Insights & Tutorials/i })).toBeVisible();
    await expect(page.getByText(/Building Secure Boot for RISC-V/i)).toBeVisible();
  });
});
