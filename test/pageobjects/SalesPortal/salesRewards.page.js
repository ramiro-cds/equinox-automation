import Page from './page'
import { pageIds, ratedRewards } from '../../resources/literals';
import { helper } from '../../utils/helper';
import { config } from '../../../wdio.conf';

const { SALES_PORTAL_REWARDS } = pageIds;

const {
    BURGLAR_ALARM,
    FIRE_PROTECTION,
    MILITARY,
    WATER_DETECTION_SHUTOFF,
    TANKLESS_WATER_HEATER
} = ratedRewards;

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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    async mapper(elements) {
        let mappedElements;
        if(Array.isArray(elements)){
            mappedElements = [];
            await Promise.all((elements).map(async (element) => {
                mappedElements.push(await this.elementSwitcher(element));
                })
            )
        } else {
            mappedElements = await this.elementSwitcher(elements);
        }
        return mappedElements;
    }

    /**
     * @param {WebElement,WebElement[]} rewards: a single or an array of 
     * rewards to select during the sales journey 
     */
    async selectRewards(rewards) {

        const mappedRewards = await this.mapper(rewards);

        if(Array.isArray(mappedRewards)) {
            await Promise.all((mappedRewards).map(async (reward) => {
                await helper.waitForDisplayedAndClick(await reward,config.timeout.L);
            }))
        } else {
            await helper.waitForDisplayedAndClick(await  mappedRewards);
        }
    }

    async elementSwitcher (elementName) {
        let element;
        switch(elementName) {
            case BURGLAR_ALARM:
                element = await this.burglarAlarmRwd;
                break;
            case FIRE_PROTECTION:
                element = await this.fireProtectionRwd;
                break;
            case WATER_DETECTION_SHUTOFF:
                element = await this.waterDetectionRwd;
                break;
            case TANKLESS_WATER_HEATER:
                element = await this.tanklessWaterHeaterRwd;
                break;
            default:
                throw new Error(`${elementName} is not a valid element to look for`);
        }
        return element;
    }

    async getRewardsAmount() {
        return await helper.getItemText(await this.rewardsAmount);
    }
}



module.exports = new SalesRewards();