import { useCallback, useEffect, useState } from "react";
import { IMAGE_DEFAULT, TIMEOUT_DEFAULT } from "@/common/constants";
import { nonUnicode, _customThemeSelect2 } from "@/common/helpers";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationInput from "@/Components/ValidationInput";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import _ from "lodash";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/Components/ImageComponent";
import axios from "axios";

const _crop = { x: 0, y: 0 };
const _ratio = 1;

export default function CreateProduct(props) {
    const { data, setData, processing } = useForm({
        name: "",
        price: 0,
        total: 0,
        status: "0",
        description: "",
        categories: [],
    });
    const [imagePreviewUrl, setImagePreviewUrl] = useState(IMAGE_DEFAULT);
    const _croppedAreaPixels = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    const [crop, setCrop] = useState(_crop);
    const [zoom, setZoom] = useState(1);
    const [file, setFile] = useState();
    const [inputValue, setInputValue] = useState("");
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [chooseImg, setChooseImg] = useState(false);
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState(null);

    useEffect(() => {
        showCroppedImage(_croppedAreaPixels);
    }, []);

    const handleCancelUpdate = () => {
        setChooseImg(false);
        setFile();
        setImagePreviewUrl(IMAGE_DEFAULT);
        setInputValue("");
        setCrop(_crop);
        setZoom(1);
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleUploadImage = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const fileUpload = e.target.files[0];
        reader.onloadend = () => {
            setFile(fileUpload);
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(fileUpload);
        setInputValue(e.target.value);
        setChooseImg(true);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = async (croppedData = _croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(
            imagePreviewUrl,
            croppedAreaPixels ? croppedAreaPixels : croppedData
        );
        setCroppedImage(croppedImage);
    };

    const handleSave = () => {
        const formData = new FormData();
        setResponse(null);

        for (let field in data) {
            formData.append(field, data[field]);
        }

        if (file) {
            formData.append("thumbnail", file);
            formData.append("crop_x", crop.x);
            formData.append("crop_y", crop.y);
            formData.append("crop_width", croppedAreaPixels.width);
            formData.append("crop_height", croppedAreaPixels.height);
        }

        axios
            .post(route("shop-management.products.store"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(
                (res) => {
                    setResponse(res.data);
                    setTimeout(() => {
                        window.location.href = route(
                            "shop-management.products.index"
                        );
                    }, TIMEOUT_DEFAULT);
                },
                (error) => {
                    if (error.response.status === 422) {
                        const _errors = {};
                        for (let field in error.response.data.errors) {
                            _errors[field] =
                                error.response.data.errors[field][0];
                        }
                        setErrors(_errors);
                    } else {
                        setResponse({
                            message: error.response.data.message,
                            success: false,
                        });
                    }
                }
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
                        {response ? (
                            <div
                                className={
                                    "mb-6 font-medium rounded p-4 " +
                                    (response.success
                                        ? "text-green-700 bg-green-200"
                                        : "text-red-700 bg-red-200")
                                }
                            >
                                {response.message}
                            </div>
                        ) : null}

                        <div className="bg-white flex justify-center items-center shadow-sm sm:rounded-lg">
                            <div className="w-full mt-6 px-6 py-4 bg-white sm:rounded-lg">
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-4">
                                            <Label
                                                forInput="name"
                                                value="Name"
                                            />
                                            <Input
                                                type="text"
                                                name="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                handleChange={onHandleChange}
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
                                        <div className="mb-4">
                                            <Label
                                                forInput="categories"
                                                value="Categories"
                                            />
                                            <div className="flex items-start flex-col cursor-text">
                                                <Input
                                                    type="select"
                                                    isMulti
                                                    name="categories"
                                                    options={props.categories.map(
                                                        (category) => ({
                                                            value: category.id,
                                                            label: category.name,
                                                        })
                                                    )}
                                                    handleChange={(val) =>
                                                        setData(
                                                            "categories",
                                                            val.map(
                                                                (v) => v.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <ValidationInput
                                                    name="categories"
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <Label
                                                forInput="price"
                                                value="Price"
                                            />
                                            <Input
                                                type="number"
                                                name="price"
                                                className="mt-1 block w-full text-right"
                                                value={data.price}
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="price"
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label
                                                forInput="total"
                                                value="Total"
                                            />
                                            <Input
                                                type="number"
                                                name="total"
                                                className="mt-1 block w-full text-right"
                                                value={data.total}
                                                handleChange={onHandleChange}
                                            />
                                            <ValidationInput
                                                name="total"
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label
                                                forInput="status"
                                                value="Status"
                                            />
                                            <Input
                                                type="radio"
                                                name="status"
                                                className="mt-1 block w-full text-right"
                                                options={[
                                                    {
                                                        label: "Unpublished",
                                                        value: 0,
                                                        checked:
                                                            data.status === "0",
                                                    },
                                                    {
                                                        label: "Published",
                                                        value: 1,
                                                        checked:
                                                            data.status === "1",
                                                    },
                                                ]}
                                                handleChange={onHandleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <Label value="Thumbnail" />
                                            <div className="text-center my-4 h-80 mx-auto relative">
                                                {chooseImg ? (
                                                    <Cropper
                                                        image={imagePreviewUrl}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        aspect={_ratio}
                                                        onCropChange={setCrop}
                                                        onCropComplete={
                                                            onCropComplete
                                                        }
                                                        onZoomChange={setZoom}
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            croppedImage ||
                                                            imagePreviewUrl
                                                        }
                                                        className="max-h-80 mx-auto"
                                                    />
                                                )}
                                            </div>
                                            <div className="text-center mt-4 relative">
                                                <div
                                                    className={
                                                        chooseImg
                                                            ? "hidden"
                                                            : "block"
                                                    }
                                                >
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        accept="image/png,image/jpg,image/jpeg"
                                                        className="focus:outline-none focus:border-none cursor-pointer w-full absolute inset-0 opacity-0"
                                                        onChange={
                                                            handleUploadImage
                                                        }
                                                        value={inputValue}
                                                    />
                                                    <div className="px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase">
                                                        Choose image
                                                    </div>
                                                </div>
                                                <div
                                                    className={`mt-4 text-center ${
                                                        chooseImg
                                                            ? "block"
                                                            : "hidden"
                                                    }`}
                                                >
                                                    <div
                                                        className="px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase inline-block mr-4"
                                                        onClick={() => {
                                                            setChooseImg(false);
                                                            showCroppedImage();
                                                        }}
                                                    >
                                                        Done
                                                    </div>
                                                    <div
                                                        className="px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase inline-block"
                                                        onClick={
                                                            handleCancelUpdate
                                                        }
                                                    >
                                                        Cancel
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden flex flex-col justify-center items-start shadow-sm sm:rounded-lg mt-6">
                            <div className="w-full mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
                                <div className="mb-4">
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
                        <div className="bg-white overflow-hidden flex justify-center items-center shadow-sm sm:rounded-lg mt-6 py-6">
                            <Button
                                type="button"
                                processing={processing}
                                handleClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
