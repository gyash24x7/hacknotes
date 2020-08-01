import { configureStore } from "@reduxjs/toolkit";
import { drawerReducer } from "./drawer";
import { noteReducer } from "./note";
import { userReducer } from "./user";

export const store = configureStore({
	reducer: { notes: noteReducer, user: userReducer, drawer: drawerReducer }
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
