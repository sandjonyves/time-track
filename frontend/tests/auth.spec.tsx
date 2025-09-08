import { test, expect } from '@playwright/test';

const REGISTER_URL = `/register`;
const LOGIN_URL = `/login`;
const DASHBOARD_URL = `/dashboard`;

test.describe('Authentication Flow', () => {
  
  const uniqueEmail = `user_${Date.now()}@playwright.com`;
  const uniqueUsername = `user_${Date.now()}_playwright`;
  const password = '123456';

  test('Register: redirige vers le dashboard après une inscription réussie', async ({ page }) => {
    await page.goto(REGISTER_URL);

    await page.fill('#username', uniqueUsername);
    await page.fill('#email', uniqueEmail);
    await page.fill('#password', password);
    await page.fill('#confirmPassword', password);

    await page.getByRole('button', { name: /create account/i }).click();

    await page.waitForURL(DASHBOARD_URL);
    await expect(page).toHaveURL(DASHBOARD_URL);
  });

  test('Login: affiche une erreur si credentials invalides', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.fill('#email', 'fakeuser@example.com');
    await page.fill('#password', 'wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/Invalid/i)).toBeVisible();
  });

  test('Login: redirige vers le dashboard si credentials valides', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.fill('#email', uniqueEmail);
    await page.fill('#password', password);
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.waitForURL(DASHBOARD_URL);
    await expect(page).toHaveURL(DASHBOARD_URL);
  });
});
