import Page from './page'
import { urls, pageIds, creditScore } from '../../resources/literals';
import { helper } from '../../utils/helper';
import { config } from '../../../wdio.conf';

const { REWARDS } = urls.short
const { SALES_PORTAL_REWARDS } = pageIds;

class SalesRewards extends Page {

    constructor() {
        super(SALES_PORTAL_REWARDS);
    }

    open() {
        super.open(REWARDS);
    }

    /* Credit score section */
    get creditScoreInput()   { return $('div[aria-label*="button"] button') }
    get creditScoreOptions() { return $$('li[role="menuitem"] div div:nth-child(1) p') }
    get exceptionalOption()  { return $$('li[role="menuitem"]')[0] }
    get veryGoodOption()     { return $$('li[role="menuitem"]')[1] }
    get goodOption()         { return $$('li[role="menuitem"]')[2] }
    get fairOption()         { return $$('li[role="menuitem"]')[3] }
    get poorOption()         { return $$('li[role="menuitem"]')[4] }


    async openCreditScoreDropdown() {
        await helper.waitForDisplayedAndClick(await this.creditScoreInput,config.timeout.L);
    }

    async mapCreditScore(){
        let arr = [];
        await Promise.all((await this.creditScoreOptions).map(async (credit) => {
            arr.push(await credit.getText());
        }))
        return arr;
    }

    async selectCreditScore(credit) {
        let selectedCreditScore;
        switch(credit) {
            case creditScore.EXCEPTIONAL: 
                selectedCreditScore = await this.exceptionalOption;
                break;
            case creditScore.VERY_GOOD: 
                selectedCreditScore = await this.veryGoodOption;
                break;
            case creditScore.GOOD:
                selectedCreditScore = await this.goodOption;
                break;
            case creditScore.FAIR:
                selectedCreditScore = await this.fairOption;
                break;
            case creditScore.POOR:
                selectedCreditScore = await this.poorOption;
                break;
            default:
                throw new Error(`${credit} is not a valid Credit Score value`);
        }
        await helper.waitForEnabledAndClick(await selectedCreditScore);
    }
}

module.exports = new SalesRewards();