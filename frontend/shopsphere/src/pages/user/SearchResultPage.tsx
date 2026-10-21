import { useSearchParams } from "react-router-dom";
import NavBar from "../../components/user/NavBar";
import SideBar from "../../components/user/SideBar";
import { useEffect, useState } from "react";
import type { Product } from "../../components/user/ProductCard";
import ProductCard from "../../components/user/ProductCard";


const SearchResultPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || "";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!query.trim()) return;
        setLoading(true);
        setProducts([]);
        setError("");
        fetch(`http://localhost:3011/products/search?q=${encodeURIComponent(query)}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [query]);

    return (
        <div className="h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 flex flex-col">
            <NavBar />
            <div className="flex flex-1 h-full overflow-hidden">
                <SideBar />
                <main className="flex-1 px-4 md:px-8 py-6 min-w-0 overflow-y-auto">
                    <div className="my-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            Search Result
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">
                            {query ? `Result for "${query}"` : "Enter something to search."}
                        </p>
                    </div>
                    {loading && (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                        </div>
                    )}
                    {error && (
                        <div className="my-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    {!loading && !error && products.length === 0 && query && (
                        <p className="text-center text-zinc-500 py-20 text-lg">
                            No Result found for "{query}".
                        </p>
                    )}

                    {!loading && products.length > 0 && (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid:cols-3 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <ProductCard product={product} key={product.productId} />
                            ))}
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default SearchResultPage;