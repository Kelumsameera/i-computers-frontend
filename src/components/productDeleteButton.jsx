import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteButton(props) {
    const productID = props.productID;
    const reload = props.reload
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${productID}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        toast.success("Product deleted successfully");
        setIsMessageOpen(false);
        setIsDeleting(false);
        reload();
      });
    } catch (error) {
      toast.error("Failed to delete product");
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsMessageOpen(true)}
        className="text-xs bg-red-500 flex justify-center items-center text-white rounded-xl px-1 py-2 cursor-pointer hover:bg-red-700 transition"
      >
        Delete
      </button>

      {isMessageOpen && (
        <div className="fixed inset-0 z-9999 bg-black/55 flex justify-center items-center">
          <div className="w-[600px] h-[300px] bg-white rounded-2xl relative flex flex-col justify-center items-center text-gray-900 text-xl font-bold">
            <button
              onClick={() => setIsMessageOpen(false)}
              className="w-10 h-10 bg-red-600 rounded-full text-white text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-30px] top-[-30px]"
            >
              X
            </button>
            <p className="mb-8">Are you sure you want to delete this product {productID}?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setIsMessageOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
