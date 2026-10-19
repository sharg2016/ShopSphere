import { useRef } from "react";
import type { Product } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

interface ProductRowProp {
    title: string;
    products: Product[];
    category: string;
}


const ProductRow: React.FC<ProductRowProp> = ({ title, products, category }) => {
    const navigate = useNavigate();
    const rowRef = useRef<HTMLDivElement>(null);
    const handleScroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            // Scroll by full visible width (4 cards on desktop) + 16px gap
            const scrollAmount = clientWidth + 16;

            rowRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className="my-8 relative px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-xs text-zinc-500">
                        Top 10 Rated Items (Scroll to view more)
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800
                    dark:text-white transition-all shadow-sm active:scale-95"
                        aria-label="Scroll left"
                        onClick={() => handleScroll('left')}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => navigate(`/product/${category}`)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors"
                        aria-label="View all items in this category"
                    >
                        View More
                    </button>
                    <button className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700
                    text-zinc-800 dark:text-white transition-all shadow-sm active:scale-95"
                        aria-label="Scroll right"
                        onClick={() => handleScroll('right')}>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div ref={rowRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-2 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductRow;