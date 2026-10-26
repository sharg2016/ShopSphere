import { AlertCircle, CheckCircle2, Clock, RefreshCw, Truck } from "lucide-react";
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
                    Autorization: `Bearer ${token}`,
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

    const addRevenue = Math.max(...revenueTrend.map((d) => d.revenue), 100);

    return (
        <div className="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900 min-h-screen space-y-6 overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Seller Dashboard
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400"> Real time Performance summary of your store</p>
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-750 transition">
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                </button>
            </div>
        </div>
    )
}