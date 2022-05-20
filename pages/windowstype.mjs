import {click, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute} from '../framework/actions.mjs';

export class WindowType {
    constructor(page) {
        this.page = page;
    }
    get userName () { return '//li[@class="dropdown"]/a' };
    get windowMaterial () { return '//label[text()="Vinyl Interior & Vinyl Exterior"]' };
    get windowsWithNailingFlange () { return '//h4[text()="Windows With Nailing Flange"]' }
    get windowsWithoutNailingFlange () { return '//h4[text()="Windows Without Nailing Flange"]' }
    get mostPopularSizesStyles () { return '//h5[text()="Most Popular Sizes/Styles"]' }
    get customWindowParts () { return '//h5[text()="Custom Window Parts"]' }
    get standardWindowParts () { return '//h5[text()="Standard Window Parts"]' }
    get desingTabHightlighted () { return '//li[@class="active menards-design"]' }
    get productTypeMostPopular () { return '//h5[text()=\'Most Popular Sizes/Styles\']//parent::div/p/a' }
    get productCustomWindow () { return '//h5[text()="Custom Window Parts"]//parent::div/p/a' }
    
    async verifyUserName(firstName){
        await verifyText(this.page, this.userName, firstName, "User Name");
    }

    async verifyDesignTabHighlighted(){
        await verifyElementPresent(this.page, this.desingTabHightlighted, "Highlighted Design Tab")
    }

    async verifyProjectTypeOptions(){
        await verifyElementPresent(this.page, this.windowsWithNailingFlange, "Windows With Nailing Flange");
        await verifyElementPresent(this.page, this.windowsWithoutNailingFlange, "Windows Without Nailing Flange");
        await verifyElementPresent(this.page, this.mostPopularSizesStyles, "Most Popular Sizes/Styles");
        await verifyElementPresent(this.page, this.customWindowParts, "Custom Window Parts");
        await verifyElementPresent(this.page, this.standardWindowParts, "Standard Window Parts");

    }

    //Window with and without nailing flange
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


    async navigateToMostpopularOptions(){
        await waitAndClick(this.page, this.productTypeMostPopular, "Most Popular Sizes/Styles")
    }

    async navigateToCustomWindowOptions(){
        await waitAndClick(this.page, this.productCustomWindow, "Custom Window Parts")
    }


}