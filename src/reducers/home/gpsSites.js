import * as actionTypes from "../../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GPS_SITES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GPS_SITES_FETCH:
            return {
                ...state,
                loading: false,
                lastFetch: Date.now(),
                list: action.payload
            }
        case actionTypes.GPS_SITES_REQUEST_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
