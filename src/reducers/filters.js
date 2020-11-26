import * as actionTypes from "../actions/types";

const initialState = {
    counties: [],
    subCounties: [],
    facilities: [],
    partners: [],
    agencies: [],
    projects: [],
    fromDate: '',
    toDate: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTER_BY_COUNTY:
            return {
                ...state,
                counties: action.payload.counties
            }
        case actionTypes.FILTER_BY_SUB_COUNTY:
            return {
                ...state,
                subCounties: action.payload.subCounties
            }
        case actionTypes.FILTER_BY_FACILITY:
            return {
                ...state,
                facilities: action.payload.facilities
            }
        case actionTypes.FILTER_BY_PARTNER:
            return {
                ...state,
                partners: action.payload.partners
            }
        case actionTypes.FILTER_BY_AGENCY:
            return {
                ...state,
                agencies: action.payload.agencies
            }
        case actionTypes.FILTER_BY_PROJECT:
            return {
                ...state,
                projects: action.payload.projects
            }
        case actionTypes.FILTER_BY_FROM_DATE:
            return {
                ...state,
                fromDate: action.payload.fromDate
            }
        case actionTypes.FILTER_BY_TO_DATE:
            return {
                ...state,
                toDate: action.payload.toDate
            }
        default:
            return state
    }
}
