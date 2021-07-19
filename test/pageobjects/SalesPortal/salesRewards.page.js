import Page from './page'
import { pageIds, ratedRewards } from '../../resources/literals';
import { helper } from '../../utils/helper';
import { config } from '../../../wdio.conf';

const { SALES_PORTAL_REWARDS } = pageIds;

class SalesRewards extends Page {

    constructor() {
        super(SALES_PORTAL_REWARDS);
    }

    ///////////////////////////////////////////////////////////////////// SELECTORS //////////////////////////////////////////////////////////////

    /* Credit score section */
    get creditScoreSlider()      { return $('span[role="slider"]') }
    get creditScoreValue()       { return $('.MuiSlider-valueLabel span span')}

    /*Rated Rewards*/
    get burglarAlarmRwd()        { return $(`p=${ratedRewards.BURGLAR_ALARM}`)}
    get fireProtectionRwd()      { return $(`p=${ratedRewards.FIRE_PROTECTION}`)}
    get tanklessWaterHeaterRwd() { return $(`p=${ratedRewards.TANKLESS_WATER_HEATER}`)}
    get waterDetectionRwd()      { return $(`p=${ratedRewards.WATER_DETECTION_SHUTOFF}`)}
    get accreditedBuilderRwd()   { return $(`p=${ratedRewards.ACCREDITED_BUILDER}`)}
    get ageOverSixtyRwd()        { return $(`p=${ratedRewards.OVER_AGE_60}`)}
    get securedCommunityRwd()    { return $(`p=${ratedRewards.SECURED_COMMUNITY}`)}
    get surgeProtectionRwd()     { return $(`p=${ratedRewards.SURGE_PROTECTION}`)}
    get nonSmokerRwd()           { return $(`p=${ratedRewards.NON_SMOKER}`)}
    get hurricaneRwd()           { return $(`p=${ratedRewards.OPENING_PROTECTION}`)}

    /* Quote Container */
    get rewardsAmount()          { return $('#quote-container div:nth-of-type(2) div:nth-of-type(2) div:nth-of-type(3) p')} 
    get quoteValue()             { return $('h3 span:first-child') }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async selectCreditScore(creditScore) {
        await (await this.creditScoreSlider).waitForDisplayed({timeout:config.timeout.L});
        await (await this.creditScoreSlider).dragAndDrop({x:creditScore,y:0});
    }

    async getQuoteThousand() {
        let value = await helper.getItemText(await this.quoteValue,config.timeout.XL);
        value = helper.americanDollarToInt(value);
        return value;
    }

    async getCreditScore() {
        return parseInt(await helper.getItemText(await this.creditScoreValue,config.timeout.XL));
    }

    /**
     * @param {WebElement,WebElement[]} rewards: a single or an array of 
     * rewards to select during the sales journey 
     */
    async selectRewards(rewards) {
        if(Array.isArray(rewards)) {
            await Promise.all((rewards).map(async (reward) => {
                await helper.waitForDisplayedAndClick(reward,config.timeout.L);
            }))
        } else {
            await helper.waitForDisplayedAndClick(rewards);
        }
    }

    async getRewardsAmount() {
        return await helper.getItemText(await this.rewardsAmount);
    }
}



module.exports = new SalesRewards();