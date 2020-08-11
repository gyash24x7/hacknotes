import { createContext, useContext } from "react";
import { defaultNote, FlagData, Note } from "./types";

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

interface INoteContext {
	note: Note;
	setNote: (note: Note) => void;
}

export const NoteContext = createContext<INoteContext>({
	note: defaultNote,
	setNote: (_note: Note) => {}
});

export const ActiveNoteProvider = NoteContext.Provider;

export const useActiveNote = () => useContext(NoteContext);

export const ActiveNoteConsumer = NoteContext.Consumer;
