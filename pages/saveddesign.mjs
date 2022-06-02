import {click, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute} from '../framework/actions.mjs';

export class SavedDesign {
    constructor(page) {
        this.page = page;
    }

    get summaryTab () { return '//button[contains(text(),"Summary")]' }
    get summaryTabHightlighted () { return '//li[@class="active menards-summary"]' }
    get desingTabHightlighted () { return '//li[@class="active menards-design"]' }
    get tabPurchase () { return '//li/a[text()="Purchase"]' }
    get purchaseTabHightlighted () { return '//li[@class="active menards-purchase"]' }
    get msgFirstAddLineItem () { return '//div[text()="You must configure one line item before continuing."]' }


    async navigateToPurchase(){
        await click(this.page, this.tabPurchase, "Purchase");
        await verifyElementPresent(this.page, this.addToCart, "Add to cart")
    }

    async verifyPurchaseTabHighlighted(){
        await verifyElementPresent(this.page, this.desingTabHightlighted, "Highlighted Design Tab")
    }


    async verifyDesignTabHighlighted(){
        await verifyElementPresent(this.page, this.desingTabHightlighted, "Highlighted Design Tab")
    }


    async navigatetToSummay(){
        await click(this.page, this.summaryTab, "Summary Tab");
        await this.page.waitForTimeout(5000);
        await verifyElementPresent(this.page, this.summaryTabHightlighted, "Highlighted Summary Tab");
    }

    async navigatetToSummayBeforAddLineItem(){
        await click(this.page, this.summaryTab, "Summary Tab");
        await this.page.waitForTimeout(3000);
        await verifyElementPresent(this.page, this.msgFirstAddLineItem, "Warning! add line item first");
    }
}