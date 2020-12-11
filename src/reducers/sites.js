import * as actionTypes from "../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    list: [],
    counties: [],
    subCounties: [],
    facilities: [],
    partners: [],
    agencies: [],
    projects: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SITES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SITES_FETCH:
            return {
                ...state,
                loading: false,
                lastFetch: Date.now(),
                list: action.payload
            }
        default:
            return state
    }
}
