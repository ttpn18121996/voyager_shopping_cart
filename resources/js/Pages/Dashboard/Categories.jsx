import CategoySelectionModal from "@/Components/Authenticated/Categories/CategorySelectionModal";
import Authenticated from "@/Layouts/Authenticated";
import {
    authenticatedCloseConfirmModalAction,
    authenticatedToggleConfirmModalAction,
} from "@/redux/actions/authenticatedActions";
import { categoryToggleCategorySelectionModalAction } from "@/redux/actions/categoryActions";
import { XIcon } from "@heroicons/react/solid";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";

const _columns = [
    {
        id: "id",
        name: "ID",
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

export default function Categories(props) {
    const dispatch = useDispatch();

    const columnAction = {
        id: "action",
        name: "",
        maxWidth: "100px",
        selector: (row) => {
            return (
                <button
                    type="button"
                    onClick={() =>
                        dispatch(
                            authenticatedToggleConfirmModalAction({
                                open: true,
                                message: "Do you want to remove this?",
                                title: "Confirm remove",
                                confirm: () => {
                                    handleRemoveCategoryFromShop(row.id);
                                },
                            })
                        )
                    }
                >
                    <XIcon className="h-4 w-4 text-red-400" />
                </button>
            );
        },
    };

    const handleRemoveCategoryFromShop = (categoryId) => {
        axios
            .delete(
                route("dashboard.api.shop.remove-category", {
                    shop: props.auth.user.id,
                    category: categoryId,
                })
            )
            .then(
                (res) => {
                    window.location.reload();
                },
                (error) => {
                    console.error(error.message);
                    dispatch(authenticatedCloseConfirmModalAction());
                }
            );
    };

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Category
                    </h2>
                }
            >
                <Head title="Category" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="text-right p-4">
                                <button
                                    type="button"
                                    className="py-2 px-4 border border-blue-400 text-center bg-blue-400 text-white rounded"
                                    onClick={() =>
                                        dispatch(
                                            categoryToggleCategorySelectionModalAction(
                                                {
                                                    open: true,
                                                }
                                            )
                                        )
                                    }
                                >
                                    Add Category
                                </button>
                            </div>
                            <div className="px-6">
                                <DataTable
                                    columns={_columns.concat([columnAction])}
                                    data={props.categories}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <CategoySelectionModal {...props} />
            </Authenticated>
        </>
    );
}
