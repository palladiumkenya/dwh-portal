import { combineReducers } from "redux";
import ui from "./ui";
import tabs from "./tabs";
import filters from "./filters";

export default combineReducers({
    ui,
    tabs,
    filters,
});
