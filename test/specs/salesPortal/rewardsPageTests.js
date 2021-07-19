import SalesHome from '../../pageobjects/SalesPortal/salesHome.page';
import SalesRewards from '../../pageobjects/SalesPortal/salesRewards.page';
import { addresses, creditScore, creditScoreLimits } from '../../resources/literals';
import { expect as customExpect, expect } from '../../utils/assertions';
import { helper } from '../../utils/helper';


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

        it.only('should decrease quote when a higher credit score is selected', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);

            const firstQuote = await SalesRewards.getQuoteThousand();
            await SalesRewards.selectCreditScore(creditScore.EXCEPTIONAL);
            await helper.waitForValueToChange(await SalesRewards.quoteValue);
            const quoteAfterChange = await SalesRewards.getQuoteThousand();

            await customExpect.greaterThan(firstQuote,quoteAfterChange);
        })
    })

    describe('Rated Rewards Tests', () => {

        it('should select rewards and display the right amount', async () => {
            const rewards = await [SalesRewards.ageOverSixtyRwd, SalesRewards.burglarAlarmRwd, SalesRewards.nonSmokerRwd, SalesRewards.accreditedBuilderRwd],
            rewardsSize = rewards.length;

            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.selectRewards(rewards);
            const rewardsAmount = parseInt(await SalesRewards.getRewardsAmount());
            
            await customExpect.expectTextToEq(rewardsAmount,rewardsSize);
        })
    })
})