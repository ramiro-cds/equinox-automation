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

const waitForValueToChange = async (element,timeout = config.timeout.L) => {
    let current = await (await element).getText();
    await (await element).waitUntil(async() => {
        const initial = current;
        current = await (await element).getText();
        return (current != initial)
    },{timeout,interval:500});
}

const getItemText = async (element,timeout = config.timeout.L) => {
    await (await element).waitForDisplayed({timeout});
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

const americanDollarToInt = async (value) => {
    [value] = value.split('.');
    value = (value.split('$'))[1];
    const [thousands,hundreds] = value.split(',');
    return (thousands + hundreds);
}

export const helper = {
    waitForDisplayedAndClick,
    waitForDisplayedAndSetValue,
    waitForEnabledAndClick,
    getItemText,
    getElementsText,
    americanDollarToInt,
    waitForValueToChange
}