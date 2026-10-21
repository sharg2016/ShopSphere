import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../components/user/NavBar";


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:3011/orders/my-orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res.ok) {
                    if (res.status === 401) {
                        navigate('/login');
                        return;
                    }
                    throw new Error(`Failed to fetch orders: ${res.status}`)
                }
                const data = await res.json();
                setOrders(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'something went wrong');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);



    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    My Orders
                </h1>
                {
                    loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-100 text-red-700 rounded-lg" > {error} </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                            <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
                                No Orders Found
                            </p>
                            <p className="text-sm text-zinc-400 mt-1 mb-6">
                                Looks like you haven't placed any order yet.
                            </p>
                            <Link to='/' className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.orderId}
                                    className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-700 pb-3 mb-4">
                                        <div>
                                            <p className=" text-xs text-zinc-400"> OrderId</p>
                                            <p className="font-semibold text-sm"> {order.orderId}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                                {order.status}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mb-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md bg-zinc-100" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate"> {item.name}</p>
                                                    <p className="text-xs text-zinc-400">QTY: {item.quantity} x Rs:{item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-700">
                                        <p className="text-xs text-zinc-400">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                                        </p>
                                        <p className="text-base font-bold">
                                            Total : <span className="text-purple-600 dark:text-purple-400"> Rs.{(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default MyOrders;