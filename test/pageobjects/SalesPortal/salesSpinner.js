import { config } from "../../../wdio.conf";

/**
 * This class is to be used for spinner related actions, since they are not a page we are not 
 * creating page objects from them. 
 */
class Spinner {

    get spinner() { return $('.spinner-border img[alt="icon"]')}

    async waitForSpinner(timeout = config.timeout.XL) {
        await (await this.spinner).waitForDisplayed();
        await (await this.spinner).waitForDisplayed(timeout,true);
    }
}

module.exports = new Spinner();