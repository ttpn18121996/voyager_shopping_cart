export default function Modal({ size, children, buttons, closeModal, title }) {
    const getSizeClass = () => {
        switch (size) {
            case "sm":
                return "relative w-full my-6 mx-auto max-w-sm";
            case "md":
                return "relative w-full my-6 mx-auto max-w-3xl";
            case "lg":
                return "relative w-80 my-6 mx-auto max-w-6xl";
            default:
                return "relative w-80 my-6 mx-auto max-w-3xl";
        }
    };

    return (
        open && (
            <>
                <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className={getSizeClass()}>
                        {/* content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    {title || "Confirm"}
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/* body */}
                            <div className="relative p-6 flex-auto">
                                {children}
                            </div>
                            {/* footer */}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                {buttons}
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
