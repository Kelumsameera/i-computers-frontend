import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loder";
import ViewOrderInfoCostomer from "../components/viewOrderInfoCostomer";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			// Use session state instead of localStorage for token
			const token = localStorage.getItem("token");
			
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((response) => {
					console.log(response.data);
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
		<div className="w-full flex justify-center p-10 relative bg-linear-to-b from-primary to-white text-secondary min-h-screen">
			{loaded ? (
				<table className="w-full max-w-7xl table-auto border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl bg-white/70">
					<thead className="sticky top-0">
						<tr className="bg-accent text-primary/95">
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Customer email
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Customer name
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Date
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Status
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Total Amount
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-secondary/10">
						{orders.length === 0 ? (
							<tr>
								<td colSpan="7" className="px-4 py-8 text-center text-secondary/70">
									No orders found
								</td>
							</tr>
						) : (
							orders.map((order, index) => (
								<tr
									key={order.orderId || index}
									className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
								>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{order.orderId}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{order.email}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{order.name}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{new Date(order.date).toLocaleDateString()}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										<span className={`px-2 py-1 rounded-full text-xs ${
											order.status === 'completed' ? 'bg-green-100 text-green-800' :
											order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
											order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
											'bg-gray-100 text-gray-800'
										}`}>
											{order.status}
										</span>
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										LKR. {order.total.toFixed(2)}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										<ViewOrderInfoCostomer order={order} />
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			) : (
				<Loader />
			)}
		</div>
	);
}