import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import {
  FixtureState,
  IGetSpecificWeekDeciders,
  IMatch,
  ISeason,
  IWeek,
  IWeekPrediction,
  IWeekResult,
  TCompetitions,
} from "../../types/types";

const initialState: FixtureState = {
  seasons: [],
  specificSeason: null,
  weeks: [],
  dropDownWeeks: [],
  specificWeek: null,
  specificWeekResults: null,
  matches: [],
  competitions: [],
  specificWeekDeciders: [],
  specificWeekPrediction: null,
  isFetchingSeasons: true,
  isFetchingSpecificSeason: true,
  isFetchingWeeks: true,
  isFetchingSpecificWeek: true,
  isFetchingSpecificWeekResults: true,
  isPublishingWeek: false,
  isSubmittingWeekResult: false,
  isFetchingCompetitions: false,
  isFetchingSpecificWeekPrediction: false,
  isFetchingMatches: true,
  isCreatingSeason: false,
  isCreatingWeek: false,
  isCreatingMatch: false,
  isEditingMatch: false,
  isDeletingMatch: false,
  showCreateSeasonModal: false,
  showCreateWeekModal: false,
  isCreatingDeciders: false,
  showCreateDecidersModal: false,
  isFetchingSpecificWeekDeciders: true,
  showCreateMatchModal: false,
  showPublishWeekModal: false,
  showEditMatchModal: false,
  showDeleteMatchModal: false,

  IsFetchingSpecificWeekDeciders: false,
};

