import { combineReducers } from 'redux';
import authReducer from './shared/authReducer';
import ui from "./shared/ui";
import filters from "./shared/filters";
import rrSites from "./shared/rrSites";
import htsSites from "./shared/htsSites";
import ctSites from "./shared/ctSites";
import gpsSites from "./home/gpsSites";

export default combineReducers({
    auth: authReducer,
    ui,
    filters,
    rrSites,
    htsSites,
    ctSites,
    gpsSites,
});
