import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { apiPost, apiGet, apiDelete } from './apiHelpers';
import { User } from './models/user';

interface AuthContextState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User;
    userError: string;
    login: (data: UserLoginData, cb?: (err) => void) => void;
    logout: (cb?: (err) => void) => void;
    signup: (data: UserSignupData, cb?: (err) => void) => void;
    deleteAccount: (cb?: (err) => void) => void;
    generateApiKey: (cb?: (err) => void) => void;
}

interface UserLoginData {
    username: string;
    password: string;
}

interface UserSignupData {
    username: string;
    email: string;
    confirmEmail: string;
    password: string;
}

const stub = (): never => {
    throw new Error('AuthProvider not set up');
};

export const AuthContext = createContext<AuthContextState>({
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    userError: undefined,
    login: stub,
    logout: stub,
    signup: stub,
    generateApiKey: stub,
    deleteAccount: stub,
});

const noop = () => {};

interface AuthProviderProps {
    preloadedUser?: User;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    preloadedUser
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(preloadedUser != undefined);
    const [user, setUser] = useState<User>(preloadedUser);
    const [userError, setUserError] = useState<string>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (data: UserLoginData, cb: (err) => void = noop) => {
        if(isAuthenticated) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await apiPost('/api/login', { ...data });

            if (res.error) {
                setIsLoading(false);
                cb(res.error);
            } else {
                setIsAuthenticated(true);
            }
        } catch(err) {
            cb('Error logging in.');
        }
    }, [isAuthenticated]);

    const logout = useCallback(async (cb: (err) => void = noop) => {
        if(!isAuthenticated) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await apiPost('/api/logout');

            if (res.error) {
                setIsLoading(false);
                cb(res.error);
            } else {
                setIsAuthenticated(false);
            }
        } catch(err) {
            cb('Error logging out');
        }

    }, [isAuthenticated]);

    const signup = useCallback(async (data: UserSignupData, cb: (err) => void = noop) => {
        if(isAuthenticated) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await apiPost('/api/users', {
                username: data.username,
                email: data.email,
                confirm_email: data.confirmEmail,
                password: data.password
            });

            if(res.error) {
                setIsLoading(false);
                cb(res.error);
            } else {
                setIsAuthenticated(true);
            }
        } catch(err) {
            cb('Error signing up.');
        }
    }, [isAuthenticated]);

    async function updateUserData(): Promise<void> {
        setUserError(undefined);
        setIsLoading(true);

        try {
            const user = await apiGet('/api/users/me');
            if (user.error) {
                setUserError(user.error);
            } else {
                setUser(user);
                setIsAuthenticated(true);
            }
        } catch(err) {
            setUserError('Error loading user info.');
        }

        setIsLoading(false);
    }

    const generateApiKey = useCallback(async (cb: (err) => void = noop) => {
        try {
            const res = await apiPost('/api/api/key');
            if (res.error) {
                cb(res.error);
            } else {
                updateUserData();
            }
        } catch(err) {
            cb('Error getting API key.');
        }
    }, []);

    const deleteAccount = useCallback(async (cb) => {
        try {
            const data = await apiDelete('/api/users/me');
            if (data.error) {
                cb(data.error);
            } else {
                setIsAuthenticated(false);
            }
        } catch(err) {
            cb('Error getting API key.');
        }
    }, []);

    useEffect(() => {
        if(isAuthenticated) {
            updateUserData();
        } else {
            setUser(undefined);
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    // update user data initially to check if already logged in
    useEffect(() => {
        // if user state not preloaded
        if(user == undefined) {
            updateUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            user,
            userError,
            login,
            logout,
            signup,
            generateApiKey,
            deleteAccount
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextState => {
    return useContext(AuthContext);
};
