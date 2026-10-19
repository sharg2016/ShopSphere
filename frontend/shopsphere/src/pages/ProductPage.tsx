import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import type { Product } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import FilterSideBar from "../components/FilterSideBar";

const ProductPage: React.FC = () => {
    const { category = "" } = useParams<{ category: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');

    const [selectedSort, setSelectedSort] = useState("");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const availableBrands = useMemo(() => {
        const allBrands = products.map(p => p.brandName);
        return [...new Set(allBrands)];
    }, [products]);

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand)
            ? prev.filter(b => b !== brand)
            : [...prev, brand]
        );
    };

    useEffect(() => {
        if (!category) return;
        setIsLoading(true);
        setProducts([]);
        setError('');
        const url = `http://localhost:3011/products/${category}`;
        console.log('[ProductPage] Fetching:', url);
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                console.log('[ProductPage] Got data:', data?.length ?? data);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('[ProductPage] Fetch error:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [category]);

    const sortedProducts = useMemo(() => {

        const brandFiltered = selectedBrands.length === 0
            ? products
            : products.filter(p => selectedBrands.includes(p.brandName));

        const copy = [...brandFiltered];

        if (selectedSort === "price_asc") {
            return copy.sort((a, b) => a.price - b.price);
        }

        if (selectedSort === "price_desc") {
            return copy.sort((a, b) => b.price - a.price);
        }

        if (selectedSort === "top_rated") {
            return copy.sort((a, b) => b.rating - a.rating);
        }
        return copy;
    }, [products, selectedSort, selectedBrands])

    return (
        <div className="h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 flex flex-col">
            <NavBar />
            <div className="flex flex-1 h-full overflow-hidden">
                <FilterSideBar selectedSort={selectedSort} onSortChange={setSelectedSort} availableBrands={availableBrands} selectedBrands={selectedBrands} onBrandToggle={handleBrandToggle} />
                <main className="flex-1 px-4 md:px-8 py-6 min-w-0 overflow-y-auto">
                    <div className="my-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {category}
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">
                            Discover top-rated {category.toLowerCase()} at the best prices.
                        </p>

                    </div>

                    {error && (
                        <div className="my-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                        </div>
                    ) : products.length === 0 && !error ? (
                        <p className="text-center text-zinc-500 py-20 text-lg">
                            No products found for "{category}".
                        </p>
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {sortedProducts.map((product) => (
                                <ProductCard product={product} key={product.productId} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ProductPage;

