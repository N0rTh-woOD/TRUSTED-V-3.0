import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@trusted-v.com';
const ADMIN_PASSWORD = 'bosch@2425';

// Helper to perform admin login
async function loginAsAdmin(page: any) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  
  await page.getByTestId('email-input').fill(ADMIN_EMAIL);
  await page.getByTestId('password-input').fill(ADMIN_PASSWORD);
  await page.locator('form').getByTestId('login-btn').click();
  
  await page.waitForURL(/\.com\/?$/, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
}

test.describe('Landing Page - TrusteD-V Branding', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Hero shows large TrusteD-V logo with shield icon', async ({ page }) => {
    // TrusteD-V branding should be prominent
    await expect(page.getByText('TrusteD-V').first()).toBeVisible();
    await expect(page.getByText('RISC-V × Rust Platform').first()).toBeVisible();
  });

  test('Hero shows technology badges (Rust, RISC-V, Secure)', async ({ page }) => {
    // Technology badges
    await expect(page.getByText('Rust').first()).toBeVisible();
    await expect(page.getByText('RISC-V').first()).toBeVisible();
    await expect(page.getByText('Secure').first()).toBeVisible();
  });

  test('Hero shows "The Complete RISC-V + Rust Development Platform" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /The Complete RISC-V.*Rust Development Platform/i })).toBeVisible();
  });

  test('Hero shows Rust-focused description', async ({ page }) => {
    await expect(page.getByText(/powered by.*Rust/i)).toBeVisible();
  });

  test('Hero shows "Start Building with Rust" button', async ({ page }) => {
    await expect(page.getByTestId('start-building-btn')).toBeVisible();
    await expect(page.getByTestId('start-building-btn')).toHaveText(/Start Building with Rust/i);
  });

  test('Hero shows stats row', async ({ page }) => {
    await expect(page.getByText('6+')).toBeVisible();
    await expect(page.getByText(/RISC-V Boards/i)).toBeVisible();
    await expect(page.getByText('5+')).toBeVisible();
    await expect(page.getByText(/RTOS Options/i)).toBeVisible();
    await expect(page.getByText('100%')).toBeVisible();
    await expect(page.getByText(/Rust Native/i)).toBeVisible();
    await expect(page.getByText(/Made in/i)).toBeVisible();
    // India text appears in stats row - use more specific locator
    await expect(page.getByText('India 🇮🇳')).toBeVisible();
  });
});

test.describe('Landing Page - Why Rust Section', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Shows "Why Rust for Embedded Systems?" section', async ({ page }) => {
    // Scroll down to see Rust section
    await page.evaluate(() => window.scrollBy(0, 600));
    
    await expect(page.getByRole('heading', { name: /Why Rust for Embedded Systems/i })).toBeVisible();
  });

  test('Shows Rust benefits cards', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    
    // Verify Rust benefits are displayed
    await expect(page.getByText('Memory Safety').first()).toBeVisible();
    await expect(page.getByText('Zero-Cost Abstractions').first()).toBeVisible();
    await expect(page.getByText('Fearless Concurrency').first()).toBeVisible();
    await expect(page.getByText(/No Garbage Collection/i).first()).toBeVisible();
  });
});

test.describe('Landing Page - RISC-V + Rust Section', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Shows "RISC-V × Rust" combination badges', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 1200));
    
    // Look for RISC-V × Rust section
    await expect(page.getByText('RISC-V', { exact: false }).first()).toBeVisible();
  });

  test('Shows RISC-V + Rust benefits', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 1200));
    
    // Verify combined benefits
    await expect(page.getByText(/Secure by Default/i).first()).toBeVisible();
    await expect(page.getByText(/Optimal Performance/i).first()).toBeVisible();
  });

  test('Shows TrusteD-V Architecture diagram', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 1200));
    
    // Architecture section
    await expect(page.getByText('TrusteD-V Architecture').first()).toBeVisible();
    await expect(page.getByText(/Rust SDK & Middleware/i).first()).toBeVisible();
    await expect(page.getByText(/RISC-V Hardware/i).first()).toBeVisible();
  });
});

test.describe('Landing Page - Footer', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Footer shows Bosch logo', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const footerBoschLogo = page.locator('footer img[src="/bosch-logo.png"]');
    await expect(footerBoschLogo).toBeVisible();
  });

  test('Footer shows TrusteD-V branding', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.locator('footer').getByText('TrusteD-V').first()).toBeVisible();
  });

  test('Footer shows copyright', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByText(/© 2025 TrusteD-V/i)).toBeVisible();
  });
});
