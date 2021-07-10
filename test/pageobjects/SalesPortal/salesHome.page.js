import Page from "./page";
import { helper } from '../../utils/helper';
import { config } from "../../../wdio.conf";
import { pageIds, urls } from '../../resources/literals';

const { SALES_PORTAL_HOME } = pageIds;

class SalesHome extends Page {

    constructor() {
        super(SALES_PORTAL_HOME);
    }
    
    /**
     * Getters of the elements of the page 
     */
    get addressInput()  { return $('#address') }
    get firstAddress()  { return $('ul[role="menu"] li') }
    get checkBox()      { return $('#undefined-container') }
    get getMyQuoteBtn() { return $('button[type="button"]') }

    //Nav Bar items 
    get getStartedBtn()   { return $(`a[href="${urls.short.GET_STARTED}"]`) }
    get ourInsuranceBtn() { return $(`a[href="${urls.short.OUR_INSURANCE}"]`) }
    get aboutUsBtn()      { return $(`a[href="${urls.short.ABOUT_US}"]`) }
    get contactUsBtn()    { return $(`a[href="${urls.short.CONTACT_US}"]`) }

    async open() {
        await super.open('/');
    }

    async completeAddress(address) {
        await helper.waitForDisplayedAndSetValue(await this.addressInput,address);
        await helper.waitForDisplayedAndClick(await this.firstAddress);
    }

    async checkDisclosure(){
        await helper.waitForDisplayedAndClick(await this.checkBox,config.timeout.S);
    }

    async completeAddressAndContinue(address){
        await this.completeAddress(address);
        await this.checkDisclosure();
        await this.goToNextPage();
    }
    
    /**
     * From here on all methods are to do with navigations
     */
    async goToNextPage() {
        await helper.waitForEnabledAndClick(await this.getMyQuoteBtn);
        await super.waitForSpinner();
    }

    async goToSection(section) {
        let element;
        switch(section){
            case urls.short.GET_STARTED:
                element = await this.getStartedBtn;
                break;
            case urls.short.OUR_INSURANCE:
                element = await this.ourInsuranceBtn;
                break;
            case urls.short.ABOUT_US:
                element = await this.aboutUsBtn;
                break;
            case urls.short.CONTACT_US:
                element = await this.contactUsBtn;
                break;
            default:
                throw new Error(`${section} is not defined`);
        }
        await helper.waitForDisplayedAndClick(element);
    }

}

module.exports = new SalesHome();