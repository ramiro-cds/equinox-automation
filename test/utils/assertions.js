import config from '../../wdio.conf';
import { expect as chaiExpect } from 'chai';

const expectUrlToEqual = async (actualUrl = config.baseUrl) => {
    const url = await browser.getUrl();
    chaiExpect(url).to.equal(actualUrl);
}

export const expect = {
    expectUrlToEqual
}