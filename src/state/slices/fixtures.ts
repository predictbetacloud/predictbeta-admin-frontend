import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { FixtureState, IMatch, ISeason, IWeek } from "../../types/types";

const initialState: FixtureState = {
	seasons: [],
	specificSeason: null,
	weeks: [],
	dropDownWeeks: [],
	specificWeek: null,
	matches: [],
	isFetchingSeasons: false,
	isFetchingSpecificSeason: false,
	isFetchingWeeks: false,
	isFetchingSpecificWeek: false,
	isPublishingWeek: false,
	isFetchingMatches: false,
	isCreatingSeason: false,
	isCreatingWeek: false,
	isCreatingMatch: false,
	isEditingMatch: false,
	isDeletingMatch: false,
	showCreateSeasonModal: false,
	showCreateWeekModal: false,
	showCreateMatchModal: false,
	showPublishWeekModal: false,
	showEditMatchModal: false,
	showDeleteMatchModal: false,
};

export const fixtureSlice = createSlice({
	name: "fixture",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setSeasons: (state, action: PayloadAction<ISeason[]>) => {
			state.seasons = action.payload;
		},
		setSpecificSeason: (state, action: PayloadAction<ISeason>) => {
			state.specificSeason = action.payload;
		},
		setWeeks: (state, action: PayloadAction<IWeek[]>) => {
			state.weeks = action.payload;
		},
		setDropdownWeeks: (state, action: PayloadAction<IWeek[]>) => {
			state.dropDownWeeks = action.payload;
		},
		setSpecificWeek: (state, action: PayloadAction<IWeek>) => {
			state.specificWeek = action.payload;
		},
		setMatches: (state, action: PayloadAction<IMatch[]>) => {
			state.matches = action.payload;
		},
		setIsFetchingAllSeasons: (
			state,
			action: PayloadAction<FixtureState["isFetchingSeasons"]>
		) => {
			state.isFetchingSeasons = action.payload;
		},
		setIsFetchingSpecificSeason: (
			state,
			action: PayloadAction<FixtureState["isFetchingSpecificSeason"]>
		) => {
			state.isFetchingSpecificSeason = action.payload;
		},
		setIsFetchingAllWeeks: (
			state,
			action: PayloadAction<FixtureState["isFetchingWeeks"]>
		) => {
			state.isFetchingWeeks = action.payload;
		},
		setIsFetchingSpecificWeek: (
			state,
			action: PayloadAction<FixtureState["isFetchingSpecificWeek"]>
		) => {
			state.isFetchingSpecificWeek = action.payload;
		},
		setIsPublishingWeek: (
			state,
			action: PayloadAction<FixtureState["isPublishingWeek"]>
		) => {
			state.isPublishingWeek = action.payload;
		},
		setIsFetchingMatches: (
			state,
			action: PayloadAction<FixtureState["isFetchingMatches"]>
		) => {
			state.isFetchingMatches = action.payload;
		},
		setIsCreatingSeason: (
			state,
			action: PayloadAction<FixtureState["isCreatingSeason"]>
		) => {
			state.isCreatingSeason = action.payload;
		},
		setIsCreatingWeek: (
			state,
			action: PayloadAction<FixtureState["isCreatingWeek"]>
		) => {
			state.isCreatingWeek = action.payload;
		},
		setIsCreatingMatch: (
			state,
			action: PayloadAction<FixtureState["isCreatingMatch"]>
		) => {
			state.isCreatingMatch = action.payload;
		},
		setIsEditingMatch: (
			state,
			action: PayloadAction<FixtureState["isEditingMatch"]>
		) => {
			state.isEditingMatch = action.payload;
		},
		setIsDeletingMatch: (
			state,
			action: PayloadAction<FixtureState["isDeletingMatch"]>
		) => {
			state.isDeletingMatch = action.payload;
		},
		setShowCreateSeasonModal: (
			state,
			action: PayloadAction<FixtureState["showCreateSeasonModal"]>
		) => {
			state.showCreateSeasonModal = action.payload;
		},
		setShowCreateWeekModal: (
			state,
			action: PayloadAction<FixtureState["showCreateWeekModal"]>
		) => {
			state.showCreateWeekModal = action.payload;
		},
		setShowCreateMatchModal: (
			state,
			action: PayloadAction<FixtureState["showCreateMatchModal"]>
		) => {
			state.showCreateMatchModal = action.payload;
		},
		setShowEditMatchModal: (
			state,
			action: PayloadAction<FixtureState["showEditMatchModal"]>
		) => {
			state.showEditMatchModal = action.payload;
		},
		setShowDeleteMatchModal: (
			state,
			action: PayloadAction<FixtureState["showDeleteMatchModal"]>
		) => {
			state.showDeleteMatchModal = action.payload;
		},
		setShowPublishWeekModal: (
			state,
			action: PayloadAction<FixtureState["showPublishWeekModal"]>
		) => {
			state.showPublishWeekModal = action.payload;
		},
	},
});

