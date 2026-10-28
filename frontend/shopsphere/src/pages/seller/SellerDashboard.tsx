import { AlertCircle, AlertTriangle, CheckCircle2, Clock, IndianRupee, Package, RefreshCw, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";

interface DashBoardData {
    kpi: {
        totalSales: number;
        totalOrder: number;
        totalProducts: number;
        lowStockCount: number;
    };
    revenueTrend: {
        day: string;
        date: string;
        revenue: number;
        orders: number;
    }[];

    topProducts: {
        productId: string;
        name: string;
        sales: number;
        revenue: number;
    }[];

    recentOrders: {
        id: string;
        customer: string;
        date: string;
        itemsCount: number;
        amount: number;
        status: string;
    }[];
}

export const SellerDashboard: React.FC = () => {
    const [data, setData] = useState<DashBoardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");
            const token = localStorage.getItem('accessToken');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3011';

            const res = await fetch(`${apiUrl}/seller/dashboard`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Authorization expired. Please login again.");
                }
                throw new Error('failed to fetch dashboard data');
            }

            const result = await res.json();
            setData(result);
        }
        catch (err: any) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                    </span>
                )
            case "Shipping":
            case "Out for Delivery":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                        <Truck className="w-3.5 h-3.5" /> {status}
                    </span>
                );
            case "Packed":
            case "Processing":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                        <Clock className="w-3.5 h-3.5" /> {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                        {status}
                    </span>
                );
        }
    }

    if (loading) {
        return (
            <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[70vh] space-y-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-zinc-600 dark:text-zinc-400">Loading Dashboard...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex-1 p-8">
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-5 flex item-center justify-between">
                    <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-semibold">
                            {error}
                        </p>
                    </div>
                    <button className="px-4 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const kpi = data?.kpi || { totalSales: 0, totalOrder: 0, totalProducts: 0, lowStockCount: 0 };
    const revenueTrend = data?.revenueTrend || [];
    const topProducts = data?.topProducts || [];
    const recentOrders = data?.recentOrders || [];

    const maxRevenue = Math.max(...revenueTrend.map((d) => d.revenue), 100);

    return (
        <div className="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900 min-h-screen space-y-6 overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Seller Dashboard
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400"> Real time Performance summary of your store</p>
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-750 transition"
                    onClick={fetchDashboardData}>
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                </button>
            </div>

            <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm hover:shadow-transition">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400"> Total Sales</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600dark:text-emerald-400 flex items-center justify-center">
                            <IndianRupee className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            ₹{kpi.totalSales.toLocaleString("en-IN")}
                        </h2>
                        <p className="mt-1 text-xs text-zinc-400">
                            Gross revenue from your products
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm hover:shadow transition">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400"> Total Orders</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{kpi.totalOrder}</h2>
                        <p className="mt-1 text-xs text-zinc-400">
                            Orders placed by customers
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm hover:shadow transition">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Listed Products
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Package className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {kpi.totalProducts}
                        </h2>
                        <p className="mt-1 text-xs text-zinc-400">
                            Active Catalog items
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/50 shadow-sm hover:shadow transition" >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                            Low Stock Alert
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {kpi.lowStockCount} Items
                        </h2>
                        <p className="mt-1 text-xs text-amber-700/80 dark:text-amber-400/80 font-medium">Require restock attention</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200/80  dark:border-zinc-700/80 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                Last 7 days Revenue
                            </h3>
                            <p className="text-xs text-zinc-500">
                                Daily earning summary
                            </p>
                        </div>
                    </div>

                    {revenueTrend.length === 0 || revenueTrend.every(d => d.revenue === 0) ? (
                        <div className="h-56 flex items-center justify-center text-sm text-zinc-400">
                            No revenue recorded in last 7
                        </div>
                    ) : (
                        <div className="h-56 flex items-end gap-3 sm:gap-6 pt-6 px-2 border-b border-zinc-100 dark:border-zinc-700/50">
                            {revenueTrend.map((item, index) => {
                                const heightPercent = maxRevenue > 0 ? Math.round((item.revenue / maxRevenue) * 100) : 0;
                                return (
                                    <div key={index}
                                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100  transaction-opacity bg-zinc-900 text-white text-[11px] font-medium py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-lg z-10">
                                            ₹{item.revenue.toLocaleString("en-In")}
                                            ({item.orders} orders)
                                        </div>
                                        <div className="w-full max-w-[42px] bg-blue-500 hover-bg-blue-600 rounded-t-lg transition-all duration-300"
                                            style={{ height: `${Math.max(heightPercent, 4)}%` }} />
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-2">{item.day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )
                    }
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                            Top Selling Products
                        </h3>
                        <p className="text-xs text-zinc-500 mb-4">
                            Highest volume items
                        </p>
                        {topProducts.length === 0 ? (
                            <p className="text-sm text-zinc-400 py-6 text-center">No sales data available yet</p>
                        ) : (
                            <div className="space-y-3">
                                {topProducts.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-750 transition">
                                        <div className="space-y-0.5 pr-2">
                                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{p.name}</p>
                                            <p className="text-[11px] text-zinc-500">
                                                {p.sales} units sold • ₹{p.revenue.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Recent Orders</h3>
                            <p className="text-xs text-zinc-500">Latest Orders placed for your Products</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {recentOrders.length === 0 ? (
                            <p className="text-sm text-zinc-400 py-8 text-center">No orders yet</p>
                        ) : (
                            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
                                <thead className="bg-zinc-50 dark:bg-zinc-750 text-xs font-semibold uppercase text-zinc-500 border-b border-zinc-200 dark:border-zinc-700">
                                    <tr>
                                        <th className="px-5 py-3.5"> Order Id</th>
                                        <th className="px-5 py-3.5"> Customer</th>
                                        <th className="px-5 py-3.5"> Date</th>
                                        <th className="px-5 py-3.5"> Your Items</th>
                                        <th className="px-5 py-3.5"> Order Value</th>
                                        <th className="px-5 py-3.5"> Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-750/50 transition">
                                            <td className="px-5 py-3.5 font-semibold text-zinc-900 dark:text-zinc-100">{order.id}</td>
                                            <td className="px-5 py-3.5">{order.customer}</td>
                                            <td className="px-5 py-3.5 text-xs text-zinc-500"> {order.date}</td>
                                            <td className="px-5 py-3.5"> {order.itemsCount}</td>
                                            <td className="px-5 py-3.5 font-semibold text-zinc-900 dark:text-zinc-100">₹{order.amount.toLocaleString("en-IN")}</td>
                                            <td className="px-5 py-3.5">{getStatusBadge(order.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SellerDashboard;