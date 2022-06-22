import { _customThemeSelect2 } from "@/common/helpers";
import React, { Fragment, useEffect, useRef } from "react";
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

    const generateText = () => (
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

    const generateSelect = () => (
        <Select
            isMulti={isMulti}
            name={name}
            id={name}
            inputId={`react-select-2-${name}`}
            className="rounded-md mt-1 block w-full select2"
            options={options}
            theme={_customThemeSelect2}
            onChange={handleChange}
        />
    );

    const generateRadio = () => (
        <div className="flex flex-col justify-start">
            {options.map((item) => (
                <Fragment key={item.value}>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                                dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                dark:border-gray-600 mr-2"
                            name={name}
                            value={item.value}
                            id={name + "_" + item.value}
                            defaultChecked={item.checked}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label inline-block text-gray-800"
                            htmlFor={name + "_" + item.value}
                        >
                            {item.label}
                        </label>
                    </div>
                </Fragment>
            ))}
        </div>
    );

    const generateInput = () => {
        switch (type) {
            case "select":
                return generateSelect();
            case "radio":
                return generateRadio();
            default:
                return generateText();
        }
    };

    return generateInput();
}
