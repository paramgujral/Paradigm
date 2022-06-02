import {click, scrollToElement, clickFirst, sendKeys, doubleClick} from '../framework/actions.mjs';

export class ProductDesign {
    constructor(page) {
        this.page = page;
    }

    get continueOnPopup() { return '//button[text()="Continue" and @class="btn btn-primary"]'};
    get continue() { return '//button[text()="Continue"]'};
    get actualWidth () { return '//p[contains(text(),"Specify Actual size for width")]//following-sibling::div//input'};
    get actualHeight () { return '//p[contains(text(),"Specify Actual Opening size for height")]//following-sibling::div//input'};
    // get addToDesign() { return '//button[text() = "Add to Design"]'};
    get addToDesign() { return '//button[@type="submit" and text() = "Add to Design"]'};

    async continueInformation(){
        await click(this.page, this.continueOnPopup, "Continue");
        await this.page.waitForTimeout(3000);
    }

    async designWindow(sizing, designOptions, glassOption, accessories){
        await this.designSizeAndStandard(sizing);
        await this.designOption(designOptions);
        await this.designGlassOption(glassOption);
        await this.designAccessories(accessories);

    }

    async designSizeAndStandard (sizing){
        if(sizing.measurementType != undefined){
            let elemmeasurementType = `//div[text() = "${sizing.measurementType}"]`
            await click(this.page, elemmeasurementType, "Measurement Type");   
        }

        await this.page.waitForTimeout(3000);
        if(sizing.sashSlit != undefined){
            let elemsashSlit = `//div[text() = "${sizing.sashSlit}"]`
            await click(this.page, elemsashSlit, "Sash Slit");
            await this.page.waitForTimeout(3000);
        }
        
        
        if(sizing.actualWidth != undefined){
            await sendKeys(this.page, this.actualWidth, sizing.actualWidth, "Actual Width");
            await this.page.waitForTimeout(5000);
        }
        
        if(sizing.actualHeight != undefined){
            await click(this.page, this.actualHeight, "Actual Height");
            await this.page.waitForTimeout(3000);
            await sendKeys(this.page, this.actualHeight, sizing.actualHeight, "Actual Height");
            await this.page.waitForTimeout(5000);
        }

        await clickFirst(this.page, this.continue, "Continue");
        await this.page.waitForTimeout(3000);
        await clickFirst(this.page, this.continue, "Continue");
        await this.page.waitForTimeout(3000);
    }

    async designOption(designOption){
        if(designOption.exteriorFinishType != undefined){
            let elem = `//div[text() = "${designOption.exteriorFinishType}"]`
            await click(this.page, elem, "Exterior Finish Type");
            await this.page.waitForTimeout(3000);
        }

        if(designOption.exteriorFinish != undefined){
            let elem = `//div[text() = "${designOption.exteriorFinish}"]`
            await clickFirst(this.page, elem, "Exterior Finish");
            await this.page.waitForTimeout(3000);
        }
        
        if(designOption.grilleType != undefined){
            let elem = `//div[text() = '${designOption.grilleType}']`
            await click(this.page, elem, "Grill Type");
            await this.page.waitForTimeout(3000);
        }

        if(designOption.grillePattern != undefined){
            let elem = `//div[text() = "${designOption.grillePattern}"]`
            await click(this.page, elem, "Grill Pattern");
            await this.page.waitForTimeout(3000);
        }

        if(designOption.grillColor != undefined){
            let elem = `//div[text() = "${designOption.grillColor}"]`
            await click(this.page, elem, "Grill Color");
            await this.page.waitForTimeout(3000);
        }

        if(designOption.windowSecurityOption != undefined){
            let elem = `//div[text() = "${designOption.windowSecurityOption}"]`
            await click(this.page, elem, "Window Security Option");
            await this.page.waitForTimeout(3000);
        }

        await clickFirst(this.page, this.continue, "Continue");
        await this.page.waitForTimeout(3000);
       
        
    }


    async designGlassOption(glassOption){
        if(glassOption.energyRating != undefined){
            let elem = `//div[text() = "${glassOption.energyRating}"]`
            await click(this.page, elem, "Energy Rating");
            await this.page.waitForTimeout(3000);
        }

        if(glassOption.glazing != undefined){
            let elem = `//div[text() = "${glassOption.glazing}"]`
            await click(this.page, elem, "Glazing");
            await this.page.waitForTimeout(3000);
        }
        
        if(glassOption.airSpaceOptions != undefined){
            let elem = `//div[text() = "${glassOption.airSpaceOptions}"]`
            await click(this.page, elem, "Air Space Options");
            await this.page.waitForTimeout(3000);
        }

        await clickFirst(this.page, this.continue, "Continue");
        await this.page.waitForTimeout(3000);

    }

    async designAccessories(windowAccessories){
        if(windowAccessories.screen != undefined){
            let elem = `//div[text() = "${windowAccessories.screen}"]`
            await click(this.page, elem, "Energy Rating");
            await this.page.waitForTimeout(3000);
        }

        if(windowAccessories.exteriorTrimOptions != undefined){
            let elem = `//div[text() = "${windowAccessories.exteriorTrimOptions}"]`
            await click(this.page, elem, "Exterior Trim Options");
            await this.page.waitForTimeout(3000);
        }
        
        if(windowAccessories.exteriorTrimApplication != undefined){
            let elem = `//label[text()='${windowAccessories.exteriorTrimApplication}']/input`
            await click(this.page, elem, "Exterior Trim Application");
            await this.page.waitForTimeout(3000);
        }

        if(windowAccessories.wallReturn != undefined){
            let elem = `//div[text()='${windowAccessories.wallReturn}']`
            await click(this.page, elem, "Wall Return");
            await this.page.waitForTimeout(3000);
        }

        if(windowAccessories.headExpander != undefined){
            let elem = `//label[text()='${windowAccessories.headExpander}']/input[@type='radio']`
            await clickFirst(this.page, elem, "Head Expander");
            await this.page.waitForTimeout(3000);
        }

        await clickFirst(this.page, this.addToDesign, "Add to Design");

    }
    
}