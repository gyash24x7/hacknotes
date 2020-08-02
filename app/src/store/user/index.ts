import { createSlice } from "@reduxjs/toolkit";
import {
	AsyncActionStatus,
	UserActions,
	UserSliceState
} from "../../utils/types";
import extraReducers from "./extraReducers";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		error: null,
		status: {
			[UserActions.LOGIN]: AsyncActionStatus.IDLE,
			[UserActions.SIGNUP]: AsyncActionStatus.IDLE
		}
	} as UserSliceState,

	reducers: {},

	extraReducers
});

export const userReducer = userSlice.reducer;
