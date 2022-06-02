import {click, addInResult, countElement, compareText, inputKeyboard, verifySubString, verifyLength, verifyLengthGreaterThan, 
    getText, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute, 
    sendKeys, simulateEnterKeyPress, clear} from '../framework/actions.mjs';

    import { MainTabs } from './maintabs.mjs';

export class StandardWindow {
    constructor(page) {
        this.page = page;
    }
    get partList () { return '//div[@class="product-select-tiles"]/div' }
    get checkBoxToSelectPartType () { return '//div[@class="form"]/div[@class="checkbox"]' }
    get searchPartTxtBx () { return '//input[@type="search"]'}
    get noProductFoundMsg () { return '//p[text()="No products found"]'}
    get closeSaveDesignPopup () { return '//form[@class="form-horizontal design-modal"]/div[@class="modal-header"]/button' }

    async verifyPartsInList(){

        let parts = await this.page.$$('//div[@class="product-select-tiles"]/div');

        for (let i=1; i<=parts.length; i++){
            
            let partNo = `(//div[@class="product-select-tiles"]/div//h4)[${i}]`
            let partName = `(//div[@class="product-select-tiles"]/div//p)[${i}]`

            let numberOfpart = await this.page.locator(partNo).innerText();
            let nameOfPart = await this.page.locator(partName).innerText();

            let value = numberOfpart + " " + nameOfPart;
            await addInResult(this.page, "Part number are description are: ", value)

            await verifyLengthGreaterThan(numberOfpart.length, 4, 'SKU Number');
            await verifyLengthGreaterThan(nameOfPart.length, 10, 'SKU Description');
        }
    }

    async verifyCheckBox(){
        await countElement(this.page, this.checkBoxToSelectPartType, "Checkbox to select part type");
    }

    async verifyLeftNavFilter(filerDetails){

        await this.page.waitForTimeout(5000);

        for (let i=0; i<filerDetails.length; i++){
            let elemCheckBox = `//label[text()='${filerDetails[0].filterName}']/input`;
            let elemPartNo = `//h4[text()='${filerDetails[0].partNumber}']`;
            let elemPartName = `//p[text()='${filerDetails[0].partName}']`;

            await click(this.page, elemCheckBox, "Select left nav filter");
            await verifyElementPresent(this.page, elemPartNo, "Part Number");
            await verifyElementPresent(this.page, elemPartName, "Part Name");
            await click(this.page, elemCheckBox, "De-select left nav filter");
        }
    }

    async verifySearchPart(searchtext, validateResult){
        
        await clear(this.page, this.searchPartTxtBx, "Part Search Box");
        await sendKeys(this.page, this.searchPartTxtBx, searchtext);

        await this.page.waitForTimeout(10000);
        
        let parts = await this.page.$$('//div[@class="product-select-tiles"]/div');

        for (let i=1; i<=parts.length; i++){
            
            let partNo = `(//div[@class="product-select-tiles"]/div//h4)[${i}]`
            let partName = `(//div[@class="product-select-tiles"]/div//p)[${i}]`

            let numberOfpart = await this.page.locator(partNo).innerText();
            let nameOfPart = await this.page.locator(partName).innerText();

            if ( validateResult == 'Part Number' ) {
                await verifySubString(numberOfpart, searchtext, 'Part Number' );
            }else if ( validateResult == 'Part Name' ) {
                await verifySubString(nameOfPart, searchtext, 'Part Name' )
            }
        }
        await clear(this.page, this.searchPartTxtBx, "Part Search Box");
        
    }

    async verifySearchPartNoResult(searchtext){
        await sendKeys(this.page, this.searchPartTxtBx, searchtext);
        await simulateEnterKeyPress();
        await verifyElementPresent(this.page, this.noProductFoundMsg, "No Product Found");
        }
    

    async AddPart(partName){
        
        let elemPartName = `//p[text()='${partName}']`;
        await click(this.page, elemPartName, "Add Part");
        await this.page.waitForTimeout(10000);
        //await new MainTabs(this.page).navigatetToSummay();
        //await waitAndClick(this.page, this.closeSaveDesignPopup, "Close save design form")
        let summaryDescription = `//span[contains(text(),'${partName}')]`;
        await verifyElementPresent(this.page, summaryDescription, "SKU Description in Summary")
        }
    }
