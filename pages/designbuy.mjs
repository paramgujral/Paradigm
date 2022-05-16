import {click} from '../framework/actions.mjs';

export class DesignBuy {
    constructor(page) {
        this.page = page;
    }
    get startDesign() { return '//a[contains(text(), "Start Design")]'}
    async navigateToStartDesign(){
        await click(this.page, this.startDesign, "Start Design");
    }
}