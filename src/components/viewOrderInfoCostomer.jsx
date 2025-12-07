import { useState } from "react";
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

export default function ViewOrderInfoCostomer({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!order) return null;

  // ---------- Helpers ----------
  const formatDateTime = (value) =>
    value ? new Date(value).toLocaleString() : "-";

  const formatCurrency = (value) =>
    value == null ? "-" : `Rs. ${Number(value).toFixed(2)}`;

  const getStatusBadgeClasses = (status) => {
    const s = status?.toLowerCase() || "";

    return {
      completed: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      paid: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
      processing: "bg-blue-100 text-blue-800 border border-blue-200",
    }[s] || "bg-yellow-100 text-yellow-800 border border-yellow-200";
  };

  const orderTotalFromItems =
    Array.isArray(order.items) && order.items.length
      ? order.items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        )
      : Number(order.total) || 0;

  // Actual final total
  const finalTotal = order.total ?? orderTotalFromItems;

  return (
    <>
      {/* ==================== MODAL ==================== */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        className="w-full max-w-3xl mx-4 bg-primary rounded-2xl shadow-2xl outline-none"
      >
        <div className="flex flex-col h-full max-h-[90vh]">

          {/* ---------- HEADER ---------- */}
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

          {/* ---------- BODY ---------- */}
          <div className="px-6 py-4 space-y-6 overflow-y-auto">
            {/* ---------- SUMMARY SECTION ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LEFT SECTION */}
              <div className="space-y-2">

                {/* Order ID */}
                <div>
                  <p className="text-xs text-secondary/60 uppercase font-semibold">
                    Order ID
                  </p>
                  <p className="text-sm font-semibold text-secondary">
                    {order.orderId}
                  </p>
                </div>

                {/* Customer Name */}
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">
                      Customer Name
                    </p>
                    <p className="text-sm text-secondary">{order.name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <HiOutlineMail className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Email</p>
                    <p className="text-sm text-secondary break-all">{order.email}</p>
                  </div>
                </div>

                {/* Phone */}
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

              {/* RIGHT SECTION */}
              <div className="space-y-2">

                {/* Date */}
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">
                      Order Date & Time
                    </p>
                    <p className="text-sm text-secondary">
                      {formatDateTime(order.date)}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <MdOutlinePendingActions className="text-secondary/60" />
                  <div>
                    <p className="text-xs text-secondary/60 uppercase font-semibold">Status</p>

                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(order.status)}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        disabled
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
                  <p className="text-xs text-secondary/60 uppercase font-semibold">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-yellow-600">
                    {formatCurrency(finalTotal)}
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- ADDRESS ---------- */}
            <div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
              <p className="text-xs text-secondary/60 uppercase font-semibold mb-1 flex items-center gap-2">
                <HiOutlineHome />
                Delivery Address
              </p>
              <p className="text-sm text-secondary whitespace-pre-line">
                {order.address ?? "No address provided."}
              </p>
            </div>

            {/* ---------- NOTES ---------- */}
            <div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
              <p className="text-xs text-secondary/60 uppercase font-semibold mb-1 flex items-center gap-2">
                <FiEdit3 />
                Additional Notes
              </p>
              <textarea
                className="w-full text-sm text-secondary outline-none resize-none"
                value={order.notes ?? ""}
                disabled
              />
            </div>

            {/* ---------- ITEMS LIST ---------- */}
            <div className="border border-secondary/10 rounded-xl bg-white overflow-hidden">

              {/* Header */}
              <div className="flex justify-between px-4 py-3 border-b bg-secondary/5">
                <p className="text-sm font-semibold text-secondary flex items-center gap-2">
                  <HiOutlineShoppingBag /> Items in this order
                </p>
                <p className="text-xs text-secondary/60">
                  {order.items?.length || 0} item(s)
                </p>
              </div>

              {/* Items List */}
              {order.items?.length ? (
                <div className="max-h-64 overflow-y-auto divide-y divide-secondary/10">
                  {order.items.map((item, index) => {
                    const lineTotal = (item.price || 0) * (item.quantity || 0);

                    return (
                      <div
                        key={item.productID + index}
                        className="flex items-center gap-4 px-4 py-3"
                      >
                        {/* Image */}
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

                        {/* Info */}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-secondary">{item.name}</p>
                          <p className="text-xs text-secondary/60">
                            Product ID: {item.productID}
                          </p>
                          <p className="text-xs text-secondary/60">
                            Qty: {item.quantity} | Unit: {formatCurrency(item.price)}
                          </p>
                        </div>

                        {/* Total */}
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

          {/* ---------- FOOTER ---------- */}
          <div className="px-6 py-4 border-t border-secondary/10 flex justify-between items-center">

            <div>
              <p className="text-xs text-secondary/60 uppercase font-semibold">
                Total Amount
              </p>
              <p className="text-lg font-bold text-yellow-600">
                {formatCurrency(finalTotal)}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* ---------- TRIGGER BUTTON ---------- */}
      <button
        className="bg-accent/70 hover:bg-accent px-3 py-2 rounded-lg text-white cursor-pointer text-sm font-medium shadow-sm flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <HiOutlineClipboardList /> View Info
      </button>
    </>
  );
}
