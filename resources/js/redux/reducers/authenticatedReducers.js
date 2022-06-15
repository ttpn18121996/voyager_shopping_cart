import {
    AUTHENTICATED_TOGGLE_CONFIRM_MODAL_ACTION,
    AUTHENTICATED_CLOSE_CONFIRM_MODAL_ACTION,
} from "../actions/authenticatedActions";

const initState = {
    confirmModal: {
        open: false,
        confirm: () => {},
        message: "Are you sure?",
        title: "Confirm",
    },
};

export default function authenticatedReducers(state = initState, action) {
    switch (action.type) {
        case AUTHENTICATED_TOGGLE_CONFIRM_MODAL_ACTION:
            return {
                ...state,
                confirmModal: {
                    ...state.confirmModal,
                    ...action.payload,
                },
            };
        case AUTHENTICATED_CLOSE_CONFIRM_MODAL_ACTION:
            return {
                ...state,
                confirmModal: {
                    ...initState.confirmModal,
                },
            };
        default:
            return state;
    }
}
