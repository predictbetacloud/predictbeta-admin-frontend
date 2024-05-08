import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import {
	setIsFetchingMonthLeaderboard,
	setIsFetchingSeasonLeaderboard,
	setIsFetchingWeekLeaderboard,
	setLeaderboard,
} from "../state/slices/leaderboard";

export const getWeekLeaderboardAPI = createAsyncThunk(
	"leaderboard/getWeekLeaderboard",
	({ weekId, params }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingWeekLeaderboard(true));
		axiosInstance
			.get(`/leaderboard/week/${weekId}`, { params })
			.then((data) => {
				dispatch(setIsFetchingWeekLeaderboard(false));
				dispatch(setLeaderboard(data.data?.data));
			})
			.catch((error) => {
				dispatch(
					setLeaderboard({
						data: [],
						totalElements: 0,
						elementsPerPage: 0,
						totalPages: 0,
						currentPage: 0,
					})
				);
				dispatch(setIsFetchingWeekLeaderboard(false));
				toastError(
					error?.response?.data?.message ??
						"Something went wrong, refresh page."
				);
			});
	}
);

export const getMonthLeaderboardAPI = createAsyncThunk(
	"leaderboard/getWeekLeaderboard",
	({ params }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingMonthLeaderboard(true));
		axiosInstance
			.get(`/leaderboard/month`, { params })
			.then((data) => {
				dispatch(setIsFetchingMonthLeaderboard(false));
				dispatch(setLeaderboard(data.data?.data));
			})
			.catch((error) => {
				dispatch(
					setLeaderboard({
						data: [],
						totalElements: 0,
						elementsPerPage: 0,
						totalPages: 0,
						currentPage: 0,
					})
				);
				dispatch(setIsFetchingMonthLeaderboard(false));
				toastError(
					error?.response?.data?.message ??
						"Something went wrong, refresh page."
				);
			});
	}
);

export const getSeasonLeaderboardAPI = createAsyncThunk(
	"leaderboard/getSeasonLeaderboard",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSeasonLeaderboard(true));
		axiosInstance
			.get(`/leaderboard/season/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingSeasonLeaderboard(false));
				dispatch(setLeaderboard(data.data?.data));
			})
			.catch((error) => {
				dispatch(
					setLeaderboard({
						data: [],
						totalElements: 0,
						elementsPerPage: 0,
						totalPages: 0,
						currentPage: 0,
					})
				);
				dispatch(setIsFetchingSeasonLeaderboard(false));
				toastError(
					error?.response?.data?.message ??
						"Something went wrong, refresh page."
				);
			});
	}
);
