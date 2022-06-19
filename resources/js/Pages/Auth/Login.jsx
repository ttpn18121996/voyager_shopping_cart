import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
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

        post(route("login"));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Log in" />
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-orange-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <ValidationErrors errors={errors} />
                <form onSubmit={submit}>
                    <div>
                        <Label forInput="email" value="Email" />

                        <Input
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="Password" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Link
                                href={route("register")}
                                className="ml-2 underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Register a shop
                            </Link>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <Button className="ml-4" processing={processing}>
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
