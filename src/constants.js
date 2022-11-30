export const HOME_TABS = {
    emr: 'EMR SITES',
    txCurr: 'CURRENT ON ART',
    hasCurrVl: 'VALID VIRAL LOAD',
    suppressed: 'VIRAL SUPPRESSION',
};

export const RR_TABS = {
    ct: 'CARE & TREATMENT',
    hts: 'HIV TESTING SERVICES',
    pkv: 'PATIENT KEY VALUES',
};

export const HTS_TABS = {
    uptake: 'HIV TESTING SERVICES UPTAKE',
    linkage: 'HIV TESTING SERVICES LINKAGE',
    pns: 'PARTNER NOTIFICATION SERVICES',
    // prep: 'PrEP',
};

export const CT_TABS = {
    newlyOnArt: 'NEWLY STARTED ON ART',
    currentOnArt: 'CURRENT ON ART',
    artOptimization: 'ART OPTIMIZATION',
    // tbHiv: "TB/HIV",
    adverseEvent: 'ADVERSE EVENTS - AE',
    dsd: 'DSD',
    vl: 'VL MONITORING',
    treatmentOutcomes: 'TREATMENT OUTCOMES',
    otz: 'OTZ',
    ovc: 'OVC',
    covid: 'COVID-19',
};

export const OPERATIONALHIS_TABS = {
    overview: 'OVERVIEW',
    completeness: 'COMPLETENESS',
    accuracy: 'ACCURACY',
    // consistency: 'CONSISTENCY',
    dataQualityAssessment: 'DATA QUALITY ASSESSMENT',
    comparison: 'COMPARISON DWH & KHIS',
}

export const PAGES = {
    home: 'HOME',
    rr: 'REPORTING_RATES',
    hts: 'HIV_TESTING_SERVICES',
    ct: 'CARE_AND_TREATMENT',
    hrh: 'HRH',
    operationalHIS: 'OPERATIONAL_AND_HIS',
};

export const CACHING = {
    // in minutes
    SHORT: 10,
    MID: 60,
    LONG: 1440, // 1 day
    EXTRA_LONG: 4320, // 3 days
};

export const LOADING_DELAY = 400;

export const GA_TRACKING_ID = 'UA-137589703-2';


export const DWH_API_URL = process.env.REACT_APP_DWH_API_URL;
export const HRH_API_URL = 'https://hrh.datacompanion.org';
