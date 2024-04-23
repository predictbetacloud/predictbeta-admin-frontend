import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { IClub, IPlayer, IPaginatedClubTeams, TeamState } from "../../types/types";

const sessionName = import.meta.env.VITE_REACT_APP_SLUG;
const search_query = localStorage.getItem(sessionName + "_search_query");

const initialState: TeamState = {
	clubTeams: null,
	searchQuery: search_query || "",
	specificTeam: null,
	specificTeamPlayers: [],
	allPlayers: [],
	noMoreTeams: false,
	isFetchingTeams: false,
	isCreatingTeam: false,
	isDeletingTeam: false,
	isUpdatingTeam: false,
	isFetchingAllPlayers: false,
	isFetchingSpecificTeam: false,
	isFetchingSpecificTeamPlayers: false,
	isCreatingPlayer: false,
	showAddPlayerModal: false,
	isDeletingPlayer: false,
	isUpdatingPlayer: false,
	showEditPlayerModal: false,
	showDeletePlayerModal: false,
};

export const teamsSlice = createSlice({
	name: "teams",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setClubTeams: (state, action: PayloadAction<IPaginatedClubTeams>) => {
			state.clubTeams = action.payload;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
			localStorage.setItem(sessionName + "_search_query", action.payload);
		},
		setSpecificTeam: (state, action: PayloadAction<IClub>) => {
			state.specificTeam = action.payload;
		},
		setSpecificTeamPlayers: (state, action: PayloadAction<IPlayer[]>) => {
			state.specificTeamPlayers = action.payload;
		},
		setAllPlayers: (state, action: PayloadAction<IPlayer[]>) => {
			state.allPlayers = action.payload;
		},
		setIsFetchingAllPlayers: (
			state,
			action: PayloadAction<TeamState["isFetchingAllPlayers"]>
		) => {
			state.isFetchingAllPlayers = action.payload;
		},
		setIsFetchingAllTeams: (
			state,
			action: PayloadAction<TeamState["isFetchingTeams"]>
		) => {
			state.isFetchingTeams = action.payload;
		},
		setIsFetchingSpecificTeam: (
			state,
			action: PayloadAction<TeamState["isFetchingSpecificTeam"]>
		) => {
			state.isFetchingSpecificTeam = action.payload;
		},
		setIsFetchingSpecificTeamPlayers: (
			state,
			action: PayloadAction<TeamState["isFetchingSpecificTeamPlayers"]>
		) => {
			state.isFetchingSpecificTeam = action.payload;
		},
		setIsCreatingTeam: (
			state,
			action: PayloadAction<TeamState["isCreatingTeam"]>
		) => {
			state.isCreatingTeam = action.payload;
		},
		setIsDeletingTeam: (
			state,
			action: PayloadAction<TeamState["isDeletingTeam"]>
		) => {
			state.isDeletingTeam = action.payload;
		},
		setIsUpdatingTeam: (
			state,
			action: PayloadAction<TeamState["isUpdatingTeam"]>
		) => {
			state.isUpdatingTeam = action.payload;
		},
		setIsCreatingPlayer: (
			state,
			action: PayloadAction<TeamState["isCreatingPlayer"]>
		) => {
			state.isCreatingPlayer = action.payload;
		},
		setIsUpdatingPlayer: (
			state,
			action: PayloadAction<TeamState["isUpdatingPlayer"]>
		) => {
			state.isUpdatingPlayer = action.payload;
		},
		setIsDeletingPlayer: (
			state,
			action: PayloadAction<TeamState["isDeletingPlayer"]>
		) => {
			state.isDeletingPlayer = action.payload;
		},
		setShowAddPlayerModal: (
			state,
			action: PayloadAction<TeamState["showAddPlayerModal"]>
		) => {
			state.showAddPlayerModal = action.payload;
		},
		setShowEditPlayerModal: (
			state,
			action: PayloadAction<TeamState["showEditPlayerModal"]>
		) => {
			state.showEditPlayerModal = action.payload;
		},
		setShowDeletePlayerModal: (
			state,
			action: PayloadAction<TeamState["showDeletePlayerModal"]>
		) => {
			state.showDeletePlayerModal = action.payload;
		},
	},
});

export const {
	setSearchQuery,
	setClubTeams,
	setSpecificTeam,
	setSpecificTeamPlayers,
	setAllPlayers,
	setIsFetchingAllPlayers,
	setIsDeletingTeam,
	setIsCreatingTeam,
	setIsUpdatingTeam,
	setIsFetchingAllTeams,
	setIsFetchingSpecificTeam,
	setIsFetchingSpecificTeamPlayers,
	setIsCreatingPlayer,
	setShowAddPlayerModal,
	setIsDeletingPlayer,
	setIsUpdatingPlayer,
	setShowDeletePlayerModal,
	setShowEditPlayerModal,
} = teamsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllClubTeams = (state: RootState) => state.teams.clubTeams;

export const selectSpecificTeam = (state: RootState) =>
	state.teams.specificTeam;

export const selectSpecificTeamPlayers = (state: RootState) =>
	state.teams.specificTeamPlayers;

export const selectAllPlayers = (state: RootState) => state.teams.allPlayers;

export const selectIsFetchingAllPlayers = (state: RootState) =>
	state.teams.isFetchingAllPlayers;

export const selectIsFetchingTeams = (state: RootState) =>
	state.teams.isFetchingTeams;

export const selectIsFetchingSpecificTeam = (state: RootState) =>
	state.teams.isFetchingSpecificTeam;

export const selectIsFetchingSpecificTeamPlayers = (state: RootState) =>
	state.teams.isFetchingSpecificTeamPlayers;

export const selectIsCreatingSpecificTeam = (state: RootState) =>
	state.teams.isCreatingTeam;

export const selectIsDeletingSpecificTeam = (state: RootState) =>
	state.teams.isDeletingTeam;

export const selectIsUpdatingSpecificTeam = (state: RootState) =>
	state.teams.isUpdatingTeam;

export const selectIsCreatingPlayer = (state: RootState) =>
	state.teams.isCreatingPlayer;

export const selectIsUpdatingPlayer = (state: RootState) =>
	state.teams.isUpdatingPlayer;

export const selectIsDeletingPlayer = (state: RootState) =>
	state.teams.isDeletingPlayer;

export const selectShowAddPlayerModal = (state: RootState) =>
	state.teams.showAddPlayerModal;

export const selectShowEditPlayerModal = (state: RootState) =>
	state.teams.showEditPlayerModal;

export const selectShowDeletePlayerModal = (state: RootState) =>
	state.teams.showDeletePlayerModal;
