import axios from "axios";
import { ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";
import {
    categorySetCategoriesAction,
    CATEGORY_FETCH_CATEGORIES_ACTION,
} from "../actions/categoryActions";

export const fetchCategoriesEpic = ($action) =>
    $action.pipe(
        ofType(CATEGORY_FETCH_CATEGORIES_ACTION),
        switchMap((action) => {
            return axios.get("/shop-management/api/categories").then(
                (res) =>
                    categorySetCategoriesAction({
                        categories: res.data.categories,
                        selectedCategories: res.data.categories.filter(
                            (category) => category.selected
                        ),
                        isLoaded: true,
                    }),
                () =>
                    authenticatedSetCategoriesAction({
                        categories: [],
                        isLoaded: true,
                    })
            );
        })
    );
