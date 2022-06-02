import {click} from '../framework/actions.mjs';

export class DesignBuy {
    constructor(page) {
        this.page = page;
    }
    get startDesign() { return '//a[contains(text(), "Start Design")]'}
    get searchSavedDesigns() { return '//a[contains(text(), "Search Saved Design")]'}
    
    async navigateToStartDesign(){
        await click(this.page, this.startDesign, "Start Design");
    }

    async navigatetoDesign(){
        await click(this.page, this.searchSavedDesigns, "Search Saved Design");
    }
}