import { authenticatedCloseConfirmModalAction } from "@/redux/actions/authenticatedActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";

export default function ConfirmModal() {
    const open = useSelector(
        (state) => state.authenticatedReducers.confirmModal.open
    );
    const { title, message } = useSelector(
        (state) => state.authenticatedReducers.confirmModal
    );
    const handleConfirm = useSelector(
        (state) => state.authenticatedReducers.confirmModal.confirm
    );
    const dispatch = useDispatch();

    const closeModal = () => dispatch(authenticatedCloseConfirmModalAction());

    return (
        open && (
            <>
                <Modal
                    size="sm"
                    title={title}
                    buttons={[
                        <button
                            type="button"
                            className="bg-blue-400 text-white mr-2 px-4 py-2 rounded"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>,
                    ]}
                    closeModal={closeModal}
                    key="CategorySelectionModal"
                >
                    <p className="my-4 text-slate-500 text-lg leading-relaxed text-center">
                        {message || "Are you sure?"}
                    </p>
                </Modal>
            </>
        )
    );
}
