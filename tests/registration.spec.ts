import { test, expect } from '@playwright/test';

test('veeam r&d forums registration public domain error message', async ({ page }) => {
  await page.goto('https://veeam.com/');

  const viewport = page.viewportSize();
  const isMobile = viewport && viewport.width < 1260;

  const acceptCookies = page.getByRole('button', { name: 'Accept' });
  if (await acceptCookies.isVisible({ timeout: 3000 })) {
    await acceptCookies.click();
  }

  if (isMobile) {
    await page.click('button[aria-label="Header menu"]');
    await page.getByRole('button', { name: 'Support' }).click();
    await page.getByRole('link', { name: 'R&D Forums' }).click();
  } else {
    await page.hover('nav >> text=Support');
    await page.click('nav >> text=R&D Forums');
  }

  await expect(page).toHaveURL('https://forums.veeam.com/?ad=menu-support');

  await page.click('text=Register');
  const agreeButton = page.locator('input[name="agreed"]');
  await agreeButton.waitFor({ state: 'visible', timeout: 3000 });
  await expect(agreeButton).toBeEnabled();
  if (isMobile) {
    await agreeButton.scrollIntoViewIfNeeded();
  }
  await agreeButton.click({ delay: 1000 });
  await agreeButton.waitFor({ state: 'hidden', timeout: 10000 });

  const fillForm = async () => {
    const usernameField = page.locator('input[name="username"]');
    expect(usernameField).toBeTruthy();

    await page.fill('input[name="username"]', 'InterviewUser');
    await page.fill('input[name="new_password"]', 'InreviewUser');
    await page.fill('input[name="password_confirm"]', 'InreviewUser');
    await page.fill('input[name="email"]', 'inreviewuser@gmail.com');
  };

  await fillForm();
  await page.click('text=Submit');

  for (let i = 0; i < 3; i++) {
    const agreeAgain = page.locator('input[name="agreed"]');
    const isVisible = await agreeAgain.isVisible({ timeout: 3000 });

    if (isVisible) {
      await agreeAgain.waitFor({ state: 'visible', timeout: 5000 });
      await expect(agreeAgain).toBeEnabled();

      if (isMobile) {
        await agreeAgain.scrollIntoViewIfNeeded();
      }
      
      await agreeAgain.click({ delay: 1000 });

      await agreeAgain.waitFor({ state: 'hidden', timeout: 10000 });

      await fillForm();
      await page.click('text=Submit');
    } else {
      break;
    }
  }

  await expect(page.locator('body')).toContainText(/Public email are not allowed/i);
});
