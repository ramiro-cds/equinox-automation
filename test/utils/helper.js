import { config } from "../../wdio.conf";

/**
 * WaitFor Functions: to be used instead of clicking directly, as to avoid non-existing/non-enabled elements
 *  
 * @param {WebElement} element: a valid element to wait for
 * @param {int} timeout: max time to wait for expressed in ms  
 */
const waitForDisplayedAndClick = async (element,timeout = config.timeout.M, reverse = false) => {
    await (await element).waitForDisplayed({timeout,reverse});
    await (await element).click(); 
};

const waitForDisplayedAndSetValue = async (element,value,timeout = config.timeout.M, reverse = false) => {
    await (await element).waitForDisplayed({timeout,reverse});
    await (await element).setValue(value);
};

const waitForEnabledAndClick = async (element,timeout = config.timeout.M, reverse = false) => {
    await (await element).waitForEnabled({timeout,reverse});
    await (await element).click();
}

export const helper = {
    waitForDisplayedAndClick,
    waitForDisplayedAndSetValue,
    waitForEnabledAndClick,
}