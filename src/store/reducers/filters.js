import * as actionTypes from "../actions/types";
import moment from "moment";

const initialState = {
    counties: [],
    subCounties: [],
    facilities: [],
    partners: [],
    agencies: [],
    projects: [],
    fromDate: moment().subtract(12, "month").format("MMM YYYY"),
    toDate: moment().format("MMM YYYY"),
};

export default function(state = initialState, action) {
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
        default:
            return state
    }
}
