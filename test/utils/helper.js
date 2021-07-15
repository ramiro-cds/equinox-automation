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

const waitForEnabledAndClick = async (element,timeout = config.timeout.L, reverse = false) => {
    await (await element).waitForEnabled({timeout,reverse});
    await (await element).click();
}

const getItemText = async (element) => {
    await (await element).waitForDisplayed({timeout: config.timeout.L});
    const text = await (await element).getText();
    return text;
}

const getElementsText = async (elements) => {
    let arr = [];
    await Promise.all((await elements).map(async (element) => {
        arr.push(await element.getText());
    }))
    return arr;
}

export const helper = {
    waitForDisplayedAndClick,
    waitForDisplayedAndSetValue,
    waitForEnabledAndClick,
    getItemText,
    getElementsText
}