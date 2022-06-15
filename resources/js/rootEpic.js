import { combineEpics } from "redux-observable";
import { fetchCategoriesEpic } from "./redux/epics/categoryEpics";

export default combineEpics(fetchCategoriesEpic);
