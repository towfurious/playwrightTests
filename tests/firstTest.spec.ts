import {expect, test} from '@playwright/test'

test.describe('Getting Started', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://saucedemo.com')
    })

    test('My test name 2 ', async ({page}) => {
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()
    })
})
