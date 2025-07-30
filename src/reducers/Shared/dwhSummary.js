import * as actionTypes from "../../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    docket: null,
    totalFacilities: 0,
    totalPartners: 0,
    totalCounties: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CT_DWH_SUMMARY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CT_DWH_SUMMARY_FETCH:
            return {
                ...state,
                loading: false,
                lastFetch: Date.now(),
                docket: action.payload.docket,
                totalFacilities: action.payload.totalFacilities,
                totalPartners: action.payload.totalPartners,
                totalCounties: action.payload.totalCounties
            }
        case actionTypes.CT_DWH_SUMMARY_REQUEST_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
