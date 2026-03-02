import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@trusted-v.com';
const ADMIN_PASSWORD = 'bosch@2425';

// Helper to perform admin login
async function loginAsAdmin(page: any) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  
  // Fill in admin credentials
  await page.getByTestId('email-input').fill(ADMIN_EMAIL);
  await page.getByTestId('password-input').fill(ADMIN_PASSWORD);
  
  // Click the submit button in the form (not the nav button)
  await page.locator('form').getByTestId('login-btn').click();
  
  // Wait for navigation to happen after login
  await page.waitForURL(/\/builder/, { timeout: 10000 });
}

test.describe('Admin Authentication', () => {
  
  test('Admin login with new credentials (admin@trusted-v.com / bosch@2425)', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Verify admin is logged in - should see Admin nav link
    await expect(page.getByTestId('nav-admin')).toBeVisible();
    await expect(page.getByTestId('logout-btn')).toBeVisible();
  });

  test('Admin can access admin dashboard', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Navigate to admin dashboard
    await page.getByTestId('nav-admin').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/admin/);
    
    // Check stats are visible
    await expect(page.getByText(/Hardware|Users|Projects|Middleware/i).first()).toBeVisible();
  });

  test('Admin dashboard shows correct stats', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Navigate to admin dashboard
    await page.goto('/admin');
    await page.waitForLoadState('domcontentloaded');
    
    // Verify dashboard content - should show stats
    await expect(page.getByText(/Hardware|Users|Projects/i).first()).toBeVisible();
  });

  test('Admin can access hardware management', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Navigate to admin hardware page
    await page.goto('/admin/hardware');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/admin\/hardware/);
    
    // Should see hardware management content - boards like SiFive, ESP32
    await expect(page.getByText(/SiFive|ESP32|RISC-V/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('Admin can access IDE management', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Navigate to admin IDE page
    await page.goto('/admin/ide');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/admin\/ide/);
    
    // Should see IDE downloads - Windows, macOS, Linux
    await expect(page.getByText(/Windows|macOS|Linux/i).first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Solution Builder Access', () => {
  
  test('Solution Builder page loads after admin login', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Should be on solution builder page
    await expect(page).toHaveURL(/\/builder|\/solution-builder/);
    
    // Solution builder should show step workflow
    await expect(page.getByText(/Step|Project|Hardware|Software|Description/i).first()).toBeVisible();
  });

  test('Solution Builder accessible via navigation', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Navigate to home first
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Click on Solution Builder nav link
    await page.getByTestId('nav-solution-builder').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/solution-builder/);
  });
});
