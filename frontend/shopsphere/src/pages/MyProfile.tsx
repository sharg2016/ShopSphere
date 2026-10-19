import { Edit, Lock, X } from "lucide-react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
}

const MyProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [enabled, setEnabled] = useState<boolean>(false);
    const [initialProfile, setIntialProfile] = useState<UserProfile | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setError('Not logged in');
                    return;
                }

                const res = await fetch('http://localhost:3011/auth/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data: UserProfile = await res.json();
                setProfile(data);
            } catch (err) {
                setError('Could not load profile. Please login again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleToggleEdit = () => {
        if (enabled) {
            setProfile(initialProfile);
        }
        setEnabled(!enabled);
        setSuccessMessage(null);
    };

    const handleApplyClick = () => {
        setPassword("");
        setPasswordError(null);
        setIsPasswordModalOpen(true);
    }

    const handleConfirmUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        setIsSaving(true);
        setPasswordError(null);

        try {
            const token = localStorage.getItem("accessToken");
            const res = await fetch("http://localhost:3011/auth/profile",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        name: profile?.name,
                        email: profile?.email,
                        phoneNumber: profile?.phoneNumber,
                        password: password
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setPasswordError(data.message || "Incorrect Password");
                setIsSaving(false);
                return;
            }

            setProfile(data.user);
            setIntialProfile(data.user);
            setIsPasswordModalOpen(false);
            setEnabled(false);
            setPassword("");
            setSuccessMessage('Profile Updated Successfully');

            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                parsed.name = data.user.name;
                localStorage.setItem('user', JSON.stringify(parsed));
            }
        } catch (err) {
            setError('Network Error . please try again')
        } finally {
            setIsSaving(false);
        }

    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <NavBar />
                <div className="flex justify-center items-center h-64 text-zinc-500 text-sm">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gray-100">
                <NavBar />
                <div className="flex justify-center items-center h-64 text-red-500 text-sm">
                    {error || 'Something went wrong.'}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="flex flex-col gap-3 p-6">
                <h2 className="text-xl text-white bg-purple-600 py-2 px-4 rounded-md">
                    Hello, {profile.name?.toUpperCase() || 'USER'} 👋
                </h2>

                {successMessage && (
                    <div className="p-3 bg-green-100 border border-green-300 text-green-700 text-sm rounded-md">
                        {successMessage}
                    </div>
                )}

                <div className="flex flex-col gap-3 w-1/3 border border-zinc-300 rounded-lg p-5 bg-white dark:bg-zinc-800 dark:border-zinc-700 shadow-sm">
                    <div className="flex flex-row justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                        <label className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                            Personal Information
                        </label>
                        <button type="button" onClick={handleToggleEdit}
                            className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium">
                            <Edit className="w-4 h-4 cursor-pointer" />
                            {enabled ? "Cancel" : "Edit"}
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left font-semibold text-xs text-zinc-600 dark:text-zinc-400">Email</label>
                        <input
                            type="text"
                            value={profile.email}
                            onChange={() => { }}
                            disabled={!enabled}
                            className={`text-xs text-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md px-3 py-2 outline-none transition-colors
                                ${!enabled ? "bg-gray-200 dark:bg-zinc-700cursor-not-allowed" : "bg-white dark:bg-zinc-800 focus:border-purple-500"}`}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left font-semibold text-xs text-zinc-600 dark:text-zinc-400">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={() => { }}
                            disabled={!enabled}
                            className={`text-xs text-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md px-3 py-2 outline-none transition-colors
                                ${!enabled ? "bg-gray-200 dark:bg-zinc-700cursor-not-allowed" : "bg-white dark:bg-zinc-800 focus:border-purple-500"}`}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left font-semibold text-xs text-zinc-600 dark:text-zinc-400">Phone Number</label>
                        <input
                            type="text"
                            value={profile.phoneNumber}
                            onChange={() => { }}
                            disabled={!enabled}
                            className={`text-xs text-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-md px-3 py-2 outline-none transition-colors
                                ${!enabled ? "bg-gray-200 dark:bg-zinc-700cursor-not-allowed" : "bg-white dark:bg-zinc-800 focus:border-purple-500"}`}
                        />
                    </div>
                    {enabled && (
                        <button className="bg-purple-500 hover:bg-purple-700 text-white text-sm dark:text-zinc-300 py-1.5 px-3 rounded-lg"
                            onClick={handleApplyClick}>
                            Apply
                        </button>
                    )}
                </div>
            </div>

            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl max-w-sm w-full p-5 border border-zinc-200 dark:border-zinc-700">
                        <div className="flex justify-between items-center mb-3 ">
                            <div className="flex item-center gap-2 text-zinc-800 dark:text-zinc-100 font-bold text-base">
                                <Lock className="w-4 h-4 text-purple-600" />
                                Confirm Your Password
                            </div>
                            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-600"
                                onClick={() => setIsPasswordModalOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 text-left">
                            To make changes in your profile , Please enter your password.
                        </p>

                        <form onSubmit={handleConfirmUpdate} >
                            <div className="mb-4">
                                <input type="password" placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    autoFocus />
                                {passwordError && (
                                    <p className="text-sm text-red-500 mt-1.5 text-left">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button className="px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
                                    type="submit" onSubmit={() => setIsPasswordModalOpen(false)}>
                                    Cancel
                                </button>

                                <button className="px-4 py-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
                                    type="submit" disabled={isSaving}>
                                    {isSaving ? 'Verifying....' : ' Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

}

export default MyProfile;