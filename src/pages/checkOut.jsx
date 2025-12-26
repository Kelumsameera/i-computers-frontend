import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { BsTruck } from "react-icons/bs";
export const SRI_LANKA_DISTRICTS = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Moneragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state || []);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Colombo");

  const [shippingFee, setShippingFee] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);

  // ✅ MISSING STATE (FIX)
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (!location.state || location.state.length === 0) {
      navigate("/products");
    }
  }, []);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function submitOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Login required");
      return navigate("/login");
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/orders",
        {
          name,
          address,
          phone,
          district,
          items: cart.map((i) => ({
            productID: i.productID,
            quantity: i.quantity,
          })),
          paymentMethod, // future ready
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setShippingFee(res.data.shippingFee);
        setFreeShipping(res.data.freeShippingApplied);
        toast.success("Order placed successfully");
        navigate("/orders");
      })
      .catch(() => toast.error("Order failed"));
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* SHIPPING INFO */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex gap-3">
        <BsTruck className="text-green-600 text-xl" />
        <div className="text-sm text-green-700">
          {freeShipping
            ? "Free Shipping Applied"
            : "Shipping fee will be calculated at checkout"}
        </div>
      </div>

      {/* CART */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        {cart.map((i) => (
          <div key={i.productID} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={i.image}
                alt={i.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{i.name}</h3>
                <span className="text-sm text-gray-500">
                  {i.quantity} × LKR {i.price.toFixed(2)}
                </span>
              </div>
            </div>
            <span className="text-lg font-semibold">
              LKR {(i.price * i.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* SHIPPING FEE */}
      <div className="bg-white p-4 rounded-lg shadow space-y-2">
        <h3 className="text-lg font-semibold">Shipping Fee</h3>
        <span
          className={`text-lg font-semibold ${
            freeShipping ? "text-green-600" : ""
          }`}
        >
          {freeShipping ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
        </span>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>

        <label
          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer
            ${
              paymentMethod === "COD"
                ? "border-accent bg-accent/5"
                : "border-gray-200 hover:border-accent/50"
            }`}
        >
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="accent-accent"
          />
          <div className="flex-1">
            <p className="font-semibold">Cash on Delivery</p>
            <p className="text-sm text-gray-500">
              Pay when you receive the order
            </p>
          </div>
          <span className="text-sm font-semibold text-green-600">
            Available
          </span>
        </label>

        <label className="flex items-center gap-4 p-4 border rounded-lg opacity-50 cursor-not-allowed">
          <input type="radio" disabled />
          <div className="flex-1">
            <p className="font-semibold">Online Payment</p>
            <p className="text-sm text-gray-500">
              Card / PayHere (Coming soon)
            </p>
          </div>
          <span className="text-sm text-gray-400">Soon</span>
        </label>
      </div>

      {/* ADDRESS */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
        <div className="bg-white p-4 rounded-lg shadow space-y-3">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border p-3 rounded"
          >
            {SRI_LANKA_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>LKR {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={freeShipping ? "text-green-600 font-bold" : ""}>
            {freeShipping ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>LKR {(subtotal + shippingFee).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={submitOrder}
        className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:opacity-90"
      >
        Place Order
      </button>
    </div>
  );
}
