import { createContext, useContext } from "react";

interface IAuthContext {
	isAuthenticated: boolean;
	setIsAuthenticated: (val: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	setIsAuthenticated: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = AuthContext.Provider;
