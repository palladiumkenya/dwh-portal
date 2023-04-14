import * as actions from "../../actions/types";

const initialState = {
    currentPage: '',
    stickyFilter: false,
    homeTab: 'emr',
    rrTab: 'ct',
    htsTab: 'uptake',
    ctTab: 'newlyOnArt',
    operationalHISTab: 'overview',
    sdTab: 'serviceDesk',
    pmtctRRITab: 'missedFirstANC',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.page };
        case actions.ENABLE_STICKY_FILTER:
            return { ...state, stickyFilter: true };
        case actions.DISABLE_STICKY_FILTER:
            return { ...state, stickyFilter: false };
        case actions.CHANGE_HOME_TAB:
            return { ...state, homeTab: action.payload.tab };
        case actions.CHANGE_RR_TAB:
            return { ...state, rrTab: action.payload.tab };
        case actions.CHANGE_HTS_TAB:
            return { ...state, htsTab: action.payload.tab };
        case actions.CHANGE_CT_TAB:
            return { ...state, ctTab: action.payload.tab };
        case actions.CHANGE_SD_TAB:
            return { ...state, sdTab: action.payload.tab };
        case actions.CHANGE_OPERATIONAL_AND_HIS_TAB:
            return { ...state, operationalHISTab: action.payload.tab };
        case actions.CHANGE_PMTCT_RRI_TAB:
            return { ...state, pmtctRRITab: action.payload.tab };
        default:
            return state;
    }
}
