import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/uploadMedia";



export default function AdminUpdateProductPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // -------------------------------
    // SAFETY CHECK — avoid crash on refresh
    // -------------------------------
    const product = location.state;
    useEffect(() => {
        if (!product) navigate("/admin/products");
    }, []);

    if (!product) return null;

    // -------------------------------
    // STATE
    // -------------------------------
    const [productID] = useState(product.productID);
    const [name, setName] = useState(product.name);
    const [altNames, setAltNames] = useState(product.altNames.join(","));
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [labelledPrice, setLabelledPrice] = useState(product.labelledPrice);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(product.category);
    const [brand, setBrand] = useState(product.brand);
    const [model, setModel] = useState(product.model);
    const [stock, setStock] = useState(product.stock);
    const [isAvailable, setIsAvailable] = useState(product.isAvailable);
    const [loading, setLoading] = useState(false);

    // -------------------------------
    // UPDATE PRODUCT
    // -------------------------------
    async function updateProduct() {
        if (loading) return;
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in as admin.");
            navigate("/login");
            return;
        }

        // Validation
        if (!name || !description || !category || !brand || !model) {
            toast.error("Please fill all required fields.");
            setLoading(false);
            return;
        }

        let images = product.images;

        try {
            // Upload new images if selected
            if (files.length > 0) {
                const uploadTasks = Array.from(files).map((file) => uploadMedia(file));
                images = await Promise.all(uploadTasks);
            }
        } catch (err) {
            toast.error("Error uploading images.");
            console.log(err);
            setLoading(false);
            return;
        }

        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/products/${productID}`,
                {
                    name,
                    altNames: altNames.split(",").map((a) => a.trim()),
                    description,
                    price,
                    labelledPrice,
                    images,
                    category,
                    brand,
                    model,
                    stock,
                    isAvailable: isAvailable === "true" || isAvailable === true,
                },
                { headers: { Authorization: "Bearer " + token } }
            );

            toast.success("Product updated successfully!");
            navigate("/admin/products");
        } catch (err) {
            toast.error("Error updating product.");
            console.log(err);
        }

        setLoading(false);
    }

    // -------------------------------
    // UI
    // -------------------------------
    return (
        <div className="w-full flex justify-center p-[50px]">
            <div className="bg-accent/80 rounded-2xl p-10 w-[800px] shadow-2xl">
                <h1 className="text-xl text-primary mb-5 flex items-center gap-[5px]">
                    <AiOutlineProduct /> Update Product
                </h1>

                <div className="bg-white p-5 rounded-xl shadow-2xl flex flex-wrap gap-[15px]">

                    {/* Product ID */}
                    <Field label="Product ID" value={productID} disabled />

                    {/* Name */}
                    <Field label="Name" value={name} onChange={setName} />

                    {/* Alt names */}
                    <Field
                        label="Alternative Names"
                        value={altNames}
                        onChange={setAltNames}
                        full
                        hint="Separate multiple names with commas"
                    />

                    {/* Description */}
                    <TextArea
                        label="Description"
                        value={description}
                        onChange={setDescription}
                    />

                    {/* Prices */}
                    <Field label="Price" type="number" value={price} onChange={setPrice} />
                    <Field
                        label="Labelled Price"
                        type="number"
                        value={labelledPrice}
                        onChange={setLabelledPrice}
                    />

                    {/* Images */}
                    <div className="w-full">
                        <label>Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                            className="w-full h-10 rounded-2xl border border-accent px-5"
                        />
                    </div>

                    {/* Category */}
                    <Select
                        label="Category"
                        value={category}
                        onChange={setCategory}
                        options={[
                            "CPU", "Graphic Cards", "Motherboards", "Power Supplies",
                            "RAM", "Storage Devices", "Cooling Solutions",
                            "Computer Cases", "Mouse and Keyboards",
                            "Accessories", "Monitors", "Computers",
                            "Laptops", "Cables", "Others",
                        ]}
                    />

                    {/* Brand */}
                    <Field label="Brand" value={brand} onChange={setBrand} />

                    {/* Model */}
                    <Field label="Model" value={model} onChange={setModel} />

                    {/* Stock */}
                    <Field
                        label="Stock"
                        type="number"
                        value={stock}
                        onChange={setStock}
                    />

                    {/* Availability */}
                    <Select
                        label="Available"
                        value={String(isAvailable)}
                        onChange={(v) => setIsAvailable(v === "true")}
                        options={[
                            { label: "Yes", value: "true" },
                            { label: "No", value: "false" },
                        ]}
                    />

                    {/* Buttons */}
                    <Link
                        to="/admin/products"
                        className="w-[49%] h-[50px] bg-red-500 text-white font-bold rounded-2xl flex justify-center items-center hover:bg-red-700 mt-5"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={updateProduct}
                        disabled={loading}
                        className="w-[49%] h-[50px] bg-accent text-white font-bold rounded-2xl hover:bg-transparent hover:text-accent border-2 border-accent mt-5"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------
   REUSABLE COMPONENTS
-------------------------------- */

function Field({ label, value, onChange, type = "text", disabled = false, full = false, hint }) {
    return (
        <div className={`${full ? "w-full" : "w-[48%]"} my-2.5`}>
            <label>{label}</label>
            <input
                type={type}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="w-full h-10 rounded-2xl border border-accent px-5"
            />
            {hint && <p className="text-sm text-gray-500">{hint}</p>}
        </div>
    );
}

function TextArea({ label, value, onChange }) {
    return (
        <div className="w-full my-2.5">
            <label>{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-[100px] rounded-2xl border border-accent px-5 py-2.5"
            ></textarea>
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="w-[30%] my-2.5">
            <label>{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 rounded-2xl border border-accent px-5"
            >
                {options.map((opt, i) =>
                    typeof opt === "string" ? (
                        <option key={i} value={opt}>{opt}</option>
                    ) : (
                        <option key={i} value={opt.value}>{opt.label}</option>
                    )
                )}
            </select>
        </div>
    );
}
