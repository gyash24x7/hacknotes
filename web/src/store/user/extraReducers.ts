import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
	AsyncActionStatus,
	UserActions,
	UserSliceState
} from "../../utils/types";
import { login, signup } from "./thunks";

export default (builder: ActionReducerMapBuilder<UserSliceState>) => {
	builder.addCase(login.pending, (state) => {
		state.status[UserActions.LOGIN] = AsyncActionStatus.LOADING;
	});

	builder.addCase(login.rejected, (state, { error }) => {
		state.status[UserActions.LOGIN] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(login.fulfilled, (state, { payload }) => {
		state.status[UserActions.LOGIN] = AsyncActionStatus.SUCCEEDED;
		state.user = payload;
	});

	builder.addCase(signup.pending, (state) => {
		state.status[UserActions.SIGNUP] = AsyncActionStatus.LOADING;
	});

	builder.addCase(signup.rejected, (state, { error }) => {
		state.status[UserActions.SIGNUP] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(signup.fulfilled, (state, { payload }) => {
		state.status[UserActions.SIGNUP] = AsyncActionStatus.SUCCEEDED;
		state.user = payload;
	});
};
