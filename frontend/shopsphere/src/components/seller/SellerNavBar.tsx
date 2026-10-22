import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/SSLogo.png";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";


const getUsername = (): string => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return "";
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email;

    } catch {
        return "";
    }
}

const SellerNavBar = () => {
    const [query, setQuery] = useState("");
    const { isLoggedIn, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/sellerhome");
    }



    return (
        <div className="w-full">
            <nav className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 bg-purple-400 dark:bg-purple-800">
                <div className="flex flex-row items-center space-x-8">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
                    </Link>
                </div>

                <form
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

                <div>
                    <Bell />
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
                        to="/sellerlogin"
                        className="px-4 py-1.5 rounded-lg bg-white text-blue-800 text-sm font-semibold hover:bg-blue-100 transition-colors shadow-sm"
                    >
                        Login
                    </Link>
                )}

            </nav>
        </div>
    );
}

export default SellerNavBar;