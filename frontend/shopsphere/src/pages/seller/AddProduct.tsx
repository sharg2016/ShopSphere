// frontend/shopsphere/src/pages/seller/AddProduct.tsx
import { useState } from 'react';
import SellerNavBar from '../../components/seller/SellerNavBar';
import SellerSideBar from '../../components/seller/SellerSideBar';

const CATEGORIES = ['Camera', 'Laptop', 'SmartPhone', 'TV', 'Speaker', 'Tablet', 'Washing-Machine'];

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: CATEGORIES[0],
        brandName: '',
        price: '',
        image: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const token = localStorage.getItem('accessToken');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3011';

            const res = await fetch(`${apiUrl}/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Seller ka JWT token
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to add product');

            setMessage('🎉 Item added successfully!');
            setFormData({ name: '', category: CATEGORIES[0], brandName: '', price: '', image: '', description: '' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
            <SellerNavBar />
            <div className="flex flex-1">
                <SellerSideBar />

                <main className="flex-1 p-8 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Add New Product</h1>

                    {message && <div className="p-3 mb-4 bg-green-100 text-green-700 rounded-lg">{message}</div>}
                    {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow">
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                required
                                type="text"
                                className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Sony Alpha A7 IV Camera"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Brand Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                    value={formData.brandName}
                                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                    placeholder="e.g. Sony"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Price (₹)</label>
                            <input
                                required
                                type="number"
                                min="1"
                                className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="e.g. 199999"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                required
                                type="url"
                                className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full p-2 border rounded-lg dark:bg-zinc-700"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Key features, specifications, warranty..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold transition"
                        >
                            {loading ? 'Adding Product...' : 'Publish Product'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default AddProduct;
