/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import { FieldValues } from "react-hook-form";
import axios from "axios";

// Store abort controllers
const abortControllers: { [key: string]: AbortController } = {};

export const createCancelableThunk = (
	type: string,
	tokenKey: string,
	getUrl: (params: FieldValues) => string,
	isFetchingAction: (isFetching: boolean) => { type: string; payload: boolean },
	setAction: (data: any) => { type: string; payload: any },
	failedArgs?: any
) => {
	return createAsyncThunk(type, async (params: FieldValues, { dispatch }) => {
		// Abort the previous request if it exists
		if (abortControllers[tokenKey]) {
			abortControllers[tokenKey].abort();
		}

		// Create a new AbortController
		abortControllers[tokenKey] = new AbortController();
		const { signal } = abortControllers[tokenKey];

		try {
			dispatch(isFetchingAction(true));
			const response = await axiosInstance.get(getUrl(params), {
				signal,
				...params,
			});

			dispatch(isFetchingAction(false));
			dispatch(setAction(response.data.data));
		} catch (error: any) {
			if (axios.isCancel(error) || error.name === "AbortError") {
				console.log("Request canceled:", error.message);
			} else {
				if (failedArgs) {
					dispatch(setAction(failedArgs));
				} else {
					dispatch(setAction(null));
				}
				dispatch(isFetchingAction(false));
				toastError(error.response?.data?.message);
			}
		}
	});
};
