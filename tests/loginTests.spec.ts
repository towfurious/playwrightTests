import {expect, test} from "@playwright/test";

test('Login', async ({page}) => {
    await page.goto('https://saucedemo.com');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('.submit-button.btn_action').click();
    await expect(page.locator('.app_logo')).toBeVisible();
});