import SalesHome from '../../pageobjects/SalesPortal/salesHome.page';
import SalesRewards from '../../pageobjects/SalesPortal/salesRewards.page';
import { addresses, creditScore, creditScoreArr  } from '../../resources/literals';
import { expect as chaiExpect } from 'chai';

describe('Rewards Page Tests', () => {
    
    beforeEach(async () => {
        await SalesHome.open();
    })
    
    describe('Credit Score Tests', () => {

        it('should display all options for credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.openCreditScoreDropdown();
            
            const creditScore = await SalesRewards.mapCreditScore();
            chaiExpect(creditScore).to.have.members(creditScoreArr);
        })

        it('should select desired credit score', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            await SalesRewards.openCreditScoreDropdown();
            await SalesRewards.selectCreditScore(creditScore.VERY_GOOD);
        })
    })
})