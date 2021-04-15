import * as actionTypes from "../../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    list: [],
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_REQUEST:
            newState.loading = true;
            return newState;
        case actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_FETCH:
            newState.list = action.payload;
            newState.lastFetch = Date.now();
            newState.loading = false;
            return newState;
        case actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_REQUEST_FAILED:
            newState.loading = false;
            return newState;
        default:
            return state
    }
}
