import { test, expect } from '@playwright/test';

test.describe('Partners Page - "Become a Partner" Focus', () => {
  
  test('Partners page shows "Join the TrusteD-V Ecosystem" heading', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Main heading should be "Join the TrusteD-V Ecosystem"
    await expect(page.getByRole('heading', { name: /Join the TrusteD-V Ecosystem/i })).toBeVisible();
    
    // Should have "Partner With Us" label
    await expect(page.getByText('PARTNER WITH US')).toBeVisible();
  });

  test('Partners page shows partnership opportunities cards', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Should show Partnership Opportunities section
    await expect(page.getByRole('heading', { name: /Partnership Opportunities/i })).toBeVisible();
    
    // Should show 4 partnership types
    await expect(page.getByRole('heading', { name: /Hardware Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Software Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Enterprise Partners/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Academic Partners/i })).toBeVisible();
  });

  test('Partners page has "Become a Partner" button', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Should have "Become a Partner" button that links to registration
    const becomePartnerBtn = page.getByTestId('become-partner-btn');
    await expect(becomePartnerBtn).toBeVisible();
    
    // Click and verify navigation
    await becomePartnerBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/partner-registration/);
  });

  test('Partners page shows "Apply for Partnership" CTA', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Scroll to CTA section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Should have "Apply for Partnership" button
    const applyBtn = page.getByTestId('apply-partnership-btn');
    await expect(applyBtn).toBeVisible();
  });
});

test.describe('Hardware Catalog - C-DAC and Mindgrove Only', () => {
  
  test('Hardware catalog shows exactly 6 boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for hardware to load
    await expect(page.getByText(/Showing 6 of 6 boards/i)).toBeVisible({ timeout: 10000 });
  });

  test('Hardware catalog shows only C-DAC and Mindgrove manufacturers', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for hardware cards to load
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    // Get all manufacturer names from cards
    const cards = page.locator('[data-testid^="hardware-card-"]');
    const count = await cards.count();
    expect(count).toBe(6);
    
    // Check for C-DAC boards
    await expect(page.getByText('C-DAC').first()).toBeVisible();
    
    // Check for Mindgrove boards
    await expect(page.getByText('Mindgrove Technologies').first()).toBeVisible();
  });

  test('Hardware catalog shows C-DAC ARIES boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    // Verify C-DAC ARIES boards
    await expect(page.getByText(/ARIES V3\.0/i)).toBeVisible();
    await expect(page.getByText(/ARIES IoT v2/i)).toBeVisible();
    await expect(page.getByText(/VEGA DHRUV64 Evaluation/i)).toBeVisible();
  });

  test('Hardware catalog shows Mindgrove boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    // Verify Mindgrove boards
    await expect(page.getByText(/Mindgrove Secure IoT SoC/i)).toBeVisible();
    await expect(page.getByText(/Mindgrove Vision SoC/i)).toBeVisible();
    await expect(page.getByText(/Mindgrove Industrial SoC/i)).toBeVisible();
  });

  test('Hardware filter by manufacturer works', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    // Select C-DAC from manufacturer filter
    await page.locator('select').last().selectOption('C-DAC');
    
    // Should show only 3 C-DAC boards
    await expect(page.getByText(/Showing 3 of 6 boards/i)).toBeVisible();
  });
});

test.describe('Bosch Logo Integration', () => {
  
  test('Bosch logo visible in header navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Bosch logo should be visible in header (only on desktop - hidden md:flex)
    const boschLogo = page.locator('nav img[src="/bosch-logo.png"]');
    await expect(boschLogo).toBeVisible();
  });

  test('Bosch logo visible in footer', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Bosch logo should be visible in footer
    const footerBoschLogo = page.locator('footer img[src="/bosch-logo.png"]');
    await expect(footerBoschLogo).toBeVisible();
  });
});

test.describe('Full HD Layout Support', () => {
  
  test('Homepage renders correctly at 1920px width', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Main hero section should be visible
    await expect(page.getByRole('heading', { name: /Secure Embedded Systems Development/i })).toBeVisible();
    
    // Stats row should show all 4 items
    await expect(page.getByText('6+').first()).toBeVisible();
    await expect(page.getByText('Indian Boards')).toBeVisible();
    
    // Navigation should be desktop layout (no hamburger menu)
    await expect(page.getByTestId('nav-home')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('login-btn')).toBeVisible();
  });

  test('Hardware catalog renders correctly at 1920px width', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for hardware to load
    await page.waitForSelector('[data-testid^="hardware-card-"]', { timeout: 10000 });
    
    // Should show 3 columns on large screens
    const gridContainer = page.locator('.grid.lg\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
  });

  test('Partners page renders correctly at 1920px width', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Main heading should be centered and visible
    await expect(page.getByRole('heading', { name: /Join the TrusteD-V Ecosystem/i })).toBeVisible();
    
    // Partnership opportunities should show in 2 columns on desktop
    const opportunitiesGrid = page.locator('.grid.md\\:grid-cols-2');
    await expect(opportunitiesGrid.first()).toBeVisible();
  });
});

test.describe('Navigation Update - Partner With Us', () => {
  
  test('Navigation shows "Partner With Us" instead of "Partners"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Desktop navigation should show "Partner With Us" (testid generated as 'nav-partner-with us')
    const partnerNavLink = page.getByTestId('nav-partner-with us');
    await expect(partnerNavLink).toBeVisible();
    await expect(partnerNavLink).toHaveText('Partner With Us');
  });

  test('"Partner With Us" nav link navigates to partners page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-partner-with us').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/partners/);
  });
});
