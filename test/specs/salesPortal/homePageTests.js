import { addresses, urls } from '../../resources/literals';
import { expect as customExpect } from '../../utils/assertions';

// PAGE OBJECTS
import SalesHome from '../../pageobjects/SalesPortal/salesHome.page';


describe('Sales Home Page tests', () => {

     beforeEach(async () => {
        await SalesHome.open();
    })

    describe('Green, Yellow and Red path properties navigation', () => {

        it('should send user to reward screen for green path addresses', async () => {
            await SalesHome.completeAddressAndContinue(addresses.GREEN_PATH_ADDRESS);
            customExpect.expectUrlToEqual(urls.REWARDS);
        })

        it('should send user to reward screen for yellow path addresses', async () => {
            await SalesHome.completeAddressAndContinue(addresses.YELLOW_PATH_ADDRESS);
            customExpect.expectUrlToEqual(urls.long.REWARDS);
        })

        it('should send user to kickout screen for red path addresses', async () => {
            await SalesHome.completeAddressAndContinue(addresses.RED_PATH_ADDRESS);
            customExpect.expectUrlToEqual(urls.long.KICKOUT);
        })
    })

    describe('Navbar screen navigation', () => {

        it('should navigate to get started', async () => {
            await SalesHome.goToSection(urls.short.GET_STARTED);
            customExpect.expectUrlToEqual(urls.long.GET_STARTED);
        })

        it('should navigate to our insurance', async () => {
            await SalesHome.goToSection(urls.short.OUR_INSURANCE);
            customExpect.expectUrlToEqual(urls.long.OUR_INSURANCE);
        })

        it('should navigate to about us', async () => {
            await SalesHome.goToSection(urls.short.ABOUT_US);
            customExpect.expectUrlToEqual(urls.long.ABOUT_US);
        })

        it('should navigate to contact us', async () => {
            await SalesHome.goToSection(urls.short.CONTACT_US);
            customExpect.expectUrlToEqual(urls.long.CONTACT_US);
        })

    })
})