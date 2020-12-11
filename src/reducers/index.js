import authReducer from './authReducer';
import { combineReducers } from 'redux';
import ui from "./ui";
import filters from "./filters";
import sites from "./sites";

export default combineReducers({
    auth: authReducer,
    ui,
    filters,
    sites,
});
