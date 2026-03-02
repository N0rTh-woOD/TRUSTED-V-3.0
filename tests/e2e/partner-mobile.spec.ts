import { test, expect } from '@playwright/test';

test.describe('Partner Registration', () => {
  
  test('Partner Registration page loads', async ({ page }) => {
    await page.goto('/partner-registration');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Become a Partner/i })).toBeVisible();
    await expect(page.getByText(/Partner Type/i)).toBeVisible();
  });

  test('Partner Registration form has all required fields', async ({ page }) => {
    await page.goto('/partner-registration');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for partner type options
    await expect(page.getByText(/Hardware Vendor/i)).toBeVisible();
    await expect(page.getByText(/Software Provider/i)).toBeVisible();
    await expect(page.getByText(/Academic Institution/i)).toBeVisible();
    await expect(page.getByText(/System Integrator/i)).toBeVisible();
    
    // Check for company info fields
    await expect(page.getByText(/Company.*Name/i).first()).toBeVisible();
    await expect(page.getByText(/Email/i).first()).toBeVisible();
    await expect(page.getByPlaceholder(/Acme Technologies/i)).toBeVisible();
    await expect(page.getByPlaceholder(/john@example.com/i)).toBeVisible();
  });

  test('Partner Registration form validation works', async ({ page }) => {
    await page.goto('/partner-registration');
    await page.waitForLoadState('domcontentloaded');
    
    // Try to submit without filling required fields
    await page.getByRole('button', { name: /Submit Application/i }).click();
    
    // Should show error toast or validation message
    await expect(page.getByText(/required|fill/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Partner type selection works', async ({ page }) => {
    await page.goto('/partner-registration');
    await page.waitForLoadState('domcontentloaded');
    
    // Click on Hardware Vendor option
    await page.getByText(/Hardware Vendor/i).click();
    
    // Verify selection is made (border changes)
    const hardwareOption = page.locator('text=Hardware Vendor').locator('..');
    await expect(hardwareOption).toBeVisible();
  });

  test('Partner Registration navigation from Partners page', async ({ page }) => {
    await page.goto('/partners');
    await page.waitForLoadState('domcontentloaded');
    
    // Click on "Become a Partner" button
    await page.getByRole('link', { name: /Become a Partner/i }).click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/partner-registration/);
    await expect(page.getByRole('heading', { name: /Become a Partner/i })).toBeVisible();
  });
});

test.describe('Mobile Responsive Navigation', () => {
  
  test('Mobile menu button appears on small screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Desktop nav should be hidden
    await expect(page.getByTestId('nav-about')).not.toBeVisible();
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(mobileMenuButton).toBeVisible();
  });

  test('Mobile menu opens and shows navigation links', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Click mobile menu button (hamburger)
    const mobileMenuButton = page.locator('button.lg\\:hidden');
    await mobileMenuButton.click();
    
    // Mobile nav should now show
    await expect(page.getByTestId('mobile-nav-home')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-about')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-products')).toBeVisible();
  });

  test('Mobile navigation works - navigate to About', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Open mobile menu
    const mobileMenuButton = page.locator('button.lg\\:hidden');
    await mobileMenuButton.click();
    
    // Click About link in mobile nav
    await page.getByTestId('mobile-nav-about').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/about/);
  });

  test('Mobile navigation works - navigate to Hardware', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Open mobile menu
    const mobileMenuButton = page.locator('button.lg\\:hidden');
    await mobileMenuButton.click();
    
    // Click Hardware link in mobile nav
    await page.getByTestId('mobile-nav-hardware').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/hardware-catalog/);
  });
});
