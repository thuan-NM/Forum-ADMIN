import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    registeredEmail: string;
    setRegisteredEmail: (email: string) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [registeredEmail, setRegisteredEmail] = useState<string>("");

    return (
        <AuthContext.Provider value={{ registeredEmail, setRegisteredEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};