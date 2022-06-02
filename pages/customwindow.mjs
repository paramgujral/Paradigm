import {click, compareText, inputKeyboard, verifySubString, verifyLength, verifyLengthGreaterThan, 
    getText, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute, 
    countElement, sendKeys, simulateEnterKeyPress} from '../framework/actions.mjs';

export class CustomWindow {
    constructor(page) {
        this.page = page;
    }
    get userName () { return '//li[@class="dropdown"]/a' }

    async selectCustomWindow(productType, windowType){

        let elemProjectType = `//label[text()="${productType}"]`;
        await click(this.page, elemProjectType, "Project Type");

        // let elemProjectType = `//h4[text()="${windowType.projectType}"]//parent::div/p/button`;
        // await click(this.page, elemProjectType, "Project Type");
    
        let elemWindowMaterial = `//label[text()="${windowType.windowMaterial}"]`;
        await click(this.page, elemWindowMaterial, "Window Material");
    
        let elemWindowOperate = `//label[text()="${windowType.windowOperate}"]`;
        await click(this.page, elemWindowOperate, "Window Operate");
    
        let elemWindowjoined = `//label[text()="${windowType.windowjoined}"]`;
        await click(this.page, elemWindowjoined, "Window Shape");
    
        let elemProductSeries = `//h4[text()="${windowType.productSeries}"]`;
        await click(this.page, elemProductSeries, "Product Series");

        await this.page.waitForTimeout(10000);
    }

}
