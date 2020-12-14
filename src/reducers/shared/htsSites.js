import _ from 'lodash';
import * as actionTypes from "../../actions/types";

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
        case actionTypes.HTS_SITES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.HTS_SITES_FETCH:
            return {
                ...state,
                loading: false,
                lastFetch: Date.now(),
                list: action.payload,
                counties: _.chain(action.payload).map(l => l.county ? l.county.toUpperCase() : 'No County').uniq().sort().value(),
                subCounties: _.chain(action.payload).map(l => l.subCounty ? l.subCounty.toUpperCase() : 'No Sub County').uniq().sort().value(),
                facilities: _.chain(action.payload).map(l => l.facility ? l.facility : 'No Facility').uniq().sort().value(),
                partners: _.chain(action.payload).map(l => l.partner ? l.partner : 'No Partner').uniq().sort().value(),
                agencies: _.chain(action.payload).map(l => l.agency ? l.agency : 'No Agency').uniq().sort().value(),
                projects: _.chain(action.payload).map(l => l.project ? l.project : 'No Project').uniq().sort().value(),
            }
        case actionTypes.HTS_SITES_REQUEST_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
