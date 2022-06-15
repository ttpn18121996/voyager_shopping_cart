import { combineReducers } from "redux";
import authenticatedReducers from "./redux/reducers/authenticatedReducers";
import categoryReducers from "./redux/reducers/categoryReducers";

export default combineReducers({
    authenticatedReducers,
    categoryReducers,
});
