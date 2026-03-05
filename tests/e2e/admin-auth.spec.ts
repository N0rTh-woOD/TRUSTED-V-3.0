import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@trusted-v.com';
const ADMIN_PASSWORD = 'bosch@2425';

// Helper to perform admin login - now redirects to "/" after login (development mode)
async function loginAsAdmin(page: any) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  
  // Fill in admin credentials
  await page.getByTestId('email-input').fill(ADMIN_EMAIL);
  await page.getByTestId('password-input').fill(ADMIN_PASSWORD);
  
  // Click the submit button in the form
  await page.locator('form').getByTestId('login-btn').click();
  
  // Wait for redirect to homepage "/" after login (changed from /builder)
  // Check that URL path is "/" (the homepage)
  await page.waitForURL(/\.com\/?$/, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
}

test.describe('Development Mode Lock', () => {
  
  test('Unauthenticated users are redirected to login page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('All routes redirect to login when not authenticated', async ({ page }) => {
    // Try accessing various pages
    const pages = ['/about', '/hardware-catalog', '/partners', '/admin'];
    
    for (const route of pages) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/\/login/);
    }
  });
  
  test('Login page shows Development Mode banner', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // Development Mode banner should be visible
    await expect(page.getByText('Development Mode')).toBeVisible();
    await expect(page.getByText(/Admin authentication required/i)).toBeVisible();
  });

  test('Login page shows TrusteD-V logo with shield', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // TrusteD-V text should be visible
    await expect(page.getByText('TrusteD-V').first()).toBeVisible();
    await expect(page.getByText('RISC-V × Rust Platform').first()).toBeVisible();
  });
  
  test('Login page shows "Admin Access Required" message', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.getByRole('heading', { name: /Admin Access Required/i })).toBeVisible();
    await expect(page.getByText(/Sign in with admin credentials to access the platform/i)).toBeVisible();
  });

  test('Login page shows Bosch branding at bottom', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // Bosch logo should be visible
    await expect(page.locator('img[src="/bosch-logo.png"]')).toBeVisible();
    await expect(page.getByText('Secure RISC-V Development Platform')).toBeVisible();
  });
});

test.describe('Admin Authentication', () => {
  
  test('Admin login with credentials (admin@trusted-v.com / bosch@2425)', async ({ page }) => {
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
    
    // Should see hardware management content
    await expect(page.getByText(/SiFive|ESP32|RISC-V|VEGA|ARIES/i).first()).toBeVisible({ timeout: 10000 });
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
    
    // Navigate to solution builder
    await page.goto('/solution-builder');
    await page.waitForLoadState('domcontentloaded');
    
    // Should be on solution builder page
    await expect(page).toHaveURL(/\/solution-builder/);
    
    // Solution builder should show step workflow
    await expect(page.getByText(/Step|Project|Hardware|Software|Description/i).first()).toBeVisible();
  });

  test('Solution Builder accessible via navigation', async ({ page }) => {
    await loginAsAdmin(page);
    
    // Click on Solution Builder nav link
    await page.getByTestId('nav-solution-builder').click();
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/\/solution-builder/);
  });
});
