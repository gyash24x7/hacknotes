import { createContext, useContext } from "react";
import { FlagData } from "./types";

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

interface IFlagContext {
	addFlag: (options: FlagData) => void;
}

export const FlagContext = createContext<IFlagContext>({
	addFlag: (_options) => {}
});

export const useFlag = () => useContext(FlagContext);
