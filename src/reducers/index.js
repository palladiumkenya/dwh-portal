import authReducer from './authReducer';
import { combineReducers } from 'redux';
import ui from "./ui";
import filters from "./filters";

export default combineReducers({
    auth: authReducer,
    ui,
    filters,
});
