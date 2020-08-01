import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
	AsyncActionStatus,
	UserActions,
	UserSliceState
} from "../../utils/types";
import { login, logout, me, signup, updateAvatar } from "./thunks";

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

	builder.addCase(me.pending, (state) => {
		state.status[UserActions.ME] = AsyncActionStatus.LOADING;
	});

	builder.addCase(me.rejected, (state, { error }) => {
		state.status[UserActions.ME] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(me.fulfilled, (state, { payload }) => {
		state.status[UserActions.ME] = AsyncActionStatus.SUCCEEDED;
		state.user = payload;
	});

	builder.addCase(logout.fulfilled, (state, { payload }) => {
		state.user = payload;
	});

	builder.addCase(updateAvatar.pending, (state) => {
		state.status[UserActions.UPDATE_AVATAR] = AsyncActionStatus.LOADING;
	});

	builder.addCase(updateAvatar.rejected, (state, { error }) => {
		state.status[UserActions.UPDATE_AVATAR] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(updateAvatar.fulfilled, (state, { payload }) => {
		state.status[UserActions.UPDATE_AVATAR] = AsyncActionStatus.SUCCEEDED;
		state.user = payload;
	});
};
