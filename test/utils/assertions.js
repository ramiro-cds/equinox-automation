import config from '../../wdio.conf';
import { expect as chaiExpect } from 'chai';

const expectUrlToEqual = async (actualUrl = config.baseUrl) => {
    const url = await browser.getUrl();
    chaiExpect(url).to.equal(actualUrl);
}
/**
 * 
 * @param {sting} actual: value gotten from the element   
 * @param {string} expected: expected value for the element to have 
 */
const expectTextToEq = async (actual,expected) => {
    chaiExpect(await actual).to.equal(expected);
}

const expectTextToEqCaseIgnore = async (actual,expected) => {
    chaiExpect(await actual.toLowerCase()).to.equal(expected.toLowerCase());
}

const greaterThan = async (bigger,smaller) => {
    chaiExpect(parseInt(bigger)).to.be.greaterThan(parseInt(smaller));
}

export const expect = {
    expectUrlToEqual,
    expectTextToEq,
    expectTextToEqCaseIgnore,
    greaterThan
}