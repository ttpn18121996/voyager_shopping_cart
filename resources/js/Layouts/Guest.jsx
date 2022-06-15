import React from "react";
import { Link } from "@inertiajs/inertia-react";
import SearchForm from "../Components/SearchForm";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Navigation from "@/Components/Guest/Navigation";

export default function Guest({ children }) {
    return (
        <div className="container min-h-screen max-w-full">
            <div className="container bg-gray-100 max-w-full border-b border-gray-500 flex justify-between px-5">
                <div className="text-gray-400">
                    <Link href={route("dashboard.dashboard")}>Shop</Link>
                </div>
                <div className="flex justify-end items-center text-gray-400">
                    <Link href="#" className="mr-3">
                        Login
                    </Link>
                    <Link href="#">Register</Link>
                </div>
            </div>
            <div className="container bg-gray-100 max-w-full">
                <header className="sm:container flex md:justify-between md:flex-row flex-col py-6 md:px-8 xl:px-0 mx-auto items-center">
                    <Link href={route("home")}>
                        <ApplicationLogo className="w-10 h-10 fill-current text-orange-500" />
                    </Link>
                    <SearchForm />
                    <div className="info flex justify-end">
                        <div className="cart">
                            <ShoppingCartIcon className="h-8 w-8 text-gray-500" />
                        </div>
                    </div>
                </header>
            </div>
            <div className="container bg-blue-900 max-w-full">
                <Navigation />
            </div>
            <div>{children}</div>
        </div>
    );
}
