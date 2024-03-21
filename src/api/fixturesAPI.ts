import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setDropdownWeeks,
	setIsCreatingMatch,
	setIsCreatingSeason,
	setIsCreatingWeek,
	setIsDeletingMatch,
	setIsEditingMatch,
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingMatches,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setIsPublishingWeek,
	setIsSubmittingWeekResult,
	setMatches,
	setSeasons,
	setShowCreateMatchModal,
	setShowCreateSeasonModal,
	setShowCreateWeekModal,
	setShowDeleteMatchModal,
	setShowEditMatchModal,
	setShowPublishWeekModal,
	setSpecificSeason,
	setSpecificWeek,
	setWeeks,
} from "../state/slices/fixtures";

// Season
export const createSeasonAPI = createAsyncThunk(
	"fixtures/createSeason",
	({ name }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingSeason(true));

		axiosInstance
			.post(`/seasons`, { name })
			.then((data) => {
				dispatch(setIsCreatingSeason(false));
				toastSuccess(data?.data?.message ?? "Season added successfully");
				dispatch(getAllSeasonsAPI({}));
				dispatch(setShowCreateSeasonModal(false));
			})
			.catch((error) => {
				dispatch(setIsCreatingSeason(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const getAllSeasonsAPI = createAsyncThunk(
	"fixtures/getAllSeasons",
	({ params }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllSeasons(true));
		axiosInstance
			.get(`/seasons`, { params })
			.then((data) => {
				dispatch(setIsFetchingAllSeasons(false));
				dispatch(setSeasons(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllSeasons(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificSeasonAPI = createAsyncThunk(
	"fixtures/getSpecificSeason",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificSeason(true));
		axiosInstance
			.get(`/seasons/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificSeason(false));
				dispatch(setSpecificSeason(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificSeason(false));
				toastError(error?.response?.data?.message);
			});
	}
);

// Weeks

export const createWeekAPI = createAsyncThunk(
	"fixtures/createWeek",
	({ seasonId, number }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingWeek(true));

		axiosInstance
			.post(`/weeks`, { seasonId, number })
			.then((data) => {
				dispatch(setIsCreatingWeek(false));
				toastSuccess(data?.data?.message ?? "Week added successfully");
				dispatch(getAllWeeksAPI({ seasonId }));
				dispatch(setShowCreateWeekModal(false));
			})
			.catch((error) => {
				dispatch(setIsCreatingWeek(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const submitWeekResultAPI = createAsyncThunk(
	"fixtures/submit-result",
	(
		{ seasonId, weekId, fixturResults, scorers, timeOfFirstGoal }: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsSubmittingWeekResult(true));

		axiosInstance
			.post(`/weeks/${weekId}/submit-result`, {
				fixturResults,
				scorers,
				timeOfFirstGoal,
			})
			.then((data) => {
				dispatch(setIsSubmittingWeekResult(false));
				toastSuccess(data?.data?.message ?? "Result submitted successfully");
				dispatch(getAllMatchesAPI({ seasonId, weekId }));
			})
			.catch((error) => {
				dispatch(setIsSubmittingWeekResult(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const publishWeekAPI = createAsyncThunk(
	"fixtures/publishWeek",
	({ seasonId, weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsPublishingWeek(true));

		axiosInstance
			.post(`/weeks/${weekId}/publish`)
			.then((data) => {
				dispatch(setIsPublishingWeek(false));
				toastSuccess(data?.data?.message ?? "Week published successfully");
				dispatch(getAllMatchesAPI({ seasonId, weekId }));
				dispatch(setShowPublishWeekModal(false));
			})
			.catch((error) => {
				dispatch(setIsPublishingWeek(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const getAllWeeksAPI = createAsyncThunk(
	"fixtures/getAllWeeks",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllWeeks(true));
		axiosInstance
			.get(`/weeks/season/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingAllWeeks(false));
				const weeks = Array.isArray(data?.data?.data)
					? data?.data?.data.reverse()
					: [];
				dispatch(setWeeks(weeks));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllWeeks(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getWeeksForDropdownAPI = createAsyncThunk(
	"fixtures/getWeeksForDropdown",
	({ seasonId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllWeeks(true));
		axiosInstance
			.get(`/weeks/season/${seasonId}`)
			.then((data) => {
				dispatch(setIsFetchingAllWeeks(false));
				const weeks = Array.isArray(data?.data?.data)
					? data?.data?.data.reverse()
					: [];
				dispatch(setDropdownWeeks(weeks));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllWeeks(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificWeekAPI = createAsyncThunk(
	"fixtures/getSpecificWeek",
	({ weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificWeek(true));
		axiosInstance
			.get(`/weeks/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingSpecificWeek(false));
				dispatch(setSpecificWeek(data.data?.data));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificWeek(false));
				toastError(error?.response?.data?.message);
			});
	}
);

// Matches
export const createMatchAPI = createAsyncThunk(
	"fixtures/createMatch",
	(
		{ homeTeamId, awayTeamId, weekId, seasonId, fixtureDateTime }: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsCreatingMatch(true));

		axiosInstance
			.post(`/fixtures`, {
				homeTeamId,
				awayTeamId,
				weekId,
				seasonId,
				fixtureDateTime,
			})
			.then((data) => {
				dispatch(setIsCreatingMatch(false));
				toastSuccess(data?.data?.message ?? "Match added successfully");
				dispatch(getAllMatchesAPI({ seasonId, weekId }));
				dispatch(setShowCreateMatchModal(false));
			})
			.catch((error) => {
				dispatch(setIsCreatingMatch(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const editMatchAPI = createAsyncThunk(
	"fixtures/editMatch",
	(
		{
			homeTeamId,
			awayTeamId,
			weekId,
			seasonId,
			fixtureDateTime,
			matchId,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsEditingMatch(true));

		axiosInstance
			.patch(`/fixtures/${matchId}`, {
				homeTeamId,
				awayTeamId,
				weekId,
				seasonId,
				fixtureDateTime,
			})
			.then((data) => {
				dispatch(setIsEditingMatch(false));
				toastSuccess(data?.data?.message ?? "Match updated successfully");
				dispatch(getAllMatchesAPI({ seasonId, weekId }));
				dispatch(setShowEditMatchModal(false));
			})
			.catch((error) => {
				dispatch(setIsEditingMatch(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const deleteMatchAPI = createAsyncThunk(
	"fixtures/deleteMatch",
	({ weekId, seasonId, matchId }: FieldValues, { dispatch }) => {
		dispatch(setIsDeletingMatch(true));

		axiosInstance
			.delete(`/fixtures/${matchId}`)
			.then((data) => {
				dispatch(setIsDeletingMatch(false));
				toastSuccess(data?.data?.message ?? "Match deleted successfully");
				dispatch(getAllMatchesAPI({ seasonId, weekId }));
				dispatch(setShowDeleteMatchModal(false));
			})
			.catch((error) => {
				dispatch(setIsDeletingMatch(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const getAllMatchesAPI = createAsyncThunk(
	"fixtures/getAllMatches",
	({ seasonId, weekId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingMatches(true));
		axiosInstance
			.get(`/fixtures/season/${seasonId}/week/${weekId}`)
			.then((data) => {
				dispatch(setIsFetchingMatches(false));
				const matches = Array.isArray(data?.data?.data)
					? data?.data?.data.reverse()
					: [];
				dispatch(setMatches(matches));
			})
			.catch((error) => {
				dispatch(setIsFetchingMatches(false));
				toastError(error?.response?.data?.message);
			});
	}
);
