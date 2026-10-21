import { useEffect, useState } from "react";
import NavBar from "../../components/user/NavBar"
import type { Product } from "../../components/user/ProductCard";
import SideBar from "../../components/user/SideBar";
import ProductRow from "../../components/user/ProductRow";

interface CategoryGroup {
    category: string;
    products: Product[];
}

const Home: React.FC = () => {

    const [categoryGroup, setCategoryGroup] = useState<CategoryGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        // Backend runs on port 3011 as specified in backend/.env (or fallback 3000)
        const backendUrl = 'http://localhost:3011/products/top-rated';
        fetch(backendUrl)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategoryGroup(data);
                } else {
                    setCategoryGroup([]);
                }
                setLoading(false);
            }).catch((err) => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 flex flex-col">
            <NavBar />
            <div className="flex flex-1 h-full">
                <SideBar />
                <main className="flex-1 px-4 md:px-8 py-6 min-w-0 overflow-x-hidden">
                    <div className="my-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            Top Rated Products
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">
                            Explore Highest Rated Electronics by category
                        </p>
                    </div>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                        </div>
                    ) : (
                        categoryGroup.map((group) => (
                            <ProductRow
                                key={group.category}
                                title={`Top Rated ${group.category}s`}
                                products={group.products}
                                category={group.category}
                            />
                        ))
                    )}
                </main>
            </div>
        </div>
    )
}

export default Home;