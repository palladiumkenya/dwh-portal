import * as actionTypes from "../../../actions/types";
import { CT_QUATERLY_IIT_FAILED } from './../../../actions/types';

const initialState = {
    lastFetch: null,
    loading: false,
    listUnfiltered: [],
    listFiltered: [],
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.CT_QUATERLY_IIT_REQUEST:
            newState.loading = true;
            return newState;
        case actionTypes.CT_QUATERLY_IIT_FETCH:
            if (action.payload.filtered === true) {
                newState.listFiltered = action.payload.list;
            } else {
                newState.listUnfiltered = action.payload.list;
                newState.lastFetch = Date.now();
            }
            newState.loading = false;
            return newState;
        case actionTypes.CT_QUATERLY_IIT_FAILED:
            newState.loading = false;
            newState.lastFetch = null;
            return newState;
        default:
            return state
    }
}
