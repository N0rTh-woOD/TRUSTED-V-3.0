import { test, expect } from '@playwright/test';

test.describe('Public Navigation', () => {
  
  test('Landing page loads with correct content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Verify main hero section
    await expect(page.getByRole('heading', { name: /Secure Embedded Systems Development/i })).toBeVisible();
    
    // Verify navigation links are visible
    await expect(page.getByTestId('nav-home')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('nav-products')).toBeVisible();
    await expect(page.getByTestId('nav-developer-portal')).toBeVisible();
    await expect(page.getByTestId('nav-hardware')).toBeVisible();
    await expect(page.getByTestId('nav-partners')).toBeVisible();
    
    // Verify Sign In button visible
    await expect(page.getByTestId('login-btn')).toBeVisible();
  });

  test('Navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-about').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: /Building the Future of Secure Embedded Systems/i })).toBeVisible();
  });

  test('Navigate to Products page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-products').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/product-suite/);
    await expect(page.getByRole('heading', { name: /Complete Development Ecosystem/i })).toBeVisible();
  });

  test('Navigate to Developer Portal page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-developer-portal').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/developer-portal/);
    await expect(page.getByRole('heading', { name: /Build with TrusteD-V/i })).toBeVisible();
  });

  test('Navigate to Hardware page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-hardware').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/hardware-catalog/);
    await expect(page.getByRole('heading', { name: /RISC-V Development Boards/i })).toBeVisible();
  });

  test('Navigate to Partners page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByTestId('nav-partners').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/partners/);
    await expect(page.getByText(/Partner Ecosystem/i)).toBeVisible();
  });
  
  test('Hardware catalog displays RISC-V boards', async ({ page }) => {
    await page.goto('/hardware-catalog');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for hardware list to load
    await expect(page.getByText(/SiFive/i).first()).toBeVisible({ timeout: 10000 });
    
    // Verify filter options are present
    await expect(page.getByPlaceholder(/Search/i)).toBeVisible();
  });

  test('IDE Downloads page displays platforms', async ({ page }) => {
    await page.goto('/download-ide');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /TrusteD-V Studio/i }).first()).toBeVisible();
    
    // Verify platform buttons are visible
    await expect(page.getByRole('button', { name: /Windows/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /macOS/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Linux/i }).first()).toBeVisible();
  });

  test('Blog page displays articles', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
    // Verify featured post is visible
    await expect(page.getByText(/Building Secure Boot for RISC-V/i)).toBeVisible();
  });
});
