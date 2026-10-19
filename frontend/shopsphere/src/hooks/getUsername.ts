export const getUsername = (): string => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.name;

    } catch {
        return '';
    }
}

export const getEmail = (): string => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email;
    } catch {
        return '';
    }
}

export const getPhoneNumber = (): string => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) return '';
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.phoneNumber;
    } catch {
        return '';
    }
}