export const {
	setSeasons,
	setWeeks,
	setDropdownWeeks,
	setSpecificSeason,
	setSpecificWeek,
	setMatches,
	setIsFetchingAllSeasons,
	setIsFetchingAllWeeks,
	setIsFetchingSpecificSeason,
	setIsFetchingSpecificWeek,
	setIsFetchingMatches,
	setIsPublishingWeek,
	setIsCreatingSeason,
	setIsCreatingWeek,
	setIsCreatingMatch,
	setIsEditingMatch,
	setIsDeletingMatch,
	setShowCreateSeasonModal,
	setShowCreateWeekModal,
	setShowCreateMatchModal,
	setShowEditMatchModal,
	setShowDeleteMatchModal,
	setShowPublishWeekModal,
} = fixtureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllSeasons = (state: RootState) => state.fixtures.seasons;

export const selectSpecificSeason = (state: RootState) =>
	state.fixtures.specificSeason;

export const selectAllWeeks = (state: RootState) => state.fixtures.weeks;

export const selectDropdownWeeks = (state: RootState) =>
	state.fixtures.dropDownWeeks;

export const selectSpecificWeek = (state: RootState) =>
	state.fixtures.specificWeek;

export const selectMatches = (state: RootState) => state.fixtures.matches;

export const selectIsFetchingAllSeasons = (state: RootState) =>
	state.fixtures.isFetchingSeasons;

export const selectIsFetchingSpecificSeasons = (state: RootState) =>
	state.fixtures.isFetchingSpecificSeason;

export const selectIsFetchingAllWeeks = (state: RootState) =>
	state.fixtures.isFetchingWeeks;

export const selectIsFetchingSpecificWeek = (state: RootState) =>
	state.fixtures.isFetchingSpecificWeek;

export const selectIsPublishingWeek = (state: RootState) =>
	state.fixtures.isPublishingWeek;

export const selectIsFetchingMatches = (state: RootState) =>
	state.fixtures.isFetchingMatches;

export const selectIsCreatingSeason = (state: RootState) =>
	state.fixtures.isCreatingSeason;

export const selectIsCreatingWeek = (state: RootState) =>
	state.fixtures.isCreatingWeek;

export const selectIsCreatingMatch = (state: RootState) =>
	state.fixtures.isCreatingMatch;

export const selectIsEditingMatch = (state: RootState) =>
	state.fixtures.isEditingMatch;

export const selectIsDeletingMatch = (state: RootState) =>
	state.fixtures.isDeletingMatch;

export const selectShowCreateSeasonModal = (state: RootState) =>
	state.fixtures.showCreateSeasonModal;

export const selectShowCreateWeekModal = (state: RootState) =>
	state.fixtures.showCreateWeekModal;

export const selectShowCreateMatchModal = (state: RootState) =>
	state.fixtures.showCreateMatchModal;

export const selectShowEditMatchModal = (state: RootState) =>
	state.fixtures.showEditMatchModal;

export const selectShowDeleteMatchModal = (state: RootState) =>
	state.fixtures.showDeleteMatchModal;

export const selectShowPublishWeekModal = (state: RootState) =>
	state.fixtures.showPublishWeekModal;
