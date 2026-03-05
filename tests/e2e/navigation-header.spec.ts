import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@trusted-v.com';
const ADMIN_PASSWORD = 'bosch@2425';

async function loginAsAdmin(page: any) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.getByTestId('email-input').fill(ADMIN_EMAIL);
  await page.getByTestId('password-input').fill(ADMIN_PASSWORD);
  await page.locator('form').getByTestId('login-btn').click();
  await page.waitForURL(/\.com\/?$/, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
}

test.describe('Header - Desktop (Full HD)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await loginAsAdmin(page);
  });

  test('Header shows TrusteD-V logo and main navigation', async ({ page }) => {
    await expect(page.locator('nav').getByText('TrusteD-V').first()).toBeVisible();
    await expect(page.locator('nav').getByText('RISC-V × Rust Platform').first()).toBeVisible();
    
    await expect(page.getByTestId('nav-home')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('nav-products')).toBeVisible();
    await expect(page.getByTestId('nav-hardware')).toBeVisible();
    // Note: data-testid uses replace(' ', '-') which only replaces first space
    // "Partner With Us" becomes "partner-with us" 
    await expect(page.getByTestId('nav-partner-with us')).toBeVisible();
  });

  test('Header shows authenticated user links and Bosch logo', async ({ page }) => {
    await expect(page.getByTestId('nav-solution-builder')).toBeVisible();
    await expect(page.getByTestId('nav-projects')).toBeVisible();
    await expect(page.getByTestId('nav-admin')).toBeVisible();
    await expect(page.getByTestId('logout-btn')).toBeVisible();
    
    // Bosch logo on far right
    const boschLogo = page.locator('nav img[src="/bosch-logo.png"]').first();
    await expect(boschLogo).toBeVisible();
  });

  test('Header has Bosch-style red top border', async ({ page }) => {
    const redBorder = page.locator('.bg-\\[\\#E20015\\]');
    await expect(redBorder.first()).toBeVisible();
  });
});

test.describe('Header - Mobile', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsAdmin(page);
  });

  test('Mobile shows hamburger menu and Bosch logo', async ({ page }) => {
    // Mobile layout shows hamburger menu (≡ icon)
    await expect(page.locator('nav').getByText('TrusteD-V').first()).toBeVisible();
    
    // Mobile Bosch logo is the second one (first is desktop, hidden on mobile)
    const boschLogo = page.locator('img[src="/bosch-logo.png"]').nth(1);
    await expect(boschLogo).toBeVisible();
  });

  test('Mobile menu opens and shows navigation items', async ({ page }) => {
    // Click the hamburger menu button (last button in mobile header area)
    const menuButton = page.locator('nav button').last();
    await menuButton.click();
    
    // Check that mobile nav items are visible
    // "Partner With Us" becomes "partner-with us" 
    // "My Projects" becomes "my-projects"
    await expect(page.getByTestId('mobile-nav-home')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-about')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-products')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-hardware')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-partner-with us')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-solution-builder')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-my-projects')).toBeVisible();
  });
});

test.describe('Desktop Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await loginAsAdmin(page);
  });

  test('Navigate to About page', async ({ page }) => {
    await page.getByTestId('nav-about').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/about/);
  });

  test('Navigate to Hardware page', async ({ page }) => {
    await page.getByTestId('nav-hardware').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/hardware-catalog/);
    await expect(page.getByRole('heading', { name: /RISC-V Development Boards/i })).toBeVisible();
  });

  test('Navigate to Partner With Us page', async ({ page }) => {
    await page.getByTestId('nav-partner-with us').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/partners/);
  });

  test('Navigate to Solution Builder', async ({ page }) => {
    await page.getByTestId('nav-solution-builder').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/solution-builder/);
  });
});

test.describe('Full HD Layout', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await loginAsAdmin(page);
  });

  test('Homepage renders correctly at 1920px', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /The Complete RISC-V.*Rust Development Platform/i })).toBeVisible();
    await expect(page.getByText('6+')).toBeVisible();
    await expect(page.getByText('5+')).toBeVisible();
    await expect(page.getByText('100%')).toBeVisible();
  });

  test('Hardware catalog renders correctly at 1920px', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    const gridContainer = page.locator('.grid.lg\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
  });

  test('Partners page renders correctly at 1920px', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: /Join the TrusteD-V Ecosystem/i })).toBeVisible();
  });
});
