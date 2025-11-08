import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { uploadMedia } from "../../../utils/mediaUpload.js";

export default function AdminUpdateProductPage() {
  const location = useLocation();
  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLabelledPrice] = useState(
    location.state.labelledPrice
  );
  const [files, setfiles] = useState([]);
  const [category, setCategory] = useState(location.state.category);
  const [brand, setBrand] = useState(location.state.brand);
  const [model, setModel] = useState(location.state.model);
  const [stock, setStock] = useState(location.state.stock);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/admin/products");
  }

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in as admin to update products.");
      navigate("/login");
      return;
    }

    const imagePromises = [];

    for (let i = 0; i < files.length; i++) {
      const promise = uploadFile(files[i]);
      imagePromises.push(promise);
    }

    let images = await Promise.all(imagePromises).catch((err) => {
      toast.error("Error uploading images. Please try again.");
      console.log("Error uploading images:");
      console.log(err);
      return;
    });

    if (images.length == 0) {
      images = location.state.images;
    }

    if (
      productID == "" ||
      name == "" ||
      description == "" ||
      category == "" ||
      brand == "" ||
      model == ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const altNamesInArray = altNames.split(",");
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
        {
          name: name,
          altNames: altNamesInArray,
          description: description,
          price: price,
          labelledPrice: labelledPrice,
          images: images,
          category: category,
          brand: brand,
          model: model,
          stock: stock,
          isAvailable: isAvailable,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Error updating product. Please try again.");
      console.log("Error updating product:");
      console.log(err);
    }
  }

  return (
    <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll">
      <div className="bg-accent/80 rounded-2xl p-10 w-[800px] shadow-2xl overflow-y-visible">
        <h1 className="w-full text-xl text-primary mb-5 flex items-center gap-[5px]">
          <AiOutlineProduct /> Update Product
        </h1>

        <div className="w-full bg-white p-5 flex flex-row flex-wrap justify-between rounded-xl shadow-2xl">
          {/* Product ID */}
          <div className="my-2.5 w-[40%]">
            <label>Product ID</label>
            <input
              disabled
              type="text"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Name */}
          <div className="my-2.5 w-[40%]">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Alternative Names */}
          <div className="my-2.5 w-full">
            <label>Alternative Names</label>
            <input
              type="text"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
            <p className="text-sm text-gray-500 w-full text-right">
              Separate multiple names with commas
            </p>
          </div>

          {/* Description */}
          <div className="my-2.5 w-full">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5 py-2.5"
            />
          </div>

          {/* Price */}
          <div className="my-2.5 w-[40%]">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Labelled Price */}
          <div className="my-2.5 w-[40%]">
            <label>Labelled Price</label>
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Images */}
          <div className="my-2.5 w-full">
            <label>Images</label>
            <input
              type="file"
              multiple={true}
              onChange={(e) => {
                setfiles(e.target.files);
              }}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Category */}
          <div className="my-2.5 flex flex-col w-[30%]">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            >
              <option value="CPU">CPU</option>
              <option value="Graphic Cards">Graphic Cards</option>
              <option value="Motherboards">Motherboards</option>
              <option value="Power Supplies">Power Supplies</option>
              <option value="RAM">RAM</option>
              <option value="Storage Devices">Storage Devices</option>
              <option value="Cooling Solutions">Cooling Solutions</option>
              <option value="Computer Cases">Computer Cases</option>
              <option value="Mouse and Keyboards">Mouse and Keyboards</option>
              <option value="Accessories">Accessories</option>
              <option value="Monitors">Monitors</option>
              <option value="Computers">Computers</option>
              <option value="Laptops">Laptops</option>
              <option value="Cables">Cables</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Brand */}
          <div className="my-2.5 w-[30%]">
            <label>Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Model */}
          <div className="my-2.5 w-[30%]">
            <label>Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Stock */}
          <div className="my-2.5 w-[40%]">
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-5"
            />
          </div>

          {/* Availability */}
          <div className="my-2.5 flex flex-col items-center w-[40%]">
            <label>Available</label>
            <select
              value={String(isAvailable)}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
              className="w-full h-10 rounded-2xl border border-accent shadow-2xl px-5"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* Buttons */}
          <Link
            to="/admin/products"
            className="w-[49%] h-[50px] mt-5 bg-red-500 text-white font-bold rounded-2xl flex justify-center items-center border-2 border-red-500 shadow-md hover:bg-transparent hover:text-red-500 transition-all duration-300"
          >
            Cancel
          </Link>

          <button
            onClick={updateProduct}
            className="w-[49%] h-[50px] bg-accent text-white font-bold rounded-2xl hover:bg-transparent hover:text-accent border-2 border-accent mt-5"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
