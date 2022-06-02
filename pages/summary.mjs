import {click, addInResult, countElement, compareText, inputKeyboard, verifySubString, verifyLength, verifyLengthGreaterThan, 
    getText, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute, sendKeys, simulateEnterKeyPress} from '../framework/actions.mjs';
import { MainTabs } from './maintabs.mjs';

export class Summary {
    constructor(page) {
        this.page = page;
    }
        get btnPurchase () { return '//div/a[text()="Purchase"]' }
        get addToCart () { return '//button[text()="Add To Cart"]' }
        get designID () { return '(//div[@class="design-info"]/div/div/p)[3]'} //check length 12
        get designDefaultName() { return '//p[text()="Unassigned Quote"]'} //check presence
        get price () { return '//strong[contains(text(),"$")]'} // check presence
        get btnRename () { return '(//button[@title="Rename"])[2]'} // clickVisible
        get designName () { return '//input[@name="TextValue"]'} //fill and check attribute maxlength="50"
        get saveDesign () { return '//button[text()="Save"]' }
        get firstItemPrice () { return '//label[text()="Price"]/parent::div/div/span'} // should be equat to price above
        get txtbxroomName () { return '//input[@value="None Assigned"]'} // presence and fill with room name form data 
        get copyButton() { return '//button[@title="Copy"]'} //copy and verify 2 instances of description

        get deleteItem() { return '//button[@title="Delete"]'}
        get messageAfterDelete() { return '//p[text()="Click Continue Shopping to get started"]' }
        get continueShoping() { return '//a[text()="Continue Shopping"]' }
        get closeSaveDesignPopup () { return '//form[@class="form-horizontal design-modal"]/div[@class="modal-header"]/button' }


    async verifyItemOnSummary(ItemDescription){
        // await new MainTabs(this.page).navigatetToSummay();
        await waitAndClick(this.page, this.closeSaveDesignPopup, "Close save design form")
        let summaryDescription = `//span[contains(text(), '${ItemDescription}')]`;
        await verifyElementPresent(this.page, summaryDescription, "SKU Description in Summary")
    }

    async deleteAndContinueShoping(){
        await click(this.page, this.deleteItem, "Delete items");
        await simulateEnterKeyPress(this.page);
        await verifyElementPresent(this.page, this.messageAfterDelete, "Click on continue shoping")
        await click(this.page, this.continueShoping, "Continmue Shoping");
        await new MainTabs(this.page).verifyDesignTabHighlighted();
    }

    async verifySummaryPage(){
        let designId = await this.page.locator(this.designID).innerText();
        await verifyLength(designId.length, 7, 'Design Id');
        await verifyElementPresent(this.page, this.designDefaultName, 'Default name of Design');
        await verifyElementPresent(this.page, this.price, 'Estimated Price');
        await verifyElementPresent(this.page, this.btnRename, 'Rename Design');
        let expectedPrice = await this.page.locator(this.price).innerText();
        let itemPrice = await this.page.locator(this.firstItemPrice).innerText();
        await compareText(String(expectedPrice), String(itemPrice), "Price on summary page");
        await verifyElementPresent(this.page, this.txtbxroomName, 'Room Name as None Assigned by default');
        await sendKeys(this.page, this.txtbxroomName, "Living");

    }

    async renameDesign(designName){
        await click(this.page, this.btnRename, "Rename Design");
        let newdesignName = designName + Math.floor((Math.random() * 10000) + 1);
        await sendKeys(this.page, this.designName, newdesignName);
        await click(this.page, this.saveDesign, "Sabe Design");
        let elem = await `//p[text()="${designName}"]`
        await verifyElementPresent(this.page, elem, "Updated Design Name")
    }

    async copyDesign(itemDes){
        await click(this.page, this.copybutton, "Copy design");
        await this.page.waitForTimeout(5000);
        let elem = $$page.locator(`//span[contains(text(), ${itemDes})]`)
        await verifyLength(elem.length, 2, 'line Item count');
    }
}

