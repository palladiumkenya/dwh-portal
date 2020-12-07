import * as actions from "../actions/types";

const initialState = {
    currentPage: "",
    stickyFilter: false,
    homeTab: "txCurr",
    rrTab: "ct",
    htsTab: "uptake",
    ctTab: "txNew",
    countyFilterEnabled: true,
    subCountyFilterEnabled: true,
    facilityFilterEnabled: true,
    partnerFilterEnabled: true,
    agencyFilterEnabled: false,
    projectFilterEnabled: false,
    fromDateFilterEnabled: true,
    toDateFilterEnabled: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.page }
        case actions.ENABLE_STICKY_FILTER:
            return { ...state, stickyFilter: true }
        case actions.DISABLE_STICKY_FILTER:
            return { ...state, stickyFilter: false }
        case actions.CHANGE_HOME_TAB:
            return { ...state, homeTab: action.payload.tab }
        case actions.CHANGE_RR_TAB:
            return { ...state, rrTab: action.payload.tab }
        case actions.CHANGE_HTS_TAB:
            return { ...state, htsTab: action.payload.tab }
        case actions.CHANGE_CT_TAB:
            return { ...state, ctTab: action.payload.tab }
        case actions.ENABLE_COUNTY_FILTER:
            return { ...state, countyFilterEnabled: true }
        case actions.DISABLE_COUNTY_FILTER:
            return { ...state, countyFilterEnabled: false }
        case actions.ENABLE_SUB_COUNTY_FILTER:
            return { ...state, subCountyFilterEnabled: true }
        case actions.DISABLE_SUB_COUNTY_FILTER:
            return { ...state, subCountyFilterEnabled: false }
        case actions.ENABLE_FACILITY_FILTER:
            return { ...state, facilityFilterEnabled: true }
        case actions.DISABLE_FACILITY_FILTER:
            return { ...state, facilityFilterEnabled: false }
        case actions.ENABLE_PARTNER_FILTER:
            return { ...state, partnerFilterEnabled: true }
        case actions.DISABLE_PARTNER_FILTER:
            return { ...state, partnerFilterEnabled: false }
        case actions.ENABLE_AGENCY_FILTER:
            return { ...state, agencyFilterEnabled: true }
        case actions.DISABLE_AGENCY_FILTER:
            return { ...state, agencyFilterEnabled: false }
        case actions.ENABLE_PROJECT_FILTER:
            return { ...state, projectFilterEnabled: true }
        case actions.DISABLE_PROJECT_FILTER:
            return { ...state, projectFilterEnabled: false }
        case actions.ENABLE_FROM_DATE_FILTER:
            return { ...state, fromDateFilterEnabled: true }
        case actions.DISABLE_FROM_DATE_FILTER:
            return { ...state, fromDateFilterEnabled: false }
        case actions.ENABLE_TO_DATE_FILTER:
            return { ...state, toDateFilterEnabled: true }
        case actions.DISABLE_TO_DATE_FILTER:
            return { ...state, toDateFilterEnabled: false }
        default:
            return state
    }
}
