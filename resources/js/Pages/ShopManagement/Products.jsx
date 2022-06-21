import Authenticated from "@/Layouts/Authenticated";
import { PencilAltIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import { Head, Link } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";

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
                <span className="bg-green-500 text-white rounded p-1">
                    Published
                </span>
            ) : (
                <span className="bg-red-500 text-white rounded p-1">
                    Unpublished
                </span>
            ),
        sortable: true,
    },
];

export default function Products(props) {
    const columnAction = {
        id: "action",
        name: "",
        width: "120px",
        selector: (row) => {
            return (
                <>
                    <div className="flex justify-start gap-2">
                        <Link className="px-2 py-1 inline-block border border-cyan-400 rounded bg-cyan-400">
                            <PencilAltIcon className="h-4 w-4 text-white" />
                        </Link>
                        <button
                            type="button"
                            className="px-2 py-1 inline-block border border-red-400 rounded bg-red-400"
                        >
                            <XIcon className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </>
            );
        },
    };

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
                                    columns={_columns.concat([columnAction])}
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
