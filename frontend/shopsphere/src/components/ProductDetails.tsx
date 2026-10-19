import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { Product } from "./ProductCard";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { ChevronLeft, Package, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { useAuth } from "../hooks/useAuth";

const ProductDetails = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        fetch(`http://localhost:3011/products/detail/${productId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Product not Found');
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            }).catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [productId]);

    const handleCart = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        if (product.isAvailable) {
            dispatch(addToCart(product));
        }
    }

    return (
        <div className="h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 flex flex-col">
            <NavBar />
            <div className="flex flex-1 h-full">
                <SideBar />
                <main className="flex-1 h-full overflow-y-auto px-6 md:px-12 py-8 min-w-8">
                    <button onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6">
                        <ChevronLeft className="w-4 h-4" /> Back to Products
                    </button>
                    {loading && (
                        <div className="flex justify-center items-center py-40 animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"> </div>
                    )}
                    {error && (
                        <div className="text-center py-40 text-zinc-500">
                            <p className="text-xl font-semibold" > {error}</p>
                        </div>
                    )}
                    {product && (
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="rounded-2xl overflow-hidden shadow-xl bg-zinc-100 dark:bg-zinc-800 aspect-square">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-between gap-6">
                                    <div>
                                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                                            {product.category}
                                        </p>
                                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                                            {product.name}
                                        </h1>
                                        <div className="flex items-center gap-2 mt-3">
                                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                            <span className="text-lg font-bold text-zinc-800 dark:text-white">
                                                {product.rating.toFixed(1)}
                                            </span>
                                            <span className="text-sm text-zinc-400"> / 5.0 </span>
                                        </div>
                                        <div className="mt-6">
                                            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                                                Description
                                            </h2>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4">
                                            <Package className="w-4 h-4 text-green-500" />
                                            <span className={`text-sm font-medium ${product.isAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                                                {product.isAvailable ? 'In Stock' : 'Out Of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 pb-6 flex flex-row items-center justify-between">
                                        <div>
                                            <p className="text-xs text-zinc-400 uppercase tracking-wide">
                                                Price
                                            </p>
                                            <p className="text-4xl font-extrabold text-zinc-900 leading-tight dark:text-white">
                                                ₹{product.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <button
                                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
                                            onClick={handleCart}>
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );

}
export default ProductDetails;