import { useState, useEffect, useCallback } from 'react';

/** Returns true if the token exists AND is not expired. */
function isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // `exp` is in seconds; Date.now() is in ms
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return false; // expired
        }
        return true;
    } catch {
        return false; // malformed token
    }
}

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const token = localStorage.getItem('accessToken');
        const valid = isTokenValid(token);
        if (!valid && token) {
            // clean up stale / fake token immediately
            localStorage.removeItem('accessToken');
        }
        return valid;
    });

    // Listen for storage events so NavBar updates when login/signup set the token
    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem('accessToken');
            const valid = isTokenValid(token);
            if (!valid && token) {
                localStorage.removeItem('accessToken');
            }
            setIsLoggedIn(valid);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        window.dispatchEvent(new Event('storage'));
    }, []);

    const login = useCallback((token: string) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
        window.dispatchEvent(new Event('storage'));
    }, []);

    return { isLoggedIn, logout, login };
}
