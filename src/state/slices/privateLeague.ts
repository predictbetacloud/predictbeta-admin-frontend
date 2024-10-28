import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import {
  UserPosition,
  PrivateLeagueItem,
  PrivateLeagueState,
} from "../../types/types";

const initialState: PrivateLeagueState = {
  allPrivateLeagues: [],
  specificPrivateLeague: null,
  specificPrivateLeagueLeaderboard: [],
  isCreatingPrivateLeague: false,
  isDeletingPrivateLeague: false,
  isEditingPrivateLeague: false,
  isLeavingPrivateLeague: false,
  isFetchingAllPrivateLeagues: false,
  isFetchingSpecificPrivateLeague: false,
  isFetchingSpecificPrivateLeagueSeasonLeaderboard: false,
  isFetchingSpecificPrivateLeagueWeekLeaderboard: false,
  isJoiningPrivateLeague: false,
  showSharePrivateLeagueModal: false,
  showLeavePrivateLeagueModal: false,
  showDeletePrivateLeagueModal: false,
};

export const privateLeagueSlice = createSlice({
  name: "privateLeague",
  initialState,
  reducers: {
    setAllPrivateLeagues: (
      state,
      action: PayloadAction<PrivateLeagueItem[]>
    ) => {
      state.allPrivateLeagues = action.payload;
    },
    setSpecificPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueItem | null>
    ) => {
      state.specificPrivateLeague = action.payload;
    },
    setSpecificPrivateLeagueLeaderboard: (
      state,
      action: PayloadAction<UserPosition[]>
    ) => {
      state.specificPrivateLeagueLeaderboard = action.payload;
    },
    setIsFetchingAllPrivateLeagues: (
      state,
      action: PayloadAction<PrivateLeagueState["isFetchingAllPrivateLeagues"]>
    ) => {
      state.isFetchingAllPrivateLeagues = action.payload;
    },
    setIsFetchingSpecificPrivateLeague: (
      state,
      action: PayloadAction<
        PrivateLeagueState["isFetchingSpecificPrivateLeague"]
      >
    ) => {
      state.isFetchingSpecificPrivateLeague = action.payload;
    },
    setIsJoiningPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueState["isJoiningPrivateLeague"]>
    ) => {
      state.isJoiningPrivateLeague = action.payload;
    },
    setIsCreatingPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueState["isCreatingPrivateLeague"]>
    ) => {
      state.isCreatingPrivateLeague = action.payload;
    },
    setIsEditingPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueState["isEditingPrivateLeague"]>
    ) => {
      state.isEditingPrivateLeague = action.payload;
    },
    setIsDeletingPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueState["isDeletingPrivateLeague"]>
    ) => {
      state.isDeletingPrivateLeague = action.payload;
    },
    setIsLeavingPrivateLeague: (
      state,
      action: PayloadAction<PrivateLeagueState["isLeavingPrivateLeague"]>
    ) => {
      state.isLeavingPrivateLeague = action.payload;
    },
    setIsFetchingSpecificPrivateLeagueWeekLeaderboard: (
      state,
      action: PayloadAction<
        PrivateLeagueState["isFetchingSpecificPrivateLeagueWeekLeaderboard"]
      >
    ) => {
      state.isFetchingSpecificPrivateLeagueWeekLeaderboard = action.payload;
    },
    setIsFetchingSpecificPrivateLeagueSeasonLeaderboard: (
      state,
      action: PayloadAction<
        PrivateLeagueState["isFetchingSpecificPrivateLeagueSeasonLeaderboard"]
      >
    ) => {
      state.isFetchingSpecificPrivateLeagueSeasonLeaderboard = action.payload;
    },
    setShowSharePrivateLeagueModal: (
      state,
      action: PayloadAction<PrivateLeagueState["showSharePrivateLeagueModal"]>
    ) => {
      state.showSharePrivateLeagueModal = action.payload;
    },
    setShowLeavePrivateLeagueModal: (
      state,
      action: PayloadAction<PrivateLeagueState["showLeavePrivateLeagueModal"]>
    ) => {
      state.showLeavePrivateLeagueModal = action.payload;
    },
    setShowDeletePrivateLeagueModal: (
      state,
      action: PayloadAction<PrivateLeagueState["showDeletePrivateLeagueModal"]>
    ) => {
      state.showDeletePrivateLeagueModal = action.payload;
    },
  },
});

export const {
  setAllPrivateLeagues,
  setSpecificPrivateLeague,
  setIsCreatingPrivateLeague,
  setIsDeletingPrivateLeague,
  setIsEditingPrivateLeague,
  setIsJoiningPrivateLeague,
  setIsLeavingPrivateLeague,
  setIsFetchingAllPrivateLeagues,
  setIsFetchingSpecificPrivateLeague,
  setSpecificPrivateLeagueLeaderboard,
  setIsFetchingSpecificPrivateLeagueSeasonLeaderboard,
  setIsFetchingSpecificPrivateLeagueWeekLeaderboard,
  setShowSharePrivateLeagueModal,
  setShowLeavePrivateLeagueModal,
  setShowDeletePrivateLeagueModal,
} = privateLeagueSlice.actions;

export const selectAllPrivateLeagues = (state: RootState) =>
  state.privateLeague.allPrivateLeagues;

export const selectSpecificPrivateLeague = (state: RootState) =>
  state.privateLeague.specificPrivateLeague;

export const selectSpecificPrivateLeagueLeaderboard = (state: RootState) =>
  state.privateLeague.specificPrivateLeagueLeaderboard;

export const selectIsFetchingAllPrivateLeagues = (state: RootState) =>
  state.privateLeague.isFetchingAllPrivateLeagues;

export const selectIsFetchingSpecificPrivateLeague = (state: RootState) =>
  state.privateLeague.isFetchingSpecificPrivateLeague;

export const selectIsFetchingSpecificPrivateLeagueWeekLeaderboard = (
  state: RootState
) => state.privateLeague.isFetchingSpecificPrivateLeagueWeekLeaderboard;

export const selectIsFetchingSpecificPrivateLeagueSeasonLeaderboard = (
  state: RootState
) => state.privateLeague.isFetchingSpecificPrivateLeagueSeasonLeaderboard;

export const selectIsCreatingPrivateLeague = (state: RootState) =>
  state.privateLeague.isCreatingPrivateLeague;

export const selectIsDeletingPrivateLeague = (state: RootState) =>
  state.privateLeague.isDeletingPrivateLeague;

export const selectIsEditingPrivateLeague = (state: RootState) =>
  state.privateLeague.isEditingPrivateLeague;

export const selectIsJoiningPrivateLeague = (state: RootState) =>
  state.privateLeague.isJoiningPrivateLeague;

export const selectIsLeavingPrivateLeague = (state: RootState) =>
  state.privateLeague.isLeavingPrivateLeague;

export const selectShowSharePrivateLeagueModal = (state: RootState) =>
  state.privateLeague.showSharePrivateLeagueModal;

export const selectShowLeavePrivateLeagueModal = (state: RootState) =>
  state.privateLeague.showLeavePrivateLeagueModal;

export const selectShowDeletePrivateLeagueModal = (state: RootState) =>
  state.privateLeague.showDeletePrivateLeagueModal;
