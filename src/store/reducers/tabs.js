import * as actionTypes from "../actions/types";
import * as appConstants from "../../constants";

const initialState = {
    homeTab: appConstants.HOME_TABS.emr,
    rrTab: appConstants.RR_TABS.ct,
    htsTab: appConstants.HTS_TABS.uptake,
    ctTab: appConstants.CT_TABS.txNew
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_HOME_TAB:
            return {
                ...state,
                homeTab: action.payload.tab
            }
        case actionTypes.CHANGE_RR_TAB:
            return {
                ...state,
                rrTab: action.payload.tab
            }
        case actionTypes.CHANGE_HTS_TAB:
            return {
                ...state,
                htsTab: action.payload.tab
            }
        case actionTypes.CHANGE_CT_TAB:
            return {
                ...state,
                ctTab: action.payload.tab
            }
        default:
            return state
    }
}
