import * as actionTypes from "../../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    listUnfiltered: [],
    listFiltered: [],
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.HIS_FACILITY_ART_HTS_MNCH_REQUEST:
            newState.loading = true;
            return newState;
        case actionTypes.HIS_FACILITY_ART_HTS_MNCH_FETCH:
            if (action.payload.filtered === true) {
                newState.listFiltered = action.payload.list;
            } else {
                newState.listUnfiltered = action.payload.list;
                newState.lastFetch = Date.now();
            }
            newState.loading = false;
            return newState;
        case actionTypes.HIS_FACILITY_ART_HTS_MNCH_FAILED:
            newState.loading = false;
            return newState;
        default:
            return state;
    }
}
