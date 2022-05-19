import {click, compareText, inputKeyboard, verifySubString, verifyLength, verifyLengthGreaterThan, 
    getText, waitAndClick, verifyText, verifyElementPresent, verifyElementAttribute, 
    countElement, sendKeys} from '../framework/actions.mjs';

export class MostPopular {
    constructor(page) {
        this.page = page;
    }
    get userName () { return '//li[@class="dropdown"]/a' }


    get searchSKUNumber () { return '//input[@placeholder="SKU Number"]'}
    get searchSKUDescription () { return '//input[@placeholder="SKU Description"]'}
    get searchButton ()  { return '//button[text() = "Search SKUs"]' }
    get resetButton ()  { return '//button[text() = "Reset"]'}

    get skuRecords () { return '//table[@class = "table table-hover table-condensed sku-grid"]//tbody/tr'}
    get firstRecodSKUNo () { return '//tbody/tr[1]/td[1]'};
    get firstRecodSKUDesc () { return '//tbody/tr[1]/td[2]'};
    get firstRecodSKUPrice () { return '//tbody/tr[1]/td[3]'};
    get firstRecodSKUQuantity () { return '//tbody/tr[1]/td[4]/input'};
    get firstRecodSKUAdd () { return '//tbody/tr[1]/td[5]/button'};   

    get paginationPreviousButton () { return "//li[contains(@class, 'previous')]/a"}
    get paginationPreviousButtonDisable () { return '//li[contains(@class, "previous disabled")]/a'}
    get paginationNextButton () { return '//li[contains(@class, "next")]/a'}
    get paginationNextButtonDisable () { return '//li[contains(@class, "next disabled")]/a'}
    get paginationLastPagebutton () { return '//li[contains(@class, "next")]/preceding-sibling::li[1]/a'}
    get currentPageButton() { return '//a[contains(@aria-label, "current page")]/parent::li/a'}
    get pageBreak() { return '//li[@class="break"]'}

    
    async verifyDesignTabHighlighted(){
        await verifyElementPresent(this.page, this.desingTabHightlighted, "Highlighted Design Tab")
    }

    async navigateToMostpopularOptions(){
        await click(this.page, this.productTypeMostPopular, "Most Popular Sizes/Styles")
    }

    async verifySKUOnPage(){

        await this.page.waitForSelector(this.skuRecords, { timeout: 10000 })    
        //let recordCount = this.page.locator(this.skuRecords).count();
        await this.page.waitForTimeout(5000);
        let recordCount = await this.page.$$("//table[@class='table table-hover table-condensed sku-grid']//tbody/tr");

        for (let i=1; i<=recordCount.length; i++){
            
            let recordSKUNo = `//tbody/tr[${i}]/td[1]`
            let recordSKUDesc = `//tbody/tr[${i}]/td[2]`
            let recordSKUPrice = `//tbody/tr[${i}]/td[3]`
            let recordSKUQuantity = `//tbody/tr[${i}]/td[4]/input` //Value=1
            let recordSKUAdd = `//tbody/tr[${i}]/td[5]/button` //text=Add

            let recordSKUNoValue = await this.page.locator(recordSKUNo).innerText();
            let recordSKUDescValue = await this.page.locator(recordSKUDesc).innerText();
            let recordSKUPriceValue = await this.page.locator(recordSKUPrice).innerText();

            let recordSKUQuantityValue = await this.page.$eval(recordSKUQuantity, el => el.value);
            let recordSKUAddText = await this.page.locator(recordSKUAdd).innerText();
            
            await verifyLength(recordSKUNoValue, 7, 'SKU Number');
            await verifyLengthGreaterThan(recordSKUDescValue.length, 20, 'SKU Description');
            await verifySubString(recordSKUPriceValue, '$', 'SKU Price');
            await verifySubString(recordSKUQuantityValue, '1', 'SKU Quantity');
            await verifySubString(recordSKUAddText, 'Add', 'SKU Add Button');
        }
    }

    async verifyPagination(){

        let lastPageNumber = await this.page.locator(this.paginationLastPagebutton).innerText();

        if(lastPageNumber == 1){
            await verifyElementPresent(this.page, this.paginationNextButtonDisable, "left page disabled");
            await verifyElementPresent(this.page, this.paginationPreviousButtonDisable, "Right button disabled");
        }else{
            await verifyElementPresent(this.page, this.paginationNextButton, "left page disabled");
            await verifyElementPresent(this.page, this.paginationPreviousButtonDisable, "Right button enabled");
            
            let elem = `//a[text()='${lastPageNumber}']`;
            await waitAndClick(this.page, elem, "last page");
            
            await verifyElementPresent(this.page, this.paginationNextButtonDisable, "left page enabled");
            await verifyElementPresent(this.page, this.paginationPreviousButton, "Right button disabled");
            await click(this.page, this.paginationPreviousButton, "Right button");
            
            let secondlastPageNumber = await this.page.locator(this.currentPageButton).innerText();
            await compareText((lastPageNumber-1).toString(), secondlastPageNumber, 'Current Page');
        }
    }

    async searchUsingSKUNo(SKUNumbers){

        for(let i=0;i<SKUNumbers.length;i++){
            // await click(this.page, this.searchSKUNumber, 'SKU Number');
            await sendKeys(this.page, this.searchSKUNumber, SKUNumbers[i].toString());
            await this.page.waitForTimeout(2000);
            await click(this.page, this.searchButton, "Search Button");
            await this.page.waitForTimeout(5000);
            let recordSKUNo = `//tbody/tr[1]/td[1]`
            let actualSKUCode = await this.page.locator(recordSKUNo).innerText();
            await compareText(actualSKUCode, SKUNumbers[i].toString(), 'SKU Code');
            await click(this.page, this.resetButton, "Reset");
        }
        
    }

    async searchUsingSKUDes(SKUDescriptions){

        for(let i=0;i<SKUDescriptions.length;i++){
            await sendKeys(this.page, this.searchSKUDescription, SKUDescriptions[i]);
            await this.page.waitForTimeout(2000);
            await click(this.page, this.searchButton, "Search Button");
            await this.page.waitForTimeout(5000);
            await this.page.waitForSelector(this.skuRecords, { timeout: 10000 })    
            //let recordCount = this.page.locator(this.skuRecords).count();
            await this.page.waitForTimeout(5000);
            let recordCount = await this.page.$$("//table[@class='table table-hover table-condensed sku-grid']//tbody/tr");
            if(recordCount.length == 0){
                await test.step("No Record Found", async () => {
                });
            }else{
                for (let j=1; j<=recordCount.length; j++){
                    let recordSKUDesc = `//tbody/tr[${j}]/td[2]`
                    let actualSKUDesc = await this.page.locator(recordSKUDesc).innerText();
                    await verifySubString(actualSKUDesc, SKUDescriptions[i], 'SKU Descrption')
                }
            }
            await click(this.page, this.resetButton, "Reset");
        }
        
    }
}
