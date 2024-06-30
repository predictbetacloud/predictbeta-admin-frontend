import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { store } from "../state/store";
import {
	logoutUser,
	setIsPerformingAuthAction,
	updateAuth,
	updateLogoutRetryCount,
	updateRetryCount,
} from "../state/slices/auth";
import { toastError, toastSuccess } from "../utils/toast";
import { globalRouter } from "../utils/utils";
import axios from "axios";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG + "_session";

export const signUpAPI = createAsyncThunk(
	"auth/signup",
	({ email, fullName, password }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		axiosInstance
			.post(`/auth/signup`, { email, fullName, password })
			.then((data) => {
				// const newState = {
				//   user: {
				//     companyName: data.data.user.companyName,
				//     companySize: data.data.user.companySize,
				//     completedOn: data.data.user.completedOn,
				//     email: data.data.user.email,
				//     fullName: data.data.user.fullName,
				//     id: data.data.user.id,
				//     plan: data.data.user.plan,
				//     position: data.data.user.position,
				//     role: data.data.user.role,
				//     verifiedOn: data.data.user.verifiedOn
				//   },
				//   token: data.data.tokens.access_token,
				//   refresh_token: data.data.tokens.refresh_token
				// };
				dispatch(
					updateAuth({
						user: {
							email: data.data.user.email,
							fullName: data.data.user.fullName,
							id: data.data.user.id,
							verifiedOn: data.data.user.verifiedOn,
						},
						token: data.data.tokens.access_token,
						refresh_token: data.data.tokens.refresh_token,
					})
				);

				// localStorage.setItem(sessionName, JSON.stringify(newState));
				window.location.reload();

				toastSuccess(data?.data?.message);
				dispatch(setIsPerformingAuthAction(false));
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const loginAPI = createAsyncThunk(
	"auth/login",
	({ email, password }: FieldValues, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));

		axiosInstance
			.post(`/auth/login`, { email, password })
			.then((data) => {
				const newState = {
					user: {
						email: data.data.loginResponse?.data?.admin?.email,
						username: data.data.loginResponse?.data?.admin?.username,
						id: data.data.loginResponse?.data?.admin?.id,
					},
					token: data.data.loginResponse?.data?.accessToken,
					refresh_token: data.data.loginResponse?.data?.refreshToken,
				};

				dispatch(updateAuth(newState));
				localStorage.setItem(sessionName, JSON.stringify(newState));

				dispatch(setIsPerformingAuthAction(false));

				if (globalRouter.navigate) {
					if (globalRouter.location?.state?.from) {
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						globalRouter.navigate("/dashboard/fixtures");
					}
				}
			})
			.catch((error) => {
				dispatch(setIsPerformingAuthAction(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const logOutAPI = createAsyncThunk(
	"auth/logout",
	async (_, { dispatch }) => {
		dispatch(setIsPerformingAuthAction(true));
		const authState = store.getState().auth;
		const { logout_retryCount } = authState;

		const maxCount = 4;
		const retryCount = Number(logout_retryCount) ?? 0;

		const retry = retryCount < maxCount ? true : false;

		dispatch(updateLogoutRetryCount(String(0)));
		dispatch(logoutUser());
		dispatch(setIsPerformingAuthAction(false));

		if (retry) {
			axiosInstance
				.post(`/auth/logout`)
				.then(() => {
					dispatch(updateLogoutRetryCount(String(0)));
					dispatch(setIsPerformingAuthAction(false));
					dispatch(logoutUser());
				})
				.catch(() => {
					dispatch(updateLogoutRetryCount((retryCount + 1).toString()));
					dispatch(logoutUser());
					dispatch(setIsPerformingAuthAction(false));
				});
		} else {
			dispatch(logoutUser());
			dispatch(updateLogoutRetryCount(String(0)));
			dispatch(setIsPerformingAuthAction(false));
		}
	}
);

let refreshRequestCancelToken: AbortController;

export const refreshTokenAPI = createAsyncThunk(
	"auth/refresh",
	async (_, { dispatch }) => {
		const authState = store.getState().auth;
		const { refresh_token, retryCount: _retryCount } = authState;

		const maxCount = 4;
		const retryCount = _retryCount ?? 0;

		const retry = Number(retryCount) < maxCount ? true : false;

		if (refreshRequestCancelToken) {
			refreshRequestCancelToken.abort("Operation canceled due to new request.");
		}

		refreshRequestCancelToken = new AbortController();
		const { signal } = refreshRequestCancelToken;

		if (retry) {
			axiosInstance
				.post(
					`/auth/refresh-token`,
					{ refreshToken: refresh_token },
					{
						headers: {
							Authorization: `Bearer ${refresh_token}`,
						},
						signal,
					}
				)
				.then((data) => {
					dispatch(
						updateAuth({
							token: data.data.data.accessToken,
							refresh_token: data.data.data.refreshToken,
						})
					);

					dispatch(updateRetryCount(String(0)));
				})
				.catch((error) => {
					if (axios.isCancel(error) || error.name === "AbortError") {
						console.log("Request canceled:", error.message);
					} else {
						dispatch(
							updateRetryCount(
								retry ? (Number(retryCount) + 1).toString() : "0"
							)
						);
						if (
							(error && error.response && error.response.status === 401) ||
							(error.data &&
								error?.data?.error &&
								error.data.error.code === 401) ||
							(error && error.response && error.response.status === 403) ||
							(error.data &&
								error?.data?.error &&
								error.data.error.code === 403)
						) {
							localStorage.removeItem(sessionName);
							dispatch(
								updateAuth({
									user: null,
									token: null,
									refresh_token: null,
								})
							);

							if (globalRouter.navigate) {
								globalRouter.navigate("/", {
									state: { from: window.location.pathname },
								});
							}
						}
					}
				});
		} else {
			if (globalRouter.navigate) {
				globalRouter.navigate("/", {
					state: { from: window.location.pathname },
				});
			}
		}
	}
);
