import * as actionTypes from "../../actions/types";

const initialState = {
    filtered: false,
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
    let filtered = false;
    switch (action.type) {
        case actionTypes.FILTER_BY_COUNTY:
            filtered = action.payload.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' ||  state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                counties: action.payload.counties
            }
        case actionTypes.FILTER_BY_SUB_COUNTY:
            filtered = state.counties.length > 0 || action.payload.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                subCounties: action.payload.subCounties
            }
        case actionTypes.FILTER_BY_FACILITY:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || action.payload.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                facilities: action.payload.facilities
            }
        case actionTypes.FILTER_BY_PARTNER:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                action.payload.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                partners: action.payload.partners
            }
        case actionTypes.FILTER_BY_AGENCY:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || action.payload.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                agencies: action.payload.agencies
            }
        case actionTypes.FILTER_BY_PROJECT:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || action.payload.projects.length > 0 ||
                state.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                projects: action.payload.projects
            }
        case actionTypes.FILTER_BY_FROM_DATE:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                action.payload.fromDate !== '' || state.toDate !== '' || false;
            return {
                ...state,
                filtered,
                fromDate: action.payload.fromDate
            }
        case actionTypes.FILTER_BY_TO_DATE:
            filtered = state.counties.length > 0 || state.subCounties.length > 0 || state.facilities.length > 0 ||
                state.partners.length > 0 || state.agencies.length > 0 || state.projects.length > 0 ||
                state.fromDate !== '' || action.payload.toDate !== '' || false;
            return {
                ...state,
                filtered,
                toDate: action.payload.toDate
            }
        default:
            return state
    }
}
