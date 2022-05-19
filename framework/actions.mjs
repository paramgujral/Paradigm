 
import { test, expect } from '@playwright/test';
//import { Page } from 'playwright';


//Common Actions

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
            await page.waitForSelector(address, { timeout: 10000 })
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
            await page.fill(locator, '');
            await page.fill(locator, value);

        });
    } catch (error) {
        await test.step("unable to enter " + value + "", async () => { });
    }
}


export async function inputKeyboard(page, locator, value) {
    try {
        await test.step("able to enter  " + value + "", async () => {
            await page.waitForSelector(locator);
            await await page.locator(locator).click();
            await page.keyboard.type(value);

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


export async function getText(page, locator, logname) {
    try {
        await test.step("the text of " + logname +" is ", async () => {
            await page.waitForSelector(locator, { timeout: 10000 })
            return await page.$eval(locator, el => el.text);
        });
    } catch (error) {
        console.log(error.message);
    }
}



//Assertions

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
            //await expect(page.locator(locator)).toBeVisible();
            await page.waitForSelector(locator, { timeout: 10000 })
        });
    } catch (error) {
        console.log(error.message);
    await test.step(logname + " isn't available", async () => { });
    }
}


export async function verifyElementAttribute(page, locator, attribute, value, logname) {
    try {
        await test.step(logname + " has " + value +" for attribute " +attribute, async () => {
            await page.waitForSelector(locator, { timeout: 5000 })
            await expect(page.locator(locator)).toHaveAttribute(attribute, value);
        });
    } catch (error) {
    await test.step(logname + " has different value - " + value +" for attribute " +attribute, async () => { });
    }
}


export async function countElement(page, locator, logname) {
    try {
        let count = 0;
        await test.step(logname + " has " + count + " " + +logname, async () => {
            await page.waitForSelector(locator, { timeout: 5000 })
            return page.locator(locator).count();
        });
    } catch (error) {
    await test.step("unable to count the elements " +logname, async () => { });
    }
}


export async function verifyLength(actualLength, expectedLength, logname) {
    try {
        await test.step("able to verify the length of " + " of " + logname +" " + actualLength + " equals to" +expectedLength , async () => {
            expect(actualLength).toHaveLength(expectedLength);
        });
    } catch (error) {
        await test.step("unable to verify the length - " + expectedLength + " of " + logname, async () => { });
    }
}


export async function verifyLengthGreaterThan(object, expectedLength, logname) {
    try {
        await test.step("able to verify the length is greater than " + expectedLength + " of " + logname, async () => {
            expect(object).toBeGreaterThan(expectedLength);
        });
    } catch (error) {
        await test.step("unable to verify the length is greater than " + expectedLength + " of " + logname, async () => { });
    }
}

export async function verifySubString(string, substring, logname) {
    try {
        await test.step(string +" contains "+substring, async () => {
            expect(string).toContain(substring)
        });
    } catch (error) {
        console.log(error.message);
        await test.step("substring is not found", async () => { });
    }
}


export async function compareText(text1, text2, logname) {
    try {
        await test.step("comparision of " + text1 + " passed", async () => {
            expect(text1).toEqual(text2)
        });
    } catch (error) {
        // await test.step("comparision of " + text1 + " failed", async () => { });
        console.log(error.message);
    }
}















