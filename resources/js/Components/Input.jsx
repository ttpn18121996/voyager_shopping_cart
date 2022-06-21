import { _customThemeSelect2 } from "@/common/helpers";
import React, { useEffect, useRef } from "react";
import Select from "react-select";

export default function Input({
    type = "text",
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    prepend,
    options,
    isMulti,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const generateSelect = () => (
        <Select
            isMulti
            name={name}
            id={name}
            inputId={`react-select-2-${name}`}
            className="rounded-md mt-1 block w-full select2"
            options={options}
            theme={_customThemeSelect2}
            onChange={handleChange}
        />
    );

    return type === "select" ? (
        generateSelect()
    ) : (
        <div
            className={
                "flex items-start " + (prepend ? "flex-row gap-2" : "flex-col")
            }
        >
            {prepend}

            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
