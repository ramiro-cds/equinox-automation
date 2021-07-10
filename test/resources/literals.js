import { config } from "../../wdio.conf"

export const addresses = {
    GREEN_PATH_ADDRESS: '13024 Pechora Ct, Jacksonville, FL 32246-5501',
    YELLOW_PATH_ADDRESS: '1223 Tadsworth Ter, Lake Mary, FL 32746-5330',
    RED_PATH_ADDRESS: '6615 Falling Leaves Ct, Mason, OH 45040'
}

export const creditScore = {
    EXCEPTIONAL: 'Exceptional',
    VERY_GOOD: 'Very good',
    GOOD: 'Good',
    FAIR: 'Fair',
    POOR: 'Poor'
}

export const creditScoreArr = [ 'Exceptional', 'Very Good', 'Fair', 'Poor', 'Good' ]

export const urls = {
    short: {
        REWARDS: '/quote/rewards',
        KICKOUT: '/knockout',
        GET_STARTED: '/get-started',
        OUR_INSURANCE: '/our-insurance',
        ABOUT_US: '/about-us',
        CONTACT_US: '/contact-us'
    },
    long: {
        REWARDS: config.baseUrl + '/quote/rewards',
        KICKOUT: config.baseUrl + '/knockout',
        GET_STARTED: config.baseUrl + '/get-started',
        OUR_INSURANCE: config.baseUrl + '/our-insurance',
        ABOUT_US: config.baseUrl + '/about-us',
        CONTACT_US: config.baseUrl + '/contact-us'
    }
}

export const pageIds = {
    SALES_PORTAL_HOME : 'Sales portal home',
    SALES_PORTAL_REWARDS : 'Sales portal rewards',
    SALES_PORTAL_KICKOUT : 'Sales portal kickout',
}