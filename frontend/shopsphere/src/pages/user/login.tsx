import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/SSLogo.png";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const justSignedUp = (location.state as { signedUp?: boolean })?.signedUp ?? false;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3011';
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            localStorage.setItem('accessToken', data.accessToken);
            window.dispatchEvent(new Event('storage')); // notify NavBar to update
            setSuccess('Logged in successfully!');
            navigate('/'); // navigate directly — don't check state, it's async
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
        }
    };

    return (
        <div className="m-20 justify-center items-center flex flex-col">
            <img src={Logo} alt="Logo" className="h-50 w-50" />

            {justSignedUp && (
                <div className="w-4/5 p-3 my-2 text-sm text-green-700 bg-green-100 rounded border border-green-300 text-center">
                    🎉 Account created successfully! Please log in to continue.
                </div>
            )}

            {error && (
                <div className="w-4/5 p-3 my-2 text-sm text-red-700 bg-red-100 rounded border border-red-300 text-center">
                    {error}
                </div>
            )}
            {success && (
                <div className="w-4/5 p-3 my-2 text-sm text-green-700 bg-green-100 rounded border border-green-300 text-center">
                    {success}
                </div>
            )}

            <form onSubmit={handleLogin} className="m-5 w-full max-h-lg flex flex-col justify-center items-center space-y-6">
                <input
                    type="email"
                    className="w-4/5 h-12 px-4 rounded bg-white text-black border border-gray-300 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:scale-[1.01] focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 focus:scale-[1.01] focus:outline-none"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-4/5 h-12 px-4 rounded bg-white text-black border border-gray-300 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:scale-[1.01] focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 focus:scale-[1.01] focus:outline-none"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-4/5 h-12 rounded bg-blue-800 text-white transition duration-500 ease-in-out hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
            <div className="flex flex-row justify-between items-center w-4/5 text-sm mt-2 font-medium">
                <a
                    href="#"
                    className="text-blue-700 hover:text-blue-500 hover:underline transition-all duration-300 ease-in-out hover:scale-105"
                >
                    Forgot Password?
                </a>
                <Link
                    to="/signup"
                    className="text-gray-600 hover:text-blue-700 hover:underline transition-all duration-300 ease-in-out hover:scale-105"
                >
                    Don't have an account? Sign Up!
                </Link>
                <Link
                    to="/sellerlogin"
                    className="text-gray-600 hover:text-blue-700 hover:underline transition-all duration-300 ease-in-out hover:scale-105"
                >
                    Already a seller? Login!
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;