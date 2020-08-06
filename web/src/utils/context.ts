import { createContext } from "react";

interface IAuthContext {
	isAuthenticated: boolean;
	setIsAuthenticated: (val: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	setIsAuthenticated: () => {}
});
