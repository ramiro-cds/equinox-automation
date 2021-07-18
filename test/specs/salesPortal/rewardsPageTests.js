import SalesHome from '../../pageobjects/SalesPortal/salesHome.page';
import SalesRewards from '../../pageobjects/SalesPortal/salesRewards.page';
import { addresses, creditScore, creditScoreArr } from '../../resources/literals';
import { expect as chaiExpect } from 'chai';
import { expect as customExpect } from '../../utils/assertions';


describe('Rewards Page Tests', () => {
    
    beforeEach(async () => {
        await SalesHome.open();
    })
    
    describe('Credit Score Tests', () => {

        it('should display all options for credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
        })

        it('should select desired credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.openCreditScoreDropdown();
            await SalesRewards.selectCreditScore(creditScore.VERY_GOOD);
            
            const selectedCreditScore = await SalesRewards.getSelectedCreditText();
            await customExpect.expectTextToEqCaseIgnore(selectedCreditScore,creditScore.VERY_GOOD);
        })
    })

    describe('Rated Rewards Tests', () => {

        it.only('should select rewards and display the right amount', async () => {
            const rewards = await [SalesRewards.ageOverSixtyRwd, SalesRewards.burglarAlarmRwd, SalesRewards.nonSmokerRwd, SalesRewards.accreditedBuilderRwd],
            rewardsSize = rewards.length;

            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.selectRewards(rewards);
            const rewardsAmount = parseInt(await SalesRewards.getRewardsAmount());
            
            await customExpect.expectTextToEq(rewardsAmount,rewardsSize);
        })
    })
})