// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "../components/loder";
// import ViewOrderInfoCostomer from "../components/viewOrderInfoCostomer";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (!loaded) {
//       const token = localStorage.getItem("token");

//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setOrders(response.data);
//           setLoaded(true);
//         })
//         .catch((error) => {
//           console.error("Error fetching orders:", error);
//           setLoaded(true);
//         });
//     }
//   }, [loaded]);

//   return (
//     <div className="w-full flex justify-center p-10 bg-linear-to-b from-primary to-white text-secondary min-h-screen">
//       {loaded ? (
//         <table className="w-full max-w-7xl table-auto border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl bg-white/80">
//           <thead className="sticky top-0 z-10">
//             <tr className="bg-accent text-primary">
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Order ID
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Email
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Name
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Date
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Shipping
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Total
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-secondary/10">
//             {orders.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="8"
//                   className="px-4 py-10 text-center text-secondary/60"
//                 >
//                   No orders found
//                 </td>
//               </tr>
//             ) : (
//               orders.map((order) => (
//                 <tr
//                   key={order.orderId}
//                   className="odd:bg-primary/50 even:bg-white hover:bg-primary/80 transition-colors"
//                 >
//                   <td className="px-4 py-3 text-sm font-medium">
//                     {order.orderId}
//                   </td>

//                   <td className="px-4 py-3 text-sm">{order.email}</td>

//                   <td className="px-4 py-3 text-sm">{order.name}</td>

//                   <td className="px-4 py-3 text-sm">
//                     {new Date(order.date).toLocaleDateString()}
//                   </td>

//                   <td className="px-4 py-3 text-sm">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         order.status === "completed"
//                           ? "bg-green-100 text-green-800"
//                           : order.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : order.status === "cancelled"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>

//                   {/* SHIPPING */}
//                   <td className="px-4 py-3 text-sm">
//                     {order.freeShippingApplied ? (
//                       <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
//                         FREE
//                       </span>
//                     ) : (
//                       <span className="text-secondary/80">
//                         LKR {order.shippingFee?.toFixed(2) || "0.00"}
//                       </span>
//                     )}
//                   </td>

//                   {/* TOTAL */}
//                   <td className="px-4 py-3 text-sm font-semibold">
//                     LKR {order.total.toFixed(2)}
//                   </td>

//                   <td className="px-4 py-3">
//                     <ViewOrderInfoCostomer order={order} />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loder";
import ViewOrderInfoCostomer from "../components/viewOrderInfoCostomer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoaded(true);
        });
    }
  }, [loaded]);
  return (
    <div className="w-full flex justify-center p-4 lg:p-10 bg-linear-to-b from-primary to-white text-secondary min-h-screen">
      {loaded ? (
        <div className="w-full max-w-7xl overflow-x-auto rounded-2xl shadow-xl bg-white/80">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr className="bg-accent text-primary">
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase">
                  Order ID
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase hidden lg:table-cell">
                  Email
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase">
                  Name
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase hidden lg:table-cell">
                  Date
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase">
                  Status
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase hidden lg:table-cell">
                  Shipping
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase">
                  Total
                </th>
                <th className="px-2 py-3 lg:px-4 text-left text-xs font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-10 text-center text-secondary/60"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="odd:bg-primary/50 even:bg-white hover:bg-primary/80 transition-colors"
                  >
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm font-medium">
                      {order.orderId}
                    </td>
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm hidden lg:table-cell">
                      {order.email}
                    </td>
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm">
                      {order.name}
                    </td>
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm hidden lg:table-cell">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    {/* SHIPPING */}
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm hidden lg:table-cell">
                      {order.freeShippingApplied ? (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          FREE
                        </span>
                      ) : (
                        <span className="text-secondary/80">
                          LKR {order.shippingFee?.toFixed(2) || "0.00"}
                        </span>
                      )}
                    </td>
                    {/* TOTAL */}
                    <td className="px-2 py-3 lg:px-4 text-xs lg:text-sm font-semibold">
                      LKR {order.total.toFixed(2)}
                    </td>
                    <td className="px-2 py-3 lg:px-4">
                      <ViewOrderInfoCostomer order={order} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}