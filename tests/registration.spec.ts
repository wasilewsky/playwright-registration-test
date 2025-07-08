import { test, expect } from '@playwright/test';

test('veeam r&d forums registration public domain error message', async ({ page }) => {
  await page.goto('https://veeam.com/');

  await page.hover('nav >> text=Support');
  await page.click('nav >> text=R&D Forums');

  await expect(page).toHaveURL('https://forums.veeam.com/?ad=menu-support');

  await page.click('text=Register');
  await page.locator('text=I agree to these terms').click({ timeout: 1000 });

  const fillForm = async () => {
    await page.fill('input[name="username"]', 'InterviewUser');
    await page.fill('input[name="new_password"]', 'InreviewUser');
    await page.fill('input[name="password_confirm"]', 'InreviewUser');
    await page.fill('input[name="email"]', 'inreviewuser@gmail.com');
  };

  await fillForm();
  await page.click('text=Submit');

  // terms acceptance if it appears again
  const agreeAgain = page.locator('text=I agree to these terms');

  if (await agreeAgain.isVisible()) {
    await agreeAgain.click();

    await fillForm();
    await page.click('text=Submit');
  }

  await expect(page.locator('body')).toContainText(/Public email are not allowed/i);
});
