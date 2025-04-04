'use client';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserType {
    name: string | null;
    id?: string | null; 
    image: string | null;
    email: string | null;
}

interface AppContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (session?.user) {
            setUser({
                name: session.user.name ?? null,
                id: session.user.id ?? null,
                image: session.user.image ?? null,
                email: session.user.email ?? null,
            });
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    }, [session]);

    return (
        <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
