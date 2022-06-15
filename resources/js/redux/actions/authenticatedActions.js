export const AUTHENTICATED_TOGGLE_CONFIRM_MODAL_ACTION =
    "AUTHENTICATED_TOGGLE_CONFIRM_MODAL_ACTION";
export const AUTHENTICATED_CLOSE_CONFIRM_MODAL_ACTION =
    "AUTHENTICATED_CLOSE_CONFIRM_MODAL_ACTION";

export const authenticatedToggleConfirmModalAction = (data) => ({
    type: AUTHENTICATED_TOGGLE_CONFIRM_MODAL_ACTION,
    payload: data,
});

export const authenticatedCloseConfirmModalAction = () => ({
    type: AUTHENTICATED_CLOSE_CONFIRM_MODAL_ACTION,
});
