import {
    CATEGORY_CLOSE_CATEGORY_SELECTION_MODAL_ACTION,
    CATEGORY_SET_CATEGORIES_ACTION,
    CATEGORY_SET_SELECTED_CATEGORIES_ACTION,
    CATEGORY_TOGGLE_CATEGORY_SELECTION_MODAL_ACTION,
} from "@/redux/actions/categoryActions";

const initState = {
    categorySelectionModal: {
        open: false,
        title: "List of categories",
        categories: [],
        isLoaded: false,
        selectedCategories: [],
    },
};

export default function categoryReducers(state = initState, action) {
    switch (action.type) {
        case CATEGORY_TOGGLE_CATEGORY_SELECTION_MODAL_ACTION:
            return {
                ...state,
                categorySelectionModal: {
                    ...state.categorySelectionModal,
                    ...action.payload,
                },
            };
        case CATEGORY_SET_CATEGORIES_ACTION:
            return {
                ...state,
                categorySelectionModal: {
                    ...state.categorySelectionModal,
                    ...action.payload,
                },
            };
        case CATEGORY_CLOSE_CATEGORY_SELECTION_MODAL_ACTION:
            return {
                ...state,
                categorySelectionModal: {
                    ...initState.categorySelectionModal,
                },
            };
        case CATEGORY_SET_SELECTED_CATEGORIES_ACTION:
            let newData = [...state.categorySelectionModal.selectedCategories];
            if (action.payload.checked) {
                newData.push(action.payload.item);
            } else {
                newData = newData.filter(
                    (i) => i.id !== action.payload.item.id
                );
            }
            return {
                ...state,
                categorySelectionModal: {
                    ...state.categorySelectionModal,
                    selectedCategories: newData,
                },
            };
        default:
            return state;
    }
}
