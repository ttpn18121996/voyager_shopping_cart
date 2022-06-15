import { HomeIcon } from "@heroicons/react/solid";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navigation() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (() => {
            axios.get(route("api.categories.get-list")).then(
                (res) => {
                    setCategories(res.data.categories);
                },
                (error) => console.error(error.message)
            );
        })();
    }, []);

    return (
        <nav className="py-4 lg:container mx-auto">
            <ul className="flex justify-between">
                <li>
                    <Link className="text-gray-200">
                        <HomeIcon className="w-6 h-6 text-gray-200" />
                    </Link>
                </li>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <li key={category.id}>
                            <Link
                                href={route("categories.index", { category })}
                                className="text-gray-200"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
