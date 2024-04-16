import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError } from "../utils/toast";
import {
	setIsFetchingSeasonLeaderboard,
	setIsFetchingWeekLeaderboard,
	setLeaderboard,
} from "../state/slices/leaderboard";

export const getWeekLeaderboardAPI = createAsyncThunk(
	"leaderboard/getWeekLeaderboard",
	({ weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingWeekLeaderboard(true));
		axiosInstance
			.get(`/leaderboard/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingWeekLeaderboard(false));
				dispatch(setLeaderboard(data.data?.data));
			})
			.catch((error) => {
				dispatch(setLeaderboard([]));
				dispatch(setIsFetchingWeekLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSeasonLeaderboardAPI = createAsyncThunk(
	"leaderboard/getSeasonLeaderboard",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSeasonLeaderboard(true));
		axiosInstance
			.get(`/leaderboard/week/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingSeasonLeaderboard(false));
				dispatch(setLeaderboard(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingSeasonLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);
