import * as actionTypes from "../actions/types";

const initialState = {
    stickyFilter: false,
    countyFilterEnabled: true,
    subCountyFilterEnabled: true,
    facilityFilterEnabled: true,
    partnerFilterEnabled: true,
    agencyFilterEnabled: false,
    projectFilterEnabled: false,
    fromDateFilterEnabled: false,
    toDateFilterEnabled: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ENABLE_STICKY_FILTER:
            return { ...state, stickyFilter: true }
        case actionTypes.DISABLE_STICKY_FILTER:
            return { ...state, stickyFilter: false }
        case actionTypes.ENABLE_COUNTY_FILTER:
            return { ...state, countyFilterEnabled: true }
        case actionTypes.DISABLE_COUNTY_FILTER:
            return { ...state, countyFilterEnabled: false }
        case actionTypes.ENABLE_SUB_COUNTY_FILTER:
            return { ...state, subCountyFilterEnabled: true }
        case actionTypes.DISABLE_SUB_COUNTY_FILTER:
            return { ...state, subCountyFilterEnabled: false }
        case actionTypes.ENABLE_FACILITY_FILTER:
            return { ...state, facilityFilterEnabled: true }
        case actionTypes.DISABLE_FACILITY_FILTER:
            return { ...state, facilityFilterEnabled: false }
        case actionTypes.ENABLE_PARTNER_FILTER:
            return { ...state, partnerFilterEnabled: true }
        case actionTypes.DISABLE_PARTNER_FILTER:
            return { ...state, partnerFilterEnabled: false }
        case actionTypes.ENABLE_AGENCY_FILTER:
            return { ...state, agencyFilterEnabled: true }
        case actionTypes.DISABLE_AGENCY_FILTER:
            return { ...state, agencyFilterEnabled: false }
        case actionTypes.ENABLE_PROJECT_FILTER:
            return { ...state, projectFilterEnabled: true }
        case actionTypes.DISABLE_PROJECT_FILTER:
            return { ...state, projectFilterEnabled: false }
        case actionTypes.ENABLE_FROM_DATE_FILTER:
            return { ...state, fromDateFilterEnabled: true }
        case actionTypes.DISABLE_FROM_DATE_FILTER:
            return { ...state, fromDateFilterEnabled: false }
        case actionTypes.ENABLE_TO_DATE_FILTER:
            return { ...state, toDateFilterEnabled: true }
        case actionTypes.DISABLE_TO_DATE_FILTER:
            return { ...state, toDateFilterEnabled: false }
        default:
            return state
    }
}
