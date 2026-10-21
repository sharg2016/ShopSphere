import { Star } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export interface Product {
    productId: string;
    name: string;
    category: string;
    price: number;
    brandName: string;
    image: string;
    rating: number;
    description: string;
    isAvailable: boolean;
}

export interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { isLoggedIn } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCart = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (product.isAvailable) {
            dispatch(addToCart(product));
        }
    };

    return (
        <div className="w-full flex-shrink-0 snap-start bg-white dark:bg-zinc-800 rounded-xl shadow-md border
        border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-lg transition-all 
        duration-300 transform hover:-translate-y-1"
            onClick={() => navigate(`/product/detail/${product.productId}`)}>
            {/* Image */}
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <img src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105
                    transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                </div>
            </div>
            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between">
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400
                uppercase tracking-wide">
                    {product.category}
                </p>
                <h3 className="font-semibold text-zinc-900 dark:text-white text-sm line-clamp-3 mt-1 h-10">
                    {product.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-900 dark:text-white">
                        ₹{product.price.toLocaleString()}
                    </span>
                    <div className="flex flex-row gap-3">
                        <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs
                        font-medium rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product/detail/${product.productId}`)
                            }
                            }
                        >
                            View Details
                        </button>
                        <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCart();
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
