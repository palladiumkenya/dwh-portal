import * as actionTypes from "../../../actions/types";

const initialState = {
    lastFetchUnfiltered: null,
    lastFetchFiltered: null,
    loadingUnfiltered: false,
    loadingFiltered: false,
    listUnfiltered: [],
    listFiltered: [],
    counties: [],
    subCounties: [],
    facilities: [],
    partners: [],
    agencies: [],
    projects: [],
    years: [],
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_REQUEST:
            newState.counties = action.payload.counties;
            newState.subCounties = action.payload.subCounties;
            newState.facilities = action.payload.facilities;
            newState.partners = action.payload.partners;
            newState.agencies = action.payload.agencies;
            newState.projects = action.payload.projects;
            if (action.payload.filtered === true) {
                newState.loadingFiltered = true;
            } else {
                newState.loadingUnfiltered = true;
            }
            return newState;
        case actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_FETCH:
            if (action.payload.filtered === true) {
                newState.loadingFiltered = false;
                newState.lastFetchFiltered = Date.now();
                newState.listFiltered = action.payload.list;
            } else {
                newState.loadingUnfiltered = false;
                newState.lastFetchUnfiltered = Date.now();
                newState.listUnfiltered = action.payload.list;
            }
            return newState;
        case actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_REQUEST_FAILED:
            if (action.payload.filtered === true) {
                newState.loadingFiltered = false;
            } else {
                newState.loadingUnfiltered = false;
            }
            return newState;
        default:
            return state
    }
}
