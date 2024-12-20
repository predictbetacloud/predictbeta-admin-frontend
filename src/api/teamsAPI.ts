import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setAllPlayers,
	setClubLeagueTeams,
	setClubTeams,
	setCountryTeams,
	setIsCreatingPlayer,
	setIsCreatingTeam,
	setIsFetchingAllPlayers,
	setIsFetchingAllTeams,
	setIsFetchingSpecificTeam,
	setIsFetchingSpecificTeamPlayers,
	setIsUpdatingTeam,
	setShowAddPlayerModal,
	setSpecificTeam,
	setSpecificTeamPlayers,
} from "../state/slices/teams";
import { globalRouter } from "../utils/utils";
import { createCancelableThunk } from "./helper";

export const createTeamAPI = createAsyncThunk(
	"teams/create",
	({ name, shortName, clubLogo }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingTeam(true));

		axiosInstance
			.post(
				`/teams`,
				{ name, shortName, clubLogo },
				{ headers: { "Content-Type": "multipart/form-data" } }
			)
			.then((data) => {
				dispatch(setIsCreatingTeam(false));
				toastSuccess(data?.data?.message ?? "Team added successfully");
				if (globalRouter.navigate) {
					globalRouter.navigate("/dashboard/teams");
				}
			})
			.catch((error) => {
				dispatch(setIsCreatingTeam(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const updateTeamAPI = createAsyncThunk(
	"teams/edit",
	({ name, shortName, clubLogo, clubId }: FieldValues, { dispatch }) => {
		dispatch(setIsUpdatingTeam(true));

		axiosInstance
			.patch(
				`/teams/${clubId}`,
				{ name, shortName, clubLogo },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((data) => {
				dispatch(setIsUpdatingTeam(false));
				toastSuccess(data?.data?.message ?? "Team updated successfully");
				if (globalRouter.navigate) {
					globalRouter.navigate("/dashboard/teams");
				}
			})
			.catch((error) => {
				dispatch(setIsUpdatingTeam(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

// export const getAllClubTeamsAPI = createAsyncThunk(
// 	"teams/getAllClubTeams",
// 	({ params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllTeams(true));
// 		axiosInstance
// 			.get(`/teams/clubs`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingAllTeams(false));
// 				dispatch(setClubTeams(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllTeams(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllClubTeamsAPI = createCancelableThunk(
	"teams/getAllClubTeams",
	"getAllClubTeams",
	() => `/teams/clubs`,
	setIsFetchingAllTeams,
	setClubTeams
);

export const getAllClubLeagueTeamsAPI = createCancelableThunk(
	"teams/getAllClubLeagueTeams",
	"getAllClubLeagueTeams",
	({clubOrCountryId, leagueId, competitionTypeId}:FieldValues) => `/teams?teamType=${clubOrCountryId}&leagueId=${leagueId}&competitionType=${competitionTypeId}`,
	setIsFetchingAllTeams,
	setClubLeagueTeams
);

// export const getSpecificClubTeamAPI = createAsyncThunk(
// 	"teams/getSpecificClub",
// 	({ clubId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificTeam(true));
// 		axiosInstance
// 			.get(`/teams/${clubId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificTeam(false));
// 				dispatch(setSpecificTeam(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificTeam(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificClubTeamAPI = createCancelableThunk(
	"teams/getSpecificClub",
	"getSpecificClub",
	({ clubId }) => `/teams/${clubId}`,
	setIsFetchingSpecificTeam,
	setSpecificTeam
);

// export const getSpecificClubPlayersAPI = createAsyncThunk(
// 	"teams/getSpecificClubPlayers",
// 	({ clubId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificTeamPlayers(true));
// 		axiosInstance
// 			.get(`/teams/${clubId}/players`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificTeamPlayers(false));
// 				dispatch(setSpecificTeamPlayers(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificTeamPlayers(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificClubPlayersAPI = createCancelableThunk(
	"teams/getSpecificClubPlayers",
	"getSpecificClubPlayers",
	({ clubId }) => `/teams/${clubId}/players`,
	setIsFetchingSpecificTeamPlayers,
	setSpecificTeamPlayers
);

// export const getAllCountryTeamsAPI = createAsyncThunk(
// 	"teams/getAllCountryTeams",
// 	({ params }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllTeams(true));
// 		axiosInstance
// 			.get(`/teams/countries`, { params })
// 			.then((data) => {
// 				dispatch(setIsFetchingAllTeams(false));
// 				dispatch(setCountryTeams(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllTeams(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllCountryTeamsAPI = createCancelableThunk(
	"teams/getAllCountryTeams",
	"getAllCountryTeams",
	() => `/teams/countries`,
	setIsFetchingAllTeams,
	setCountryTeams
);

// export const getSpecificCountryTeamAPI = createAsyncThunk(
// 	"teams/getSpecificCountry",
// 	({ clubId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificTeam(true));
// 		axiosInstance
// 			.get(`/teams/${clubId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificTeam(false));
// 				dispatch(setSpecificTeam(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificTeam(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getSpecificCountryTeamAPI = createCancelableThunk(
	"teams/getSpecificCountry",
	"getSpecificCountry",
	({ clubId }) => `/teams/${clubId}`,
	setIsFetchingSpecificTeam,
	setSpecificTeam
);

// export const getSpecificCountryPlayersAPI = createAsyncThunk(
// 	"teams/getSpecificCountryPlayers",
// 	({ clubId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingSpecificTeamPlayers(true));
// 		axiosInstance
// 			.get(`/teams/${clubId}/players`)
// 			.then((data) => {
// 				dispatch(setIsFetchingSpecificTeamPlayers(false));
// 				dispatch(setSpecificTeamPlayers(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingSpecificTeamPlayers(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );z

export const getSpecificCountryPlayersAPI = createCancelableThunk(
	"teams/getSpecificCountryPlayers",
	"getSpecificCountryPlayers",
	({ clubId }) => `/teams/${clubId}/players`,
	setIsFetchingSpecificTeamPlayers,
	setSpecificTeamPlayers
);

export const addPlayerAPI = createAsyncThunk(
	"teams/addPlayer",
	({ players, teamId }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingPlayer(true));

		axiosInstance
			.post(`/teams/${teamId}/players`, { players })
			.then((data) => {
				dispatch(setIsCreatingPlayer(false));
				dispatch(setShowAddPlayerModal(false));
				dispatch(getSpecificClubPlayersAPI({ clubId: teamId }));
				toastSuccess(data?.data?.message ?? "Player added successfully");
			})
			.catch((error) => {
				dispatch(setIsCreatingPlayer(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const editPlayerAPI = createAsyncThunk(
	"teams/addPlayer",
	({ players, teamId }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingPlayer(true));

		axiosInstance
			.post(`/teams/${teamId}/players`, { players })
			.then((data) => {
				dispatch(setIsCreatingPlayer(false));
				dispatch(setShowAddPlayerModal(false));
				dispatch(getSpecificClubPlayersAPI({ clubId: teamId }));
				toastSuccess(data?.data?.message ?? "Player added successfully");
			})
			.catch((error) => {
				dispatch(setIsCreatingPlayer(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const deletetPlayerAPI = createAsyncThunk(
	"teams/deletePlayer",
	({ playerId, teamId }: FieldValues, { dispatch }) => {
		dispatch(setIsCreatingPlayer(true));

		axiosInstance
			.post(`/teams/${teamId}/players`, { playerId })
			.then((data) => {
				dispatch(setIsCreatingPlayer(false));
				dispatch(setShowAddPlayerModal(false));
				dispatch(getSpecificClubPlayersAPI({ clubId: teamId }));
				toastSuccess(data?.data?.message ?? "Player added successfully");
			})
			.catch((error) => {
				dispatch(setIsCreatingPlayer(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

// export const getAllPlayersAPI = createAsyncThunk(
// 	"teams/getAllPlayers",
// 	({ weekId }: FieldValues, { dispatch }) => {
// 		dispatch(setIsFetchingAllPlayers(true));
// 		axiosInstance
// 			.get(`/players/week/${weekId}`)
// 			.then((data) => {
// 				dispatch(setIsFetchingAllPlayers(false));
// 				dispatch(setAllPlayers(data.data?.data));
// 			})
// 			.catch((error) => {
// 				dispatch(setIsFetchingAllPlayers(false));
// 				toastError(error?.response?.data?.message);
// 			});
// 	}
// );

export const getAllPlayersAPI = createCancelableThunk(
	"teams/getAllPlayers",
	"getAllPlayers",
	({ weekId }) => `/players/week/${weekId}`,
	setIsFetchingAllPlayers,
	setAllPlayers
);
