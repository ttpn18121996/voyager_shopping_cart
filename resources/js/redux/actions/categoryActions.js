export const CATEGORY_TOGGLE_CATEGORY_SELECTION_MODAL_ACTION =
    "CATEGORY_TOGGLE_CATEGORY_SELECTION_MODAL_ACTION";
export const CATEGORY_CLOSE_CATEGORY_SELECTION_MODAL_ACTION =
    "CATEGORY_CLOSE_CATEGORY_SELECTION_MODAL_ACTION";

export const CATEGORY_FETCH_CATEGORIES_ACTION =
    "CATEGORY_FETCH_CATEGORIES_ACTION";
export const CATEGORY_SET_CATEGORIES_ACTION = "CATEGORY_SET_CATEGORIES_ACTION";
export const CATEGORY_SET_SELECTED_CATEGORIES_ACTION =
    "CATEGORY_SET_SELECTED_CATEGORIES_ACTION";

export const categoryToggleCategorySelectionModalAction = (data) => ({
    type: CATEGORY_TOGGLE_CATEGORY_SELECTION_MODAL_ACTION,
    payload: data,
});

export const categoryCloseCategorySelectionModalAction = () => ({
    type: CATEGORY_CLOSE_CATEGORY_SELECTION_MODAL_ACTION,
});

export const categoryFetchCategoriesAction = (data = {}) => ({
    type: CATEGORY_FETCH_CATEGORIES_ACTION,
    payload: data,
});

export const categorySetCategoriesAction = (data) => ({
    type: CATEGORY_SET_CATEGORIES_ACTION,
    payload: data,
});

export const categorySetSelectedCategoriesAction = (data = []) => ({
    type: CATEGORY_SET_SELECTED_CATEGORIES_ACTION,
    payload: data,
});
