import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loder";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editReview, setEditReview] = useState(null);
  const [viewReview, setViewReview] = useState(null);

  // ---------------------------
  // LOAD ALL REVIEWS
  // ---------------------------
  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/all`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setReviews(res.data.reviews || []);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // ---------------------------
  // FILTERS + SEARCH
  // ---------------------------
  const filteredReviews = reviews
    .filter((r) => {
      if (statusFilter === "hidden") return r.hidden === true;
      if (statusFilter === "visible") return !r.hidden && !r.deleted;
      if (statusFilter === "deleted") return r.deleted === true;
      return true;
    })
    .filter(
      (r) =>
        r.productId?.toLowerCase().includes(search.toLowerCase()) ||
        r.name?.toLowerCase().includes(search.toLowerCase())
    );

  // ---------------------------
  // ADMIN ACTIONS
  // ---------------------------

  const toggleHidden = async (id, hideValue) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/admin/${id}/toggle-hidden`,
        { hidden: hideValue },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      toast.success(hideValue ? "Review Hidden" : "Review Visible");
      loadReviews();
    } catch (err) {
      toast.error("Failed to update visibility");
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/admin/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      toast.success("Review Deleted");
      loadReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  const restoreReview = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/admin/${id}/restore`,
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      toast.success("Review Restored");
      loadReviews();
    } catch {
      toast.error("Restore failed");
    }
  };

  const saveEdit = async () => {
    try {
      const { _id, title, content, rating } = editReview;

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/admin/${_id}`,
        { title, content, rating },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      toast.success("Updated");
      setEditReview(null);
      loadReviews();
    } catch {
      toast.error("Update failed");
    }
  };

  // ---------------------------
  // RENDER UI
  // ---------------------------
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Review Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Reviews</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="deleted">Deleted</option>
        </select>

        <input
          placeholder="Search Product or User"
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center"><Loader /></div>
      ) : filteredReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto shadow bg-white rounded-xl">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b bg-accent text-white">
                <th className="p-3">Product</th>
                <th className="p-3">User</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3">Info</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Restore</th>
                <th className="p-3">Hide</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((r) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{r.productId}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.rating} ⭐</td>

                  <td className="p-3">
                    {r.deleted ? (
                      <span className="text-red-600 font-semibold">Deleted</span>
                    ) : r.hidden ? (
                      <span className="text-yellow-600 font-semibold">Hidden</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Visible</span>
                    )}
                  </td>

                  {/* INFO */}
                  <td className="p-3">
                    <button
                      className="px-3 py-1 bg-gray-600 text-white rounded"
                      onClick={() => setViewReview(r)}
                    >
                      View
                    </button>
                  </td>

                  {/* EDIT */}
                  <td className="p-3">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => setEditReview(r)}
                    >
                      Edit
                    </button>
                  </td>

                  {/* RESTORE */}
                  <td className="p-3">
                    {r.deleted ? (
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded"
                        onClick={() => restoreReview(r._id)}
                      >
                        Restore
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* HIDE / UNHIDE */}
                  <td className="p-3">
                    {!r.deleted && (
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          r.hidden ? "bg-green-600" : "bg-yellow-600"
                        }`}
                        onClick={() => toggleHidden(r._id, !r.hidden)}
                      >
                        {r.hidden ? "Unhide" : "Hide"}
                      </button>
                    )}
                  </td>

                  {/* DELETE */}
                  <td className="p-3">
                    {!r.deleted && (
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => deleteReview(r._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewReview && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">Review Information</h2>

            <div className="space-y-2 text-sm">
              <p><b>ID:</b> {viewReview._id}</p>
              <p><b>Product:</b> {viewReview.productId}</p>
              <p><b>User:</b> {viewReview.name}</p>
              <p><b>Rating:</b> {viewReview.rating} ⭐</p>
              <p><b>Title:</b> {viewReview.title}</p>
              <p><b>Content:</b> {viewReview.content}</p>
              <p><b>Helpful:</b> {viewReview.helpful}</p>
              <p><b>Not Helpful:</b> {viewReview.notHelpful}</p>
              <p><b>Status:</b> 
                {viewReview.deleted ? "Deleted" : viewReview.hidden ? "Hidden" : "Visible"}
              </p>
              <p><b>Created:</b> {new Date(viewReview.createdAt).toLocaleString()}</p>
              <p><b>Updated:</b> {new Date(viewReview.updatedAt).toLocaleString()}</p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded"
                onClick={() => setViewReview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editReview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>

            <label className="font-semibold">Title</label>
            <input
              className="border w-full p-2 rounded mb-3"
              value={editReview.title}
              onChange={(e) =>
                setEditReview({ ...editReview, title: e.target.value })
              }
            />

            <label className="font-semibold">Content</label>
            <textarea
              className="border w-full p-2 rounded mb-3 h-24"
              value={editReview.content}
              onChange={(e) =>
                setEditReview({ ...editReview, content: e.target.value })
              }
            />

            <label className="font-semibold">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              className="border w-full p-2 rounded mb-4"
              value={editReview.rating}
              onChange={(e) =>
                setEditReview({
                  ...editReview,
                  rating: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditReview(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
