import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { AuthType } from "../../types/types";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG + "_session";

// Define the initial state using that type
// const initialState: AuthType = {
//   user: JSON.parse(localStorage.getItem(sessionName) ?? "").user,
//   token: JSON.parse(localStorage.getItem(sessionName) ?? "").token
// };
const initialState: AuthType = {
	user: localStorage.getItem(sessionName)
		? JSON.parse(localStorage.getItem(sessionName) ?? "")?.user
		: {},
	token: localStorage.getItem(sessionName)
		? JSON.parse(localStorage.getItem(sessionName) ?? "")?.token
		: "",
	refresh_token: localStorage.getItem(sessionName)
		? JSON.parse(localStorage.getItem(sessionName) ?? "")?.refresh_token
		: "",
	retryCount: localStorage.getItem(sessionName + "_retryCount")
		? JSON.parse(localStorage.getItem(sessionName + "_retryCount") ?? "")
				?.retryCount
		: "",
	logout_retryCount: localStorage.getItem(sessionName + "_logout_retryCount")
		? JSON.parse(localStorage.getItem(sessionName + "_logout_retryCount") ?? "")
				?.logout_retryCount
		: "",
	isPerformingAuthAction: false,
};

export const authSlice = createSlice({
	name: "auth",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		updateAuth: (state, action: PayloadAction<AuthType>) => {
			if (action.payload.user) {
				state.user = action.payload.user;
			}
			if (action.payload.token) {
				state.token = action.payload.token;
			}
			if (action.payload.refresh_token) {
				state.refresh_token = action.payload.refresh_token;
			}
			const newState = {
				user: state.user,
				token: state.token,
				refresh_token: state.refresh_token,
			};
			localStorage.setItem(sessionName, JSON.stringify(newState));
		},
		refreshToken: (state, action: PayloadAction<AuthType["token"]>) => {
			state.token = action.payload;
		},
		updateRetryCount: (
			state,
			action: PayloadAction<AuthType["retryCount"]>
		) => {
			state.retryCount = action.payload;
			localStorage.setItem(
				sessionName + "_retryCount",
				JSON.stringify(action.payload)
			);
		},
		updateLogoutRetryCount: (
			state,
			action: PayloadAction<AuthType["logout_retryCount"]>
		) => {
			state.logout_retryCount = action.payload;
		},
		logoutUser: (state) => {
			localStorage.removeItem(sessionName);
			state.user = null;
			state.token = null;
			state.refresh_token = null;
			window.location.href = "/";
		},

		setAuthFromCache: (state) => {
			const data = localStorage.getItem(sessionName);
			if (data) {
				const parsed_data = JSON.parse(data);
				state.user = parsed_data.user;
				state.token = parsed_data.token;
			}
			state.user = null;
			state.token = null;
		},
		setIsPerformingAuthAction: (
			state,
			action: PayloadAction<AuthType["isPerformingAuthAction"]>
		) => {
			state.isPerformingAuthAction = action.payload;
		},
	},
});

export const {
	updateAuth,
	updateLogoutRetryCount,
	updateRetryCount,
	refreshToken,
	logoutUser,
	setAuthFromCache,
	setIsPerformingAuthAction,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsPerformingAuthAction = (state: RootState) =>
	state.auth.isPerformingAuthAction;

export default authSlice.reducer;
