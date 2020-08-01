import { createSlice } from "@reduxjs/toolkit";
import { DrawerModes } from "../../utils/types";

const drawerSlice = createSlice({
	name: "drawer",
	initialState: { mode: DrawerModes.CLOSED },
	reducers: {
		openDrawer(state, { payload }) {
			state.mode = payload;
		},
		closeDrawer(state) {
			state.mode = DrawerModes.CLOSED;
		}
	}
});

export const drawerReducer = drawerSlice.reducer;

export const { openDrawer, closeDrawer } = drawerSlice.actions;
