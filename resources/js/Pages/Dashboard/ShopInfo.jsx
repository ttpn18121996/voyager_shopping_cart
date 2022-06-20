import { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import ValidationInput from "@/Components/ValidationInput";

export default function ShopInfo(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.auth.user.name,
        phone: props.auth.user.phone,
        address: props.auth.user.address,
        tax_code: props.auth.user.tax_code,
        description: props.auth.user.description || "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("dashboard.shop.update-info"));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.auth.user.email}
                </h2>
            }
        >
            <Head title="Edit profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="bg-white overflow-hidden flex justify-center items-center shadow-sm sm:rounded-lg">
                            <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
                                <div className="grid md:grid-cols-2 gap-4">
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
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="name"
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <Label
                                                forInput="phone"
                                                value="Phone"
                                            />
                                            <Input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="mt-1 block w-full"
                                                value={data.phone}
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="phone"
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <Label
                                                forInput="tax_code"
                                                value="Tax code"
                                            />
                                            <Input
                                                type="text"
                                                id="tax_code"
                                                name="tax_code"
                                                className="mt-1 block w-full"
                                                value={data.tax_code}
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="tax_code"
                                                errors={errors}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <Label
                                                forInput="address"
                                                value="Address"
                                            />
                                            <Input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="mt-1 block w-full"
                                                value={data.address}
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="address"
                                                errors={errors}
                                            />
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
                            <Button processing={processing}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
