import test from '@playwright/test';
import { verifyText, clear, click, sendKeys, selectValueInDropdown } from '../framework/actions.mjs';
export class InitApp {
    constructor(page) {
        this.page = page;
    }

    get appTypeWindows() { return '//input[@value="OnlineWindowStore"]' }
    get appTypeDoors() { return '//input[@value="OnlinePatioDoorStore"]' }
    get appTypeGarageDoors() { return '//input[@value="OnlineGarageDoorStore"]' }
    get appTypeMilliken() { return '//input[@value="Milliken"]' }
    get storeNumber() { return '//input[@id="storeNumber"]' }
    get guestAccountId() { return '//input[@id="guestAccountId"]' }
    get firstName() { return '//input[@id="firstName"]' }
    get designId() { return '//input[@id="designId"]' }
    get isInternal() { return '//input[@id="isInternal"]' }
    get SaveDesignFlg() { return '//input[@id="SaveDesignFlg"]' }
    get guestEmail() { return '//input[@id="guestEmail"]' }
    get storeEmail() { return '//input[@id="storeEmail"]' }
    get menardsSku() { return '//input[@id="menardsSku"]' }
    get submit() { return '//button[@type="submit"]' }

    
   

    async open(appURL) {
        await test.step("able to access application url " + appURL + "", async () => {
            await this.page.goto(appURL);
        });
    }

    async InitiateApp(apptype, data, loginType) {

        switch(apptype) {
            case "Windows":
                await click(this.page, this.appTypeWindows, "Windows");
                break;
            case "Doors":
                await click(this.page, this.appTypeDoors, "Doors");
                break;
            case "Garage Doors":
                await click(this.page, this.appTypeGarageDoors, "Garage Doors");
                break;
            case "Milliken":
                await click(this.page, this.appTypeMilliken, "Milliken");
                break;
          }
        await sendKeys(this.page, this.storeNumber, data.storeNumber);
        await sendKeys(this.page, this.guestAccountId, data.gustAccountNo);
        await sendKeys(this.page, this.firstName, data.firstName);
        if(loginType == 'Instore'){
            await click(this.page, this.isInternal, "Is Internal");
        }
        await click(this.page, this.submit, "Submit");
    }

   

}