import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeFromCart, updateQuantity } from "../store/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state: RootState) => state.cart.items);

    const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity
    }, 0);

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const handleQuantityChange = (productId: string, delta: number, current: number) => {
        const newQuantity = current + delta;
        if (newQuantity <= 0) {
            dispatch(removeFromCart(productId))
        }
        else {
            dispatch(updateQuantity({ productId, quantity: newQuantity }));
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center gap-6 p-8">
                <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
                    Your cart is empty.
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-xs">
                    Looks Like You have not added anything yet. Start exploring our Product!
                </p>
                <Link to='/'
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md">
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    </button>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Shopping Cart
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {items.length} {items.length === 1 ? "item" : "items"}
                    </p>
                </div>
                <button className="px-4 py-2 mb-6 rounded-lg bg-red-500 dark:bg-red-900 hover:bg-red-600 dark:hover:bg-red-800 text-sm text-white  font-medium transition-colors"
                    onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {items.map((item) => (
                        <div key={item.productId}
                            className="flex gap-4 bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 cursor-pointer"
                                onClick={() => navigate(`/product/detail/${item.productId}`)}>
                                <img src={item.image} alt={item.name}
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                                    {item.category}
                                </p>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5 line-clamp-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    onClick={() => navigate(`/product/detail/${item.productId}`)}>
                                    {item.name}
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {item.brandName}
                                </p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-base font-bold text-zinc-900 dark:text-white">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-700 hover:bg-purple-100 dark:hover:bg-purple-900/40 flex items-center justify-center transition-colors"
                                            onClick={() => handleQuantityChange(item.productId, -1, item.quantity)}>
                                            <Minus className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc300" />
                                        </button>
                                        <span className="w-6 text-center text-sm font-semibold text-zinc-800 dark:text-white">
                                            {item.quantity}
                                        </span>
                                        <button className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-700 hover:bg-purple-100 dark:hover:bg-purple-900/40 flex items-center justify-center transition-colors"
                                            onClick={() => handleQuantityChange(item.productId, 1, item.quantity)}>
                                            <Plus className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc300" />
                                        </button>
                                        <button className="w-7 h-7 ml-1 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 flex item-center justify-center transition-colors"
                                            onClick={() => dispatch(removeFromCart(item.productId))}>
                                            <Trash2 className="w-3.5 h-3.5 text-red-500 flex item-center" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                            Order Summary
                        </h2>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                <span>
                                    Subtotal ({items.reduce((s, i) =>
                                        s + i.quantity, 0)}
                                    , items)
                                </span>
                                <span>
                                    ₹{subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                <span>GST (18%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                <span>Shipping</span>
                                <span className="text-green font-medium">
                                    Free
                                </span>
                            </div>
                            <div className="border-t border-zinc-900 dark:border-zinc-700 pt-3 flex-justify-between font-bold text-zinc-900 dark:text-white text-base">
                                <span>Total</span>
                                <span>₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                        <button id="cart-checkout-btn"
                            className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-md"
                            onClick={() => navigate("/checkout")}>
                            Proceed to Checkout
                        </button>

                        <Link to="/"
                            className="mt-3 w-full py-2.5 flex item-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart; 