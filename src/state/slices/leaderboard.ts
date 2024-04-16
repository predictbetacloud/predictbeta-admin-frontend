import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { LeaderboardItem, LeaderboardState } from "../../types/types";

const initialState: LeaderboardState = {
	leaderboard: [],
	isFetchingSeasonLeaderboard: false,
	isFetchingWeekLeaderboard: false,
};

export const leaderboardSlice = createSlice({
	name: "leaderboard",
	initialState,
	reducers: {
		setLeaderboard: (state, action: PayloadAction<LeaderboardItem[]>) => {
			state.leaderboard = action.payload;
		},
		setIsFetchingWeekLeaderboard: (
			state,
			action: PayloadAction<LeaderboardState["isFetchingWeekLeaderboard"]>
		) => {
			state.isFetchingWeekLeaderboard = action.payload;
		},
		setIsFetchingSeasonLeaderboard: (
			state,
			action: PayloadAction<LeaderboardState["isFetchingSeasonLeaderboard"]>
		) => {
			state.isFetchingSeasonLeaderboard = action.payload;
		},
	},
});

export const {
	setLeaderboard,
	setIsFetchingSeasonLeaderboard,
	setIsFetchingWeekLeaderboard,
} = leaderboardSlice.actions;

export const selectLeaderboard = (state: RootState) =>
	state.leaderboard.leaderboard;

export const selectIsFetchingWeekLeaderboard = (state: RootState) =>
	state.leaderboard.isFetchingWeekLeaderboard;

export const selectIsFetchingSeasonLeaderboard = (state: RootState) =>
	state.leaderboard.isFetchingSeasonLeaderboard;
