import SalesHome from '../../pageobjects/SalesPortal/salesHome.page';
import SalesRewards from '../../pageobjects/SalesPortal/salesRewards.page';
import { addresses, creditScore, creditScoreLimits, ratedRewards } from '../../resources/literals';
import { expect as customExpect, expect } from '../../utils/assertions';
import { helper } from '../../utils/helper';

const {
    BURGLAR_ALARM,
    FIRE_PROTECTION,
    TANKLESS_WATER_HEATER,
    WATER_DETECTION_SHUTOFF
} = ratedRewards;

describe('Rewards Page Tests', () => {
    
    beforeEach(async () => {
        await SalesHome.open();
    })
    
    describe('Credit Score Tests', () => {

        it('should select the highest credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.selectCreditScore(creditScore.EXCEPTIONAL);

            const selectedCreditScore = await SalesRewards.getCreditScore();

            await customExpect.expectTextToEq(selectedCreditScore,creditScoreLimits.HIGHEST)
        })

        it('should select the lowest credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.selectCreditScore(creditScore.WORST);

            const selectedCreditScore = await SalesRewards.getCreditScore();

            await customExpect.expectTextToEq(selectedCreditScore,creditScoreLimits.LOWEST)
        })

        it('should decrease quote when a higher credit score is selected', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);

            const firstQuote = await SalesRewards.getQuoteThousand();
            await SalesRewards.selectCreditScore(creditScore.EXCEPTIONAL);
            await helper.waitForValueToChange(SalesRewards.quoteValue);
            const quoteAfterChange = await SalesRewards.getQuoteThousand();

            await customExpect.greaterThan(firstQuote,quoteAfterChange);
        })

        it('should increase quote when a lower credit score is selected', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);

            const firstQuote = await SalesRewards.getQuoteThousand();
            await SalesRewards.selectCreditScore(creditScore.WORST);
            await helper.waitForValueToChange(SalesRewards.quoteValue);
            const quoteAfterChange = await SalesRewards.getQuoteThousand();

            await customExpect.greaterThan(quoteAfterChange,firstQuote);
        })
    })

    describe('Rated Rewards Tests', () => {

        it.only('should select rewards and display the right amount', async () => {
            const rewards = await [BURGLAR_ALARM,TANKLESS_WATER_HEATER],
            rewardsSize = rewards.length;

            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.selectRewards(rewards);
            const rewardsAmount = parseInt(await SalesRewards.getRewardsAmount());
            
            await customExpect.expectTextToEq(rewardsAmount,rewardsSize);
        })
    })
})