export const fixtureSlice = createSlice({
  name: "fixture",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSeasons: (state, action: PayloadAction<ISeason[]>) => {
      state.seasons = action.payload.reverse();
    },
    setSpecificSeason: (state, action: PayloadAction<ISeason>) => {
      state.specificSeason = action.payload;
    },
    setWeeks: (state, action: PayloadAction<IWeek[]>) => {
      const weeks = Array.isArray(action.payload)
        ? action.payload.reverse()
        : [];
      state.weeks = weeks;
    },
    setDropdownWeeks: (state, action: PayloadAction<IWeek[]>) => {
      const weeks = Array.isArray(action.payload)
        ? action.payload.reverse()
        : [];
      state.dropDownWeeks = weeks;
    },
    setSpecificWeekDeciders: (
      state,
      action: PayloadAction<IGetSpecificWeekDeciders[]>
    ) => {
      const weeks = Array.isArray(action.payload)
        ? action.payload.reverse()
        : [];
      state.specificWeekDeciders = weeks;
    },
    setSpecificWeek: (state, action: PayloadAction<IWeek>) => {
      state.specificWeek = action.payload;
    },
    setSpecificWeekResults: (state, action: PayloadAction<IWeekResult>) => {
      state.specificWeekResults = action.payload;
    },
    setMatches: (state, action: PayloadAction<IMatch[]>) => {
      const matches = Array.isArray(action.payload)
        ? action.payload.reverse()
        : [];
      state.matches = matches;
    },
    setCompetitions: (state, action: PayloadAction<TCompetitions[]>) => {
      state.competitions = action.payload;
    },
    setSpecificWeekPrediction: (
      state,
      action: PayloadAction<IWeekPrediction | null>
    ) => {
      state.specificWeekPrediction = action.payload;
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
    setIsFetchingSpecificWeekDeciders: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeekDeciders"]>
    ) => {
      state.IsFetchingSpecificWeekDeciders = action.payload;
    },
    setIsFetchingSpecificWeek: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeek"]>
    ) => {
      state.isFetchingSpecificWeek = action.payload;
    },
    setIsFetchingSpecificWeekResults: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeekResults"]>
    ) => {
      state.isFetchingSpecificWeekResults = action.payload;
    },
    setIsSubmittingWeekResult: (
      state,
      action: PayloadAction<FixtureState["isSubmittingWeekResult"]>
    ) => {
      state.isSubmittingWeekResult = action.payload;
    },
    setIsPublishingWeek: (
      state,
      action: PayloadAction<FixtureState["isPublishingWeek"]>
    ) => {
      state.isPublishingWeek = action.payload;
    },
    setIsFetchingCompetitions: (
      state,
      action: PayloadAction<FixtureState["isFetchingCompetitions"]>
    ) => {
      state.isFetchingCompetitions = action.payload;
    },
    setIsFetchingSpecificWeekPrediction: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeekPrediction"]>
    ) => {
      state.isFetchingSpecificWeekPrediction = action.payload;
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
    setIsCreatingDeciders: (
      state,
      action: PayloadAction<FixtureState["isCreatingDeciders"]>
    ) => {
      state.isCreatingDeciders = action.payload;
    },
    setIsFetchingSpecificWeekDeciders: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeekDeciders"]>
    ) => {
      state.isFetchingSpecificWeekDeciders = action.payload;
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
    setShowCreateDecidersModal: (
      state,
      action: PayloadAction<FixtureState["showCreateDecidersModal"]>
    ) => {
      state.showCreateDecidersModal = action.payload;
    },
    setIsFetchingSpecificWeekDeciders: (
      state,
      action: PayloadAction<FixtureState["isFetchingSpecificWeekDeciders"]>
    ) => {
      state.isFetchingSpecificWeekDeciders = action.payload;
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
  setSpecificWeekResults,
  setCompetitions,
  setIsFetchingCompetitions,
  setMatches,
  setSpecificWeekPrediction,
  setIsFetchingAllSeasons,
  setIsFetchingAllWeeks,
  setIsFetchingSpecificSeason,
  setIsFetchingSpecificWeek,
  setIsFetchingSpecificWeekResults,
  setIsFetchingSpecificWeekPrediction,
  setIsFetchingMatches,
  setIsPublishingWeek,
  setIsSubmittingWeekResult,
  setIsCreatingSeason,
  setIsCreatingWeek,
  setIsCreatingMatch,
  setIsCreatingDeciders,
  setIsEditingMatch,
  setIsDeletingMatch,
  setShowCreateSeasonModal,
  setShowCreateWeekModal,
  setShowCreateMatchModal,
  setShowCreateDecidersModal,
  setIsFetchingSpecificWeekDeciders,
  setShowEditMatchModal,
  setShowDeleteMatchModal,
  setShowPublishWeekModal,
  setSpecificWeekDeciders,
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

export const selectSpecificWeekResults = (state: RootState) =>
  state.fixtures.specificWeekResults;

export const selectCompetitions = (state: RootState) =>
  state.fixtures.competitions;

export const selectMatches = (state: RootState) => state.fixtures.matches;

export const selectSpecificWeekPrediction = (state: RootState) =>
  state.fixtures.specificWeekPrediction;

export const selectIsFetchingAllSeasons = (state: RootState) =>
  state.fixtures.isFetchingSeasons;

export const selectIsFetchingSpecificSeasons = (state: RootState) =>
  state.fixtures.isFetchingSpecificSeason;

export const selectIsFetchingAllWeeks = (state: RootState) =>
  state.fixtures.isFetchingWeeks;

export const selectIsFetchingSpecificWeek = (state: RootState) =>
  state.fixtures.isFetchingSpecificWeek;

export const selectIsFetchingSpecificWeekResults = (state: RootState) =>
  state.fixtures.isFetchingSpecificWeekResults;

export const selectIsPublishingWeek = (state: RootState) =>
  state.fixtures.isPublishingWeek;

export const selectIsSubmittingWeekResult = (state: RootState) =>
  state.fixtures.isSubmittingWeekResult;

export const selectIsFetchingSpecificWeekPrediction = (state: RootState) =>
  state.fixtures.isFetchingSpecificWeekPrediction;

export const selectIsFetchingCompetitions = (state: RootState) =>
  state.fixtures.isFetchingCompetitions;

export const selectIsFetchingMatches = (state: RootState) =>
  state.fixtures.isFetchingMatches;

export const selectIsCreatingSeason = (state: RootState) =>
  state.fixtures.isCreatingSeason;

export const selectIsCreatingDeciders = (state: RootState) =>
  state.fixtures.isCreatingDeciders;

export const selectIsFetchingSpecificWeekDeciders = (state: RootState) =>
  state.fixtures.isFetchingSpecificWeekDeciders;

export const selectIsCreatingWeek = (state: RootState) =>
  state.fixtures.isCreatingWeek;

export const selectIsCreatingMatch = (state: RootState) =>
  state.fixtures.isCreatingMatch;

export const selectIsEditingMatch = (state: RootState) =>
  state.fixtures.isEditingMatch;

export const selectIsDeletingMatch = (state: RootState) =>
  state.fixtures.isDeletingMatch;

export const selectShowCreateDecidersModal = (state: RootState) =>
  state.fixtures.showCreateDecidersModal;

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
