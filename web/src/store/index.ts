import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./noteSlice";

export default configureStore({
	reducer: { notes: noteReducer }
});
