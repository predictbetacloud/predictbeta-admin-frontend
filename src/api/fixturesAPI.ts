import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setCompetitions,
	setDropdownWeeks,
	setIsCreatingMatch,
	setIsCreatingSeason,
	setIsCreatingWeek,
	setIsDeletingMatch,
	setIsEditingMatch,
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingCompetitions,
	setIsFetchingMatches,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setIsFetchingSpecificWeekPrediction,
	setIsFetchingSpecificWeekResults,
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
	setSpecificWeekPrediction,
	setSpecificWeekResults,
	setWeeks,
} from "../state/slices/fixtures";
import { createCancelableThunk } from "./helper";

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

// export const getAllSeasonsAPI = createAsyncThunk(
// 	"fixtures/getAllSeasons",
// 	({ params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllSeasons(true));
// 		axiosInstance
// 			.get(`/seasons`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingAllSeasons(false));
// 				dispatch(setSeasons(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllSeasons(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllSeasonsAPI = createCancelableThunk(
	"fixtures/getAllSeasons",
	"getAllSeasons",
	() => `/seasons`,
	setIsFetchingAllSeasons,
	setSeasons
);

// export const getSpecificSeasonAPI = createAsyncThunk(
// 	"fixtures/getSpecificSeason",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificSeason(true));
// 		axiosInstance
// 			.get(`/seasons/${seasonId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificSeason(false));
// 				dispatch(setSpecificSeason(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificSeason(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificSeasonAPI = createCancelableThunk(
	"fixtures/getSpecificSeason",
	"getSpecificSeason",
	({ seasonId }) => `/seasons/${seasonId}`,
	setIsFetchingSpecificSeason,
	setSpecificSeason
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
		{ weekId, fixtureResults, scorers, timeOfFirstGoal }: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsSubmittingWeekResult(true));

		axiosInstance
			.post(`/weeks/${weekId}/submit-result`, {
				fixtureResults,
				scorers,
				timeOfFirstGoal,
			})
			.then((data) => {
				dispatch(setIsSubmittingWeekResult(false));
				toastSuccess(data?.data?.message ?? "Result submitted successfully");
				window.location.reload();
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

// export const getAllWeeksAPI = createAsyncThunk(
// 	"fixtures/getAllWeeks",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllWeeks(true));
// 		axiosInstance
// 			.get(`/weeks/season/${seasonId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				const weeks = Array.isArray(data?.data?.data)
// 					? data?.data?.data.reverse()
// 					: [];
// 				dispatch(setWeeks(weeks));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllWeeksAPI = createCancelableThunk(
	"fixtures/getAllWeeks",
	"getAllWeeks",
	({ seasonId }) => `/weeks/season/${seasonId}`,
	setIsFetchingAllWeeks,
	setWeeks
);

// export const getWeeksForDropdownAPI = createAsyncThunk(
// 	"fixtures/getWeeksForDropdown",
// 	({ seasonId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllWeeks(true));
// 		axiosInstance
// 			.get(`/weeks/season/${seasonId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				const weeks = Array.isArray(data?.data?.data)
// 					? data?.data?.data.reverse()
// 					: [];
// 				dispatch(setDropdownWeeks(weeks));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllWeeks(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getWeeksForDropdownAPI = createCancelableThunk(
	"fixtures/getWeeksForDropdown",
	"getWeeksForDropdown",
	({ seasonId }) => `/weeks/season/${seasonId}`,
	setIsFetchingAllWeeks,
	setDropdownWeeks
);

// export const getSpecificWeekAPI = createAsyncThunk(
// 	"fixtures/getSpecificWeek",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificWeek(true));
// 		axiosInstance
// 			.get(`/weeks/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificWeek(false));
// 				dispatch(setSpecificWeek(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificWeek(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificWeekAPI = createCancelableThunk(
	"fixtures/getSpecificWeek",
	"getSpecificWeek",
	({ weekId }) => `/weeks/${weekId}`,
	setIsFetchingSpecificWeek,
	setSpecificWeek
);

// Matches
export const createMatchAPI = createAsyncThunk(
	"fixtures/createMatch",
	(
		{
			homeTeamId,
			awayTeamId,
			weekId,
			seasonId,
			fixtureDateTime,
			leagueId,
			competitionType,
			teamType,
		}: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsCreatingMatch(true));

		axiosInstance
			.post(`/fixtures`, {
				homeTeamId,
				awayTeamId,
				weekId,
				seasonId,
				leagueId,
				fixtureDateTime,
				competitionType,
				teamType,
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
			leagueId,
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
				leagueId,
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

// export const getSpecificWeekResultsAPI = createAsyncThunk(
// 	"fixtures/getSpecificWeekResults",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificWeekResults(true));
// 		axiosInstance
// 			.get(`/weeks/${weekId}/result`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificWeekResults(false));
// 				const results = data?.data?.data;
// 				dispatch(setSpecificWeekResults(results));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificWeekResults(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificWeekResultsAPI = createCancelableThunk(
	"fixtures/getSpecificWeekResults",
	"getSpecificWeekResults",
	({ weekId }) => `/weeks/${weekId}/result`,
	setIsFetchingSpecificWeekResults,
	setSpecificWeekResults
);

// export const getAllMatchesAPI = createAsyncThunk(
// 	"fixtures/getAllMatches",
// 	({ seasonId, weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingMatches(true));
// 		axiosInstance
// 			.get(`/fixtures/season/${seasonId}/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingMatches(false));
// 				const matches = Array.isArray(data?.data?.data)
// 					? data?.data?.data.reverse()
// 					: [];
// 				dispatch(setMatches(matches));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingMatches(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllMatchesAPI = createCancelableThunk(
	"fixtures/getAllMatches",
	"getAllMatches",
	({ seasonId, weekId }) => `/fixtures/season/${seasonId}/week/${weekId}`,
	setIsFetchingMatches,
	setMatches
);

// export const getAllCompetitionsByTypeAPI = createAsyncThunk(
// 	"fixtures/getAllCompetitionsByType",
// 	({ type }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingCompetitions(true));
// 		axiosInstance
// 			.get(`/teams/league/type/${type}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingCompetitions(false));
// 				const competitions = data?.data?.data;
// 				dispatch(setCompetitions(competitions));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingCompetitions(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllCompetitionsByTypeAPI = createCancelableThunk(
	"fixtures/getAllCompetitionsByType",
	"getAllCompetitionsByType",
	({ type }) => `/teams/league/type/${type}`,
	setIsFetchingCompetitions,
	setCompetitions
);

export const getSpecificUserWeekPredictionAPI = createCancelableThunk(
	"fixtures/getSpecificUserWeekPrediction",
	"getSpecificUserWeekPrediction",
	({ username, weekId }) =>
		`/leaderboard/predictions/user/${username}/week/${weekId}`,
	setIsFetchingSpecificWeekPrediction,
	setSpecificWeekPrediction
);
