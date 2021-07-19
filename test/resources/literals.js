import { config } from "../../wdio.conf"

export const addresses = {
    GREEN_PATH_ADDRESS: '13024 Pechora Ct, Jacksonville, FL 32246-5501',
    YELLOW_PATH_ADDRESS: '1223 Tadsworth Ter, Lake Mary, FL 32746-5330',
    RED_PATH_ADDRESS: '6615 Falling Leaves Ct, Mason, OH 45040'
}

export const ratedRewards = {
    BURGLAR_ALARM: 'Burglar Alarm',
    FIRE_PROTECTION: 'Fire Protection',
    TANKLESS_WATER_HEATER: 'Tankless Water Heater',
    WATER_DETECTION_SHUTOFF: 'Water Detection & Shutoff',
    ACCREDITED_BUILDER: 'Accredited Builder',
    OVER_AGE_60: 'Age 60 and Over',
    SECURED_COMMUNITY: 'Secured Community',
    SURGE_PROTECTION: 'Surge Protection',
    NON_SMOKER: 'Non-Smoker',
    OPENING_PROTECTION: 'Hurricane Windows/Shutters',
    MILITARY: 'Military (First Responder)'
}

export const creditScore = {
    WORST: -500,
    POOR: -455,
    FAIR: -230,
    GOOD: -100,
    VERY_GOOD: -70,
    EXCELLENT: 70,
    EXCEPTIONAL: 230
}
 export const creditScoreLimits = {
    LOWEST: 580, 
    HIGHEST: 800
 }

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