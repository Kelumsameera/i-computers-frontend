import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

// React Icons
import {
  HiOutlineX,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
} from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

export default function ViewOrderInfo({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(order?.notes);
  const [status, setStatus] = useState(order?.status);

  if (!order) return null;

  const formatDateTime = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString();
  };

  const formatCurrency = (value) =>
    value == null ? "-" : `Rs. ${Number(value).toFixed(2)}`;

  const getStatusBadgeClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    }
  };

  const orderTotalFromItems =
    Array.isArray(order.items) && order.items.length > 0
      ? order.items.reduce(
          (sum, item) =>
            sum + (item.price || 0) * (item.quantity || 0),
          0
        )
      : order.total;

  return (
    <>
      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="w-full max-w-3xl mx-4 bg-primary rounded-2xl shadow-2xl outline-none"
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* HEADER */}
          <div className="flex items-start justify-between border-b border-secondary/10 px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                <HiOutlineClipboardList className="text-accent" />
                Order Details
              </h2>
              <p className="text-sm text-secondary/70 mt-1">
                Review the full breakdown of this customer order.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/5 text-secondary hover:bg-secondary/10 transition"
            >
              <HiOutlineX className="text-lg" />
            </button>
          </div>

          {/* BODY */}
          <div className="px-6 py-4 space-y-6 overflow-y-auto">
            {/* SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LEFT */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-secondary/60 uppercase font-semibold">
                    Order ID
                  </p>
                  <p className="text-sm font-semibold text-secondary">{order.orderId}</p>
                </div>

                <div className="flex items-center gap-2">
                  <HiOutlineUser className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Customer Name</p>
                    <p className="text-sm text-secondary">{order.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HiOutlineMail className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Email</p>
                    <p className="text-sm text-secondary break-all">{order.email}</p>
                  </div>
                </div>

                {order.phone && (
                  <div className="flex items-center gap-2">
                    <HiOutlinePhone className="text-secondary/60" />
                    <div>
                      <p className="text-xs text-secondary/60 uppercase font-semibold">Phone</p>
                      <p className="text-sm text-secondary">{order.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Order Date & Time</p>
                    <p className="text-sm text-secondary">{formatDateTime(order.date)}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <MdOutlinePendingActions className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Status</p>

                    <div className="flex items-center gap-3 mt-1">
                      {/* Badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(
                          order.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        {order.status}
                      </span>

                      {/* Select */}
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-2 py-1 border border-secondary/20 rounded-lg text-sm text-secondary outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div>
                  <p className="text-xs text-secondary/60 uppercase font-semibold">Total Amount</p>
                  <p className="text-lg font-bold text-(--color-gold)">
                    {formatCurrency(order.total ?? orderTotalFromItems)}
                  </p>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
              <p className="text-xs text-secondary/60 uppercase font-semibold mb-1 flex items-center gap-2">
                <HiOutlineHome />
                Delivery Address
              </p>
              <p className="text-sm text-secondary whitespace-pre-line">
                {order.address}
              </p>
            </div>

            {/* NOTES */}
            <div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
              <p className="text-xs text-secondary/60 uppercase font-semibold mb-1 flex items-center gap-2">
                <FiEdit3 />
                Additional Notes
              </p>
              <textarea
                className="w-full text-sm text-secondary outline-none"
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value === "" ? undefined : e.target.value)
                }
              />
            </div>

            {/* ITEMS */}
            <div className="border border-secondary/10 rounded-xl bg-white overflow-hidden">
              <div className="flex justify-between px-4 py-3 border-b bg-secondary/5">
                <p className="text-sm font-semibold text-secondary flex items-center gap-2">
                  <HiOutlineShoppingBag /> Items in this order
                </p>
                <p className="text-xs text-secondary/60">{order.items?.length} item(s)</p>
              </div>

              {order.items?.length ? (
                <div className="max-h-64 overflow-y-auto divide-y divide-secondary/10">
                  {order.items.map((item, index) => {
                    const lineTotal =
                      (item.price || 0) * (item.quantity || 0);

                    return (
                      <div key={item.productID + index} className="flex items-center gap-4 px-4 py-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary/5 flex items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-secondary/40">No image</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-secondary">{item.name}</p>
                          <p className="text-xs text-secondary/60">Product ID: {item.productID}</p>
                          <p className="text-xs text-secondary/60">
                            Qty: {item.quantity} | Unit: {formatCurrency(item.price)}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-secondary">
                          {formatCurrency(lineTotal)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-secondary/60">
                  No items found.
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-secondary/10 flex justify-between items-center gap-4">

            {/* Total */}
            <div>
              <p className="text-xs text-secondary/60 uppercase font-semibold">Total Amount</p>
              <p className="text-lg font-bold text-(--color-gold)">
                {formatCurrency(order.total ?? orderTotalFromItems)}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              {(order.notes !== notes || order.status !== status) && (
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    axios
                      .put(
                        import.meta.env.VITE_BACKEND_URL + `/orders/${order.orderId}`,
                        { status, notes },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => {
                        toast.success("Order updated successfully.");
                        window.location.reload();
                        setIsModalOpen(false);
                      })
                      .catch(() =>
                        toast.error("Failed to update order. Please try again.")
                      );
                  }}
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary/90 transition"
                >
                  Save Changes
                </button>
              )}

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary/90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* TRIGGER BUTTON */}
      <button
        className="bg-accent/70 hover:bg-accent px-3 py-2 rounded-lg text-white cursor-pointer text-sm font-medium shadow-sm flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <HiOutlineClipboardList /> View Info
      </button>
    </>
  );
}
