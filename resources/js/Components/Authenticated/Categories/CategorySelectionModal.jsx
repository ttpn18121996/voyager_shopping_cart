import Modal from "@/Components/Modal";
import {
    categoryCloseCategorySelectionModalAction,
    categoryFetchCategoriesAction,
    categorySetSelectedCategoriesAction,
} from "@/redux/actions/categoryActions";
import axios from "axios";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

const _columns = [
    {
        id: "id",
        name: "ID",
        width: "100px",
        selector: (row) => row.id,
    },
    {
        id: "name",
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        id: "slug",
        name: "Slug",
        selector: (row) => row.slug,
        sortable: true,
    },
];

export default function CategoySelectionModal(props) {
    const open = useSelector(
        (state) => state.categoryReducers.categorySelectionModal.open
    );
    const title = useSelector(
        (state) => state.categoryReducers.categorySelectionModal.title
    );
    const categories = useSelector(
        (state) => state.categoryReducers.categorySelectionModal.categories
    );
    const selectedCategories = useSelector(
        (state) =>
            state.categoryReducers.categorySelectionModal.selectedCategories
    );
    const isLoaded = useSelector(
        (state) => state.categoryReducers.categorySelectionModal.isLoaded
    );
    const dispatch = useDispatch();

    const columnCheckbox = {
        id: "selectable",
        name: "",
        width: "50px",
        selector: (row) => (
            <input
                type="checkbox"
                defaultChecked={row.selected}
                onChange={(e) => handleChange(row, e)}
            />
        ),
    };

    useEffect(() => {
        isLoaded || dispatch(categoryFetchCategoriesAction());
    }, [isLoaded]);

    const closeModal = () =>
        dispatch(categoryCloseCategorySelectionModalAction());

    const handleChange = (row, e) => {
        dispatch(
            categorySetSelectedCategoriesAction({
                item: row,
                checked: e.target.checked,
            })
        );
    };

    const handleSave = () => {
        axios
            .post(
                route("shop-management.api.shop.attach-categories", {
                    shop: props.auth.user.id,
                }),
                {
                    categories: selectedCategories.map((item) => item.id),
                }
            )
            .then(
                () => {
                    window.location.reload();
                },
                (error) => {
                    console.error(error.message);
                    closeModal();
                }
            );
    };

    return (
        open && (
            <>
                <Modal
                    title={title}
                    size="md"
                    closeModal={closeModal}
                    key="CategorySelectionModal"
                    buttons={[
                        <button
                            type="button"
                            key="btnSave"
                            className="bg-blue-400 text-white px-4 py-2 rounded mr-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>,
                    ]}
                >
                    <div className="px-6">
                        <DataTable
                            columns={(() => {
                                _columns.unshift(columnCheckbox);
                                return _columns;
                            })()}
                            data={categories}
                        />
                    </div>
                </Modal>
            </>
        )
    );
}
