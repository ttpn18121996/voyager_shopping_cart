import { SearchIcon } from "@heroicons/react/solid";

export default function SearchForm() {
    return (
        <>
            <div className="frm-search">
                <form action={route("search-result")} method="GET">
                    <div className="relative w-96">
                        <input
                            type="search"
                            name="keyword"
                            className="pl-4 pr-11 py-2 text-sm rounded border-gray-200 w-full h-10"
                            placeholder="Search..."
                        />
                        <button className="bg-orange-400 absolute right-0 top-0 rounded-r border-gray-200 h-10 px-2">
                            <SearchIcon className="h-6 w-6 text-gray-100" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
