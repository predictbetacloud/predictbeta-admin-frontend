import {
	setIsFetchingMonthLeaderboard,
	setIsFetchingSeasonLeaderboard,
	setIsFetchingWeekLeaderboard,
	setLeaderboard,
} from "../state/slices/leaderboard";
import { createCancelableThunk } from "./helper";

// export const getWeekLeaderboardAPI = createAsyncThunk(
// 	"leaderboard/getWeekLeaderboard",
// 	({ weekId, params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingWeekLeaderboard(true));
// 		axiosInstance
// 			.get(`/leaderboard/week/${weekId}`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingWeekLeaderboard(false));
// 				dispatch(setLeaderboard(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(
// 					setLeaderboard({
// 						data: [],
// 						totalElements: 0,
// 						elementsPerPage: 0,
// 						totalPages: 0,
// 						currentPage: 0,
// 					})
// 				);
// 				dispatch(setIsFetchingWeekLeaderboard(false));
// 				toastError(
// 					error?.response?.data?.message ??
// 						"Something went wrong, refresh page."
// 				);
// 			});
// 	}
// );

export const getWeekLeaderboardAPI = createCancelableThunk(
	"leaderboard/getWeekLeaderboard",
	"getWeekLeaderboard",
	({ weekId }) => `/leaderboard/week/${weekId}/public`,
	setIsFetchingWeekLeaderboard,
	setLeaderboard,
	{
		data: [],
		totalElements: 0,
		elementsPerPage: 0,
		totalPages: 0,
		currentPage: 0,
	}
);

// export const getMonthLeaderboardAPI = createAsyncThunk(
// 	"leaderboard/getWeekLeaderboard",
// 	({ params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingMonthLeaderboard(true));
// 		axiosInstance
// 			.get(`/leaderboard/month`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingMonthLeaderboard(false));
// 				dispatch(setLeaderboard(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(
// 					setLeaderboard({
// 						data: [],
// 						totalElements: 0,
// 						elementsPerPage: 0,
// 						totalPages: 0,
// 						currentPage: 0,
// 					})
// 				);
// 				dispatch(setIsFetchingMonthLeaderboard(false));
// 				toastError(
// 					error?.response?.data?.message ??
// 						"Something went wrong, refresh page."
// 				);
// 			});
// 	}
// );

export const getMonthLeaderboardAPI = createCancelableThunk(
	"leaderboard/getWeekLeaderboard",
	"getWeekLeaderboard",
	() => `/leaderboard/month/public`,
	setIsFetchingMonthLeaderboard,
	setLeaderboard,
	{
		data: [],
		totalElements: 0,
		elementsPerPage: 0,
		totalPages: 0,
		currentPage: 0,
	}
);

// export const getSeasonLeaderboardAPI = createAsyncThunk(
// 	"leaderboard/getSeasonLeaderboard",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSeasonLeaderboard(true));
// 		axiosInstance
// 			.get(`/leaderboard/season/${seasonId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSeasonLeaderboard(false));
// 				dispatch(setLeaderboard(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(
// 					setLeaderboard({
// 						data: [],
// 						totalElements: 0,
// 						elementsPerPage: 0,
// 						totalPages: 0,
// 						currentPage: 0,
// 					})
// 				);
// 				dispatch(setIsFetchingSeasonLeaderboard(false));
// 				toastError(
// 					error?.response?.data?.message ??
// 						"Something went wrong, refresh page."
// 				);
// 			});
// 	}
// );

export const getSeasonLeaderboardAPI = createCancelableThunk(
	"leaderboard/getSeasonLeaderboard",
	"getSeasonLeaderboard",
	({ seasonId }) => `/leaderboard/season/${seasonId}/public`,
	setIsFetchingSeasonLeaderboard,
	setLeaderboard,
	{
		data: [],
		totalElements: 0,
		elementsPerPage: 0,
		totalPages: 0,
		currentPage: 0,
	}
);
