import React, { useContext, useEffect, useState, createContext } from "react";
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser: User | null) => {
                setUser(firebaseUser);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const formatError = (code: string): string => {
        switch (code) {
            case "auth/invalid-email":
                return "Invalid email address format";
            case "auth/user-disabled":
                return "This account has been disabled";
            case "auth/user-not-found":
            case "auth/wrong-password":
                return "Invalid email or password";
            case "auth/email-already-in-use":
                return "This email is already registered";
            case "auth/weak-password":
                return "Password is too weak. Please use a stronger password";
            case "auth/too-many-requests":
                return "Too many failed login attempts. Please try again later";
            case "auth/network-request-failed":
                return "Network error. Please check your connection";
            default:
                return "An error occurred. Please try again";
        }
    };

    const login = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("Login error:", error);
            setError(formatError(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("Registration error:", error);
            setError(formatError(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setError(null);
        setIsLoading(true);

        try {
            await signOut(auth);
        } catch (error: any) {
            console.error("Logout error:", error);
            setError(formatError(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, register, logout, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
