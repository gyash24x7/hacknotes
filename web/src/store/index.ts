import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./noteSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: { notes: noteReducer, user: userReducer }
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
