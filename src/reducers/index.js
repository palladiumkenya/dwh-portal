import { combineReducers } from "redux";
import ui from "./ui";
import filters from "./filters";

export default combineReducers({
    ui,
    filters,
});
