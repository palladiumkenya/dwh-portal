import { combineReducers } from 'redux';
import authReducer from './Shared/authReducer';
import ui from "./Shared/ui";
import filters from "./Shared/filters";
import rrSites from "./Shared/rrSites";
import htsSites from "./Shared/htsSites";
import ctSites from "./Shared/ctSites";
import gpsSites from "./Home/gpsSites";
import artOptimizationOverview from "./CT/ArtOptimization/artOptimizationOverview";

export default combineReducers({
    auth: authReducer,
    ui,
    filters,
    rrSites,
    htsSites,
    ctSites,
    gpsSites,
    artOptimizationOverview,
});
