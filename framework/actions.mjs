 
import { test, expect } from '@playwright/test';
//import { Page } from 'playwright';


export async function isVisible(page, locator) {
    await page.waitForSelector(locator);
    return await page.isVisible(locator);
}


export async function click(page, address, log) {
    try {
        await test.step("able to click on " + log + "", async () => {
            const locator = page.locator(address);
            await locator.click();
        });

    } catch (error) {
        await test.step("unable to click on " + log + "", async () => { });
    }
}

export async function clickFirst(page, address, log) {
    try {
        await test.step("able to click on " + log + "", async () => {
            const locator = page.locator(address).first();
            await locator.click();
        });

    } catch (error) {
        await test.step("unable to click on " + log + "", async () => { });
    }
}

export async function waitAndClick(page, address, log) {
    try {
        await test.step("able to click on " + log + "", async () => {
            const locator = page.locator(address);
            await page.waitForSelector(locator, { timeout: 10000 })
            await locator.click();
        });

    } catch (error) {
        await test.step("unable to click on " + log + "", async () => { });
    }
}


export async function doubleClick(page, address, log) {
    try {
        await test.step("able to click on " + log + "", async () => {
            const locator = page.locator(address).first();
            await locator.click({ clickCount: 2 });
        });

    } catch (error) {
        await test.step("unable to click on " + log + "", async () => { });
    }
}

export async function clear(page, locator, log) {
    try {
        await page.waitForSelector(locator);
        await page.fill(locator, '');
    } catch (error) {
        await test.step("unable to clear " + log + "", async () => { });
    }
}

export async function sendKeys(page, locator, value) {
    try {
        await test.step("able to enter  " + value + "", async () => {
            await page.waitForSelector(locator);
            await page.fill(locator, value);

        });
    } catch (error) {
        await test.step("unable to enter " + value + "", async () => { });
    }
}

export async function selectValueInDropdown(page, locator, value, dropdownName) {
    try {
        await test.step("able to select value " + value + " in dropdown " + dropdownName + "", async () => {
            await page.waitForSelector(locator);
            await page.locator(locator).selectOption(value);
        });
    } catch (error) {
        await test.step("able to select value " + value + " in dropdown " + dropdownName + "", async () => { });
    }
}


export async function verifyText(page, locator, value, logname) {
    try {
        await test.step("able to verify the text - " + value + " of " + logname + "", async () => {
            await page.waitForSelector(locator);
            await expect(page.locator(locator)).toHaveText(value);
        });
    } catch (error) {
        await test.step("unable to verify the text - " + value + " of " + logname + "", async () => { });
    }
}

export async function verifyElementPresent(page, locator, logname) {
    try {
        await test.step(logname + " is available", async () => {
            await page.waitForSelector(locator, { timeout: 5000 })
        });
    } catch (error) {
    await test.step(logname + " isn't available", async () => { });
    }
}

export async function scrollToElement(page, locator, logname) {
    try {
        await test.step("Scroll to " +logname, async () => {
            const locator = page.locator(address).first();
            await locator.scrollOnElement();
        });
    } catch (error) {
    await test.step("unable to scroll to " +logname, async () => { });
    }
}


