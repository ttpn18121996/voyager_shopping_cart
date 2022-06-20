import { nonUnicode, _customThemeSelect2 } from "@/common/helpers";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationInput from "@/Components/ValidationInput";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import _ from "lodash";
import { useState } from "react";
import Select from "react-select";

export default function CreateProduct(props) {
    const { data, setData, post, errors, processing } = useForm({
        price: 0,
        total: 0,
    });
    const [file, setFile] = useState();

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create product
                    </h2>
                }
            >
                <Head title="Create product" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form>
                            <div className="bg-white overflow-hidden flex justify-center items-center shadow-sm sm:rounded-lg">
                                <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div>
                                            <div>
                                                <Label
                                                    forInput="name"
                                                    value="Name"
                                                />
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="mt-1 block w-full"
                                                    value={data.name}
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                />
                                                <p className="text-sm text-gray-400">
                                                    {_.kebabCase(
                                                        nonUnicode(data.name)
                                                    )}
                                                </p>
                                                <ValidationInput
                                                    name="name"
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <Label
                                                    forInput="price"
                                                    value="Price"
                                                />
                                                <Input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    className="mt-1 block w-full text-right"
                                                    value={data.price}
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                />
                                                <ValidationInput
                                                    name="price"
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <Label
                                                    forInput="total"
                                                    value="Total"
                                                />
                                                <Input
                                                    type="number"
                                                    id="total"
                                                    name="total"
                                                    className="mt-1 block w-full text-right"
                                                    value={data.total}
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                />
                                                <ValidationInput
                                                    name="total"
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <Label
                                                    forInput="categories"
                                                    value="Categories"
                                                />
                                                <div className="flex items-start flex-col cursor-text">
                                                    <Select
                                                        isMulti
                                                        name="categories"
                                                        id="categories"
                                                        inputId="react-select-2-categories"
                                                        className="rounded-md mt-1 block w-full select2"
                                                        options={props.categories.map(
                                                            (category) => ({
                                                                value: category.id,
                                                                label: category.name,
                                                            })
                                                        )}
                                                        theme={
                                                            _customThemeSelect2
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <Label
                                                    forInput="description"
                                                    value="Description"
                                                />
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                                    value={data.description}
                                                    onChange={onHandleChange}
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden flex justify-center items-center shadow-sm sm:rounded-lg mt-6 py-6">
                                <input type="file" name="images" />
                            </div>
                            <div className="bg-white overflow-hidden flex justify-center items-center shadow-sm sm:rounded-lg mt-6 py-6">
                                <Button processing={processing}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
