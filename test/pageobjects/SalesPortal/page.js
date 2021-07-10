/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

import { config } from '../../../wdio.conf';
import Spinner from './salesSpinner';

export default class Page {

    constructor(pageId) {
        this.pageId = pageId;
    }
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(path)
    }

    async waitForSpinner(timeout = config.timeout.XL) {
        await Spinner.waitForSpinner({timeout});
    }
}
