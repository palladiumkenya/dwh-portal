export const HOME_TABS = {
    emr: 'EMR SITES',
    txCurr: 'CURRENT ON ART',
    hasCurrVl: 'VALID VIRAL LOAD',
    suppressed: 'VIRAL SUPPRESSION',
};

export const RR_TABS = {
    ct: 'CARE & TREATMENT',
    hts: 'HIV TESTING SERVICES',
};

export const HTS_TABS = {
    uptake: 'HIV TESTING SERVICES UPTAKE',
    linkage: 'HIV TESTING SERVICES LINKAGE',
    pns: 'PARTNER NOTIFICATION SERVICES',
    prep: 'PrEP',
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
    artVerification: 'ART VERIFICATION',
};

export const SD_TABS = {
    serviceDesk: 'SERVICE DESK',
    sdp: 'SERVICE DELIVERY PARTNER',
};

export const OPERATIONALHIS_TABS = {
    overview: 'OVERVIEW',
    completeness: 'COMPLETENESS',
    accuracy: 'ACCURACY',
    // consistency: 'CONSISTENCY',
    dataQualityAssessment: 'DATA QUALITY ASSESSMENT',
    comparison: 'COMPARISON DWH & KHIS',
}

export const PMTCT_RRI_TABS = {
    missedFirstANC: 'MISSED TESTING AT FIRST ANC',
    missedHAART: 'MISSED MATERNAL HAART',
    missedInfantProf: 'MISSED INFANT PROPHYLAXIS',
    missedEID: 'MISSED EID TESTING',
    missedVL: 'MISSED VIRAL LOAD',
    missedDTG: 'MISSED DTG OPTIMIZATION',
};

export const PAGES = {
    home: 'HOME',
    rr: 'REPORTING_RATES',
    hts: 'HIV_TESTING_SERVICES',
    ct: 'CARE_AND_TREATMENT',
    hrh: 'HRH',
    sd: 'SERVICE_DESK',
    operationalHIS: 'OPERATIONAL_AND_HIS',
    // pmtctRRI: 'PMTCT_RRI',
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


export const DWH_API_URL = process.env.REACT_APP_ENDPOINT;
export const HRH_API_URL = 'https://hrh.datacompanion.org';

export const ETL_DAY = 10;
