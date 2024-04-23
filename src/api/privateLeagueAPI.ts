import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setAllPrivateLeagues,
	setIsCreatingPrivateLeague,
	setIsDeletingPrivateLeague,
	setIsFetchingAllPrivateLeagues,
	setIsFetchingSpecificPrivateLeague,
	setIsFetchingSpecificPrivateLeagueSeasonLeaderboard,
	setIsFetchingSpecificPrivateLeagueWeekLeaderboard,
	setIsJoiningPrivateLeague,
	setIsLeavingPrivateLeague,
	setSpecificPrivateLeague,
	setSpecificPrivateLeagueLeaderboard,
} from "../state/slices/privateLeague";
import { globalRouter } from "../utils/utils";

export const createPrivateLeagueAPI = createAsyncThunk(
	"privateLeague/createPrivateLeague",
	(
		{
			name,
			scoringStarts,
			entranceFee,
			numberOfPlayers,
			winningPositions,
			sharingFormula,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsCreatingPrivateLeague(true));
		axiosInstance
			.post(`/private-league`, {
				name,
				scoringStarts,
				entranceFee,
				numberOfPlayers,
				winningPositions,
				sharingFormula,
			})
			.then((data) => {
				dispatch(setIsCreatingPrivateLeague(false));
				toastSuccess(
					data?.data?.message ?? "You have created a private league"
				);
				if (globalRouter.navigate) {
					if (globalRouter.location?.state?.from) {
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						globalRouter.navigate("/dashboard/private-league");
					}
				}
			})
			.catch((error) => {
				dispatch(setIsCreatingPrivateLeague(false));
				Array.isArray(error?.response?.data?.message)
					? toastError(error?.response?.data?.message?.[0])
					: toastError(error?.response?.data?.message);
			});
	}
);

export const joinPrivateLeagueAPI = createAsyncThunk(
	"privateLeague/joinPrivateLeague",
	({ code }: FieldValues, { dispatch }) => {
		dispatch(setIsJoiningPrivateLeague(true));
		axiosInstance
			.post(`/private-league/${code}/join`)
			.then((data) => {
				dispatch(setIsJoiningPrivateLeague(false));
				toastSuccess(
					data?.data?.message ?? "You have joined the private league"
				);
				if (globalRouter.navigate) {
					if (globalRouter.location?.state?.from) {
						globalRouter.navigate(globalRouter?.location?.state?.from);
					} else {
						globalRouter.navigate("/dashboard/private-league");
					}
				}
			})
			.catch((error) => {
				dispatch(setIsJoiningPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const leavePrivateLeagueAPI = createAsyncThunk(
	"privateLeague/leavePrivateLeague",
	({ leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsLeavingPrivateLeague(true));
		axiosInstance
			.post(`/private-/${leagueId}/join`)
			.then((data) => {
				dispatch(setIsLeavingPrivateLeague(false));
				toastSuccess(data?.data?.message ?? "You have left the private league");
				dispatch(getAllPrivateLeaguesAPI());
			})
			.catch((error) => {
				dispatch(setIsLeavingPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const deletePrivateLeagueAPI = createAsyncThunk(
	"privateLeague/deletePrivateLeague",
	({ leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsDeletingPrivateLeague(true));
		axiosInstance
			.delete(`/private-league/${leagueId}`)
			.then((data) => {
				dispatch(setIsDeletingPrivateLeague(false));
				toastSuccess(
					data?.data?.message ?? "You have deleted the private league"
				);
				dispatch(getAllPrivateLeaguesAPI());
			})
			.catch((error) => {
				dispatch(setIsDeletingPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getAllPrivateLeaguesAPI = createAsyncThunk(
	"privateLeague/getAllPrivateLeagues",
	(_, { dispatch }) => {
		dispatch(setIsFetchingAllPrivateLeagues(true));
		axiosInstance
			.get(`/private-league/admin`)
			.then((data) => {
				dispatch(setAllPrivateLeagues(data.data?.data));
				dispatch(setIsFetchingAllPrivateLeagues(false));
			})
			.catch((error) => {
				dispatch(setAllPrivateLeagues([]));
				dispatch(setIsFetchingAllPrivateLeagues(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificPrivateLeagueAPI = createAsyncThunk(
	"privateLeague/getSpecificPrivateLeagues",
	({ leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeague(true));
		axiosInstance
			.get(`/private-league/${leagueId}`)
			.then((data) => {
				dispatch(setSpecificPrivateLeague(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeague(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeague(null));
				dispatch(setIsFetchingSpecificPrivateLeague(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getPrivateLeagueWeekLeaderboardAPI = createAsyncThunk(
	"privateLeague/getPrivateLeagueWeekLeaderboard",
	({ weekId, leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(true));
		axiosInstance
			.get(`/private-league/${leagueId}/${weekId}/leaderboard`)
			.then((data) => {
				dispatch(setSpecificPrivateLeagueLeaderboard(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeagueLeaderboard([]));
				dispatch(setIsFetchingSpecificPrivateLeagueWeekLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getPrivateLeagueSeasonLeaderboardAPI = createAsyncThunk(
	"privateLeague/getPrivateLeagueSeasonLeaderboard",
	({ seasonId, leagueId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(true));
		axiosInstance
			.get(`/private-league/${leagueId}/${seasonId}/leaderboard`)
			.then((data) => {
				dispatch(setSpecificPrivateLeagueLeaderboard(data.data?.data));
				dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(false));
			})
			.catch((error) => {
				dispatch(setSpecificPrivateLeagueLeaderboard([]));
				dispatch(setIsFetchingSpecificPrivateLeagueSeasonLeaderboard(false));
				toastError(error?.response?.data?.message);
			});
	}
);
