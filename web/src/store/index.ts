import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { noteReducer } from "./noteSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: { notes: noteReducer, user: userReducer },
	middleware: getDefaultMiddleware().concat(logger)
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
