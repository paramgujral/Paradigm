import {click, waitAndClick, verifyText, verifyElementPresent} from '../framework/actions.mjs';

export class WindowType {
    constructor(page) {
        this.page = page;
    }
    get userName () { return '//li[@class="dropdown"]/a'};
    get windowMaterial () {return '//label[text()="Vinyl Interior & Vinyl Exterior"]'};
    get windowsWithNailingFlange () {return '//h4[text()="Windows With Nailing Flange"]'}
    get windowsWithoutNailingFlange () {return '//h4[text()="Windows Without Nailing Flange"]'}
    get mostPopularSizesStyles () {return '//h5[text()="Most Popular Sizes/Styles"]'}
    get customWindowParts () {return '//h5[text()="Custom Window Parts"]'}
    get standardWindowParts () {return '//h5[text()="Standard Window Parts"]'}
    
    
    async verifyUserName(firstName){
        await verifyText(this.page, this.userName, firstName, "User Name");
    }

    async verifyProjectTypeOptions(){
        await verifyElementPresent(this.page, this.windowsWithNailingFlange, "Windows With Nailing Flange");
        await verifyElementPresent(this.page, this.windowsWithoutNailingFlange, "Windows Without Nailing Flange");
        await verifyElementPresent(this.page, this.mostPopularSizesStyles, "Most Popular Sizes/Styles");
        await verifyElementPresent(this.page, this.customWindowParts, "Custom Window Parts");
        await verifyElementPresent(this.page, this.standardWindowParts, "Standard Window Parts");

    }

    async selectWindow(productType, windowType){

        let elemProjectType = `//h4[text()="${productType}"]//parent::div/p/button`;
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
    }
    


}