import {expect, Page, test} from "@playwright/test";

test.describe('For testing', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://saucedemo.com')
    })

    test('Finding locators basic', async ({page}) => {
        await page.getByRole('button', {name: 'Login'}).click();
        await page.getByRole('heading', {name: 'Password for all users'}).click();
        await page.getByPlaceholder('Username').click()
        await page.getByPlaceholder('Password').click()
        await page.getByTestId('login-button').click()
    });

    test('Finding locators complex', async ({page}) => {
        await login(page, 'standard_user', 'secret_sauce')

        await page.getByRole('button', {name: 'Add to cart'}).nth(0).click();
        await page.getByTestId('inventory-item-name').filter({hasText: 'Sauce Labs Onesie'}).click();
    });

    test('Extracting values', async ({page}) => {
        await login(page, 'standard_user', 'secret_sauce')

        await page.getByRole('button', {name: 'Add to cart'}).first().click();
        const buttonText = await page.getByTestId('remove-sauce-labs-backpack').textContent()
        expect(buttonText).toEqual('Remove')
    })

    test('Extracting multiple values', async ({page}) => {
        await login(page, 'standard_user', 'secret_sauce')

        const allProducts = await page.getByTestId('inventory-item').all()
        expect(allProducts.length).toEqual(6)
    })
});

test('Check placeholder value', async ({page}) => {
    await page.goto('https://saucedemo.com')
    const expectedValue = 'Password'
    const placeholderValue = await page.locator('#password').getAttribute('placeholder')
    expect(placeholderValue).toEqual(expectedValue)
})

test('Check entered text value', async ({page}) => {
    await page.goto('https://saucedemo.com')
    const expectedValue = 'testUserName'
    const userNameInput = page.locator('#user-name')

    await userNameInput.fill(expectedValue);
    const inputFromUsername = await userNameInput.inputValue()
    expect(inputFromUsername).toEqual(expectedValue)
})

async function login(page: Page, username: string, password: string) {
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('.submit-button.btn_action').click();
    await expect(page.locator('.app_logo')).toBeVisible();
}

test.describe('Assertions scope', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://www.uitestingplayground.com/autowait')
    })

    test('Assertions', async ({page}) => {
        const fiveSecondsButton = page.locator('#applyButton5')
        await expect(fiveSecondsButton).toHaveText('Apply 5s')
        const targetButton = page.locator('#target')

        await fiveSecondsButton.click()
        await expect(fiveSecondsButton).toHaveText('Apply 5s')
        await expect(targetButton).toBeVisible({timeout: 6000})
        await page.getByRole('checkbox', {name: 'enabled'}).uncheck()
        await fiveSecondsButton.click()
        await expect(targetButton).toBeDisabled();
    });

    test('Soft assertions', async ({page}) => {
        const targetButton = page.locator('#target')
        await expect.soft(targetButton).toHaveText('Button new') //Soft assertion will pass the test
        await targetButton.click()
    });
});

test.describe('Auto await scope', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://play1.automationcamp.ir/expected_conditions.html')
    })

    test('Auto await', async ({page}) => {
        const minInput = page.locator('#min_wait')
        await minInput.clear();
        await minInput.fill('5')

        await page.locator('#visibility_trigger').click()
        await page.locator('#visibility_target').click({timeout: 6000})
    })
});

test.describe('Network auto await', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://www.uitestingplayground.com/ajax')
    })

    test('Network await', async ({page}) => {
        const pageLoadText = page.getByText('Data loaded with AJAX get request.')
        const buttonAjax = page.getByText("Button Triggering AJAX Request")
        await buttonAjax.click()
        await page.waitForLoadState("networkidle") // wait for content to be loaded
        await expect(pageLoadText).toBeVisible()
    })
});

test.describe('UI', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('Radio buttons', async ({page}) => {
        const buttonMale = page.locator("#male")
        const buttonFemale = page.locator("#female")

        await buttonMale.check()
        expect(buttonMale.isChecked())
        expect(await buttonFemale.isChecked()).toBe(false)

        await buttonFemale.check()
        expect(buttonFemale.isChecked())
        expect(await buttonMale.isChecked()).toBe(false)
    })

    test('Checkboxes', async ({page}) => {
        const mondayCheckbox = page.locator("#monday")
        const fridayCheckbox = page.locator("#friday")

        await mondayCheckbox.check()
        await fridayCheckbox.check()
        await expect(mondayCheckbox).toBeChecked()
        await expect(fridayCheckbox).toBeChecked()
    })

    test('Dropdowns', async ({page}) => {
        const country = page.locator("#country")

        await country.selectOption("Japan")
        await expect(country).toHaveValue("japan")

        const comboBox = page.locator("#comboBox")
        const dropDown = page.locator("#dropdown")
        await comboBox.clear()
        await comboBox.click()
        await dropDown.filter({hasText: "Item 24"}).click()
    })

    test('Alerts', async ({page}) => {
        const alertBtn = page.locator("#confirmBtn")
        page.on("dialog", async (dialog) =>
            dialog.accept())

        await alertBtn.click()

        const confirmText = page.locator("#demo")
        await expect(confirmText).toBeVisible()

    })

    test('Drug and Drop', async ({page}) => {
        const dragElement = page.locator("#draggable")
        const dropElement = page.locator("#droppable")

        await dragElement.dragTo(dropElement)
        await expect(dropElement).toHaveText("Dropped!")
    })
});
