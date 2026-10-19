import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/SSLogo.png";
import { User, LogOut, ChevronDown, Search, ShoppingCart } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import type { RootState } from "../store/store";


const getUsername = (): string => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username ?? payload.email ?? payload.sub ?? '';
    } catch {
        return '';
    }
};

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [query, setQuery] = useState('');
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <nav className="flex flex-row w-full h-14 bg-blue-800 px-6 items-center justify-between shadow-md shrink-0 z-30">
            {/* Left — Logo + Nav Links */}
            <div className="flex flex-row items-center space-x-8">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
                </Link>

            </div>

            <form onSubmit={handleSearch}
                className="flex items-center w-full max-w-md mx-6">
                <div className="flex items-center w-full bg-white/10 border border-white/20 px-3 py-1.5 gap-2 focus:within:bg-white/20 focus:within:border-white/40 transition-all">
                    <Search className="w-4 h-4 text-white/60 shrink=0" />
                    <input type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Products...."
                        className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none" />
                </div>
            </form>

            {/* Right — Cart + Auth */}
            <div className="relative flex items-center gap-4">

                {/* Cart Icon — Always visible */}
                <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px]
                        font-bold min-w-[18px] h-[18px] px-[3px] rounded-full flex items-center justify-center leading-none">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </div>

                {isLoggedIn ? (
                    /* User Profile Dropdown */
                    <div className="relative flex items-center">
                        <button
                            id="navbar-profile-btn"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 top-11 w-44 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden z-50 flex flex-col">
                                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700">
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Signed In</p>
                                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">{getUsername()}</p>
                                </div>
                                <button
                                    className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                                    onClick={() => { navigate('/myprofile'); setDropdownOpen(false); }}
                                >
                                    My Profile
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                                    onClick={() => { navigate('/myorders'); setDropdownOpen(false); }}>
                                    My Orders
                                </button>
                                <button
                                    id="navbar-logout-btn"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Login Button */
                    <Link
                        id="navbar-login-btn"
                        to="/login"
                        className="px-4 py-1.5 rounded-lg bg-white text-blue-800 text-sm font-semibold hover:bg-blue-100 transition-colors shadow-sm"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

