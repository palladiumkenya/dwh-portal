import * as actionTypes from "../../actions/types";

const initialState = {
    lastFetch: {
        'ct': null,
        'hts': null,
        'pkv': null,
    },
    loading: {
        'ct': false,
        'hts': false,
        'pkv': false,
    },
    listUnfiltered: {
        'ct': [],
        'hts': [],
        'pkv': [],
    },
    listFiltered: {
        'ct': [],
        'hts': [],
        'pkv': [],
    },
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_REQUEST:
            newState.loading[action.payload.docket] = true;
            newState.lastFetch[action.payload.docket] = Date.now();
            return newState;
        case actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_FETCH:
            if (action.payload.filtered === true) {
                newState.listFiltered[action.payload.docket] = action.payload.list;
            } else {
                newState.listUnfiltered[action.payload.docket] = action.payload.list;
            }
            newState.loading[action.payload.docket] = false;
            newState.lastFetch[action.payload.docket] = Date.now();
            console.log('RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_FETCH');
            return newState;
        case actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_REQUEST_FAILED:
            newState.loading[action.payload.docket] = false;
            newState.lastFetch[action.payload.docket] = null;
            return newState;
        default:
            return state
    }
}
