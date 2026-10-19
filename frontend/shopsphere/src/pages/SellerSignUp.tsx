import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Logo from "../assets/SSLogo.png";


const SellerSignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3011';
            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    password,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            // Redirect to login — let the user log in explicitly after signup
            // so their session is tied to a real DB-verified credential
            navigate('/login', { state: { signedUp: true } });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col justify-center items-center mt-5 pb-10">
                <img src={Logo} alt="Logo" className="h-50 w-50" />

                {error && (
                    <div className="w-1/2 p-3 my-2 text-sm text-red-700 bg-red-100 rounded border border-red-300 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="w-1/2 p-3 my-2 text-sm text-green-700 bg-green-100 rounded border border-green-300 text-center">
                        {success}
                    </div>
                )}



                <form onSubmit={handleSignUp} className="flex flex-col mt-5 w-full justify-center items-center space-y-3">
                    <input
                        type="text"
                        placeholder="Enter Your Shop Name"
                        className="w-1/2 h-10 bg-white rounded px-4 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-1/2 h-10 bg-white rounded px-4 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Enter Your Mobile Number - 12345 67890"
                        className="w-1/2 h-10 bg-white rounded px-4 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />

                    <div className="flex flex-row justify-between gap-2 ">
                        <address>
                            <input
                                type="text"
                                placeholder="Enter Your Address"
                                className="h-10 bg-white rounded px-2.5 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </address>

                        <input
                            type="text"
                            placeholder="Enter Your City"
                            className="h-10 bg-white rounded px-2.5 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">

                        <input
                            type="text"
                            placeholder="Enter Your State"
                            className="h-10 bg-white rounded px-2.5 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Your Pincode"
                            className="h-10 bg-white rounded px-2.5 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                        />


                    </div>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="w-1/2 h-10 bg-white rounded px-4 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Your Password"
                        className="w-1/2 h-10 bg-white rounded px-4 text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <Link
                        to="/login"
                        className="text-blue-700 hover:text-blue-500 hover:underline transition-all duration-300 ease-in-out hover:scale-105 mt-2"
                    >
                        Already have an Seller account? Login!
                    </Link>


                </form>
            </div>
        </div>
    );
};

export default SellerSignUp;