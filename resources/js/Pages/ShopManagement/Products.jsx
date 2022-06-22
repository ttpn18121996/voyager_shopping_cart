import { TIMEOUT_DEFAULT } from "@/common/constants";
import Authenticated from "@/Layouts/Authenticated";
import {
    authenticatedCloseConfirmModalAction,
    authenticatedToggleConfirmModalAction,
} from "@/redux/actions/authenticatedActions";
import { PencilAltIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import { Head, Link } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";

const generateDatatableColumns = ({ handleClickStatus, handleClickDelete }) => {
    return [
        {
            id: "id",
            name: "ID",
            width: "100px",
            selector: (row) => row.id,
        },
        {
            id: "name",
            name: "Name",
            selector: (row) => (
                <div className="my-2">
                    <p className="text-base">{row.name}</p>
                    <p className="text-gray-500">{row.slug}</p>
                </div>
            ),
            sortable: true,
        },
        {
            id: "price",
            name: "Price",
            width: "150px",
            selector: (row) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(row.price),
            sortable: true,
        },
        {
            id: "total",
            name: "Total",
            width: "100px",
            selector: (row) => row.total,
            sortable: true,
        },
        {
            id: "status",
            name: "Status",
            width: "120px",
            selector: (row) =>
                row.status ? (
                    <span
                        className="bg-green-500 text-white rounded p-1 cursor-pointer"
                        onClick={() => handleClickStatus(row)}
                    >
                        Published
                    </span>
                ) : (
                    <span
                        className="bg-red-500 text-white rounded p-1 cursor-pointer"
                        onClick={() => handleClickStatus(row)}
                    >
                        Unpublished
                    </span>
                ),
            sortable: true,
        },
        {
            id: "action",
            name: "",
            width: "120px",
            selector: (row) => {
                return (
                    <>
                        <div className="flex justify-start gap-2">
                            <Link
                                href={route("shop-management.products.update", {
                                    product: row,
                                })}
                                className="px-2 py-1 inline-block border border-cyan-400 rounded bg-cyan-400"
                            >
                                <PencilAltIcon className="h-4 w-4 text-white" />
                            </Link>
                            <button
                                type="button"
                                className="px-2 py-1 inline-block border border-red-400 rounded bg-red-400"
                                onClick={() => handleClickDelete(row)}
                            >
                                <XIcon className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    </>
                );
            },
        },
    ];
};

export default function Products(props) {
    const dispatch = useDispatch();
    const [response, setResponse] = useState(null);

    const handleClickStatus = (row) => {
        dispatch(
            authenticatedToggleConfirmModalAction({
                open: true,
                title: "Confirm update status",
                message:
                    "Are you sure you want to " +
                    (row.status ? "unpublished this?" : "published this?"),
                confirm: () => {
                    axios
                        .patch(
                            route("shop-management.products.update-status", {
                                product: row,
                            }),
                            { status: row.status ? 0 : 1 }
                        )
                        .then(
                            (res) => {
                                setResponse({
                                    success: true,
                                    message: res.data.message,
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, TIMEOUT_DEFAULT);
                            },
                            (error) => {
                                setResponse({
                                    success: false,
                                    message: error.response.data.message,
                                });
                            }
                        )
                        .then(() =>
                            dispatch(authenticatedCloseConfirmModalAction())
                        );
                },
            })
        );
    };

    const handleClickDelete = (row) =>
        dispatch(
            authenticatedToggleConfirmModalAction({
                open: true,
                title: "Confirm delete",
                message: "Are you sure you want to delete this product?",
                confirm: () => {
                    axios
                        .delete(
                            route("shop-management.products.destroy", {
                                product: row,
                            })
                        )
                        .then(
                            (res) => {
                                setResponse({
                                    success: true,
                                    message: res.data.message,
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, TIMEOUT_DEFAULT);
                            },
                            (error) => {
                                setResponse({
                                    success: false,
                                    message: error.response.data.message,
                                });
                            }
                        )
                        .then(() => {
                            dispatch(authenticatedCloseConfirmModalAction());
                        });
                },
            })
        );
    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Products
                    </h2>
                }
            >
                <Head title="Products" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {response ? (
                            <div
                                className={
                                    "mb-6 font-medium rounded p-4 " +
                                    (response.success
                                        ? "text-green-700 bg-green-200"
                                        : "text-red-700 bg-red-200")
                                }
                            >
                                {response.message}
                            </div>
                        ) : null}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="text-right p-4">
                                <Link
                                    href={route(
                                        "shop-management.products.create"
                                    )}
                                    className="py-2 px-4 border border-blue-500 text-center bg-blue-500 text-white rounded inline-block"
                                >
                                    <PlusIcon className="text-white w-4 h-4 inline-block mr-2" />
                                    Create product
                                </Link>
                            </div>

                            <div className="px-6">
                                <DataTable
                                    columns={generateDatatableColumns({
                                        handleClickStatus,
                                        handleClickDelete,
                                    })}
                                    data={props.products}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
