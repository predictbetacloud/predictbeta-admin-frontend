import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { IPaginatedLeaderboard, LeaderboardState } from "../../types/types";

const initialState: LeaderboardState = {
	leaderboard: null,
	isFetchingSeasonLeaderboard: false,
	isFetchingMonthLeaderboard: false,
	isFetchingWeekLeaderboard: false,
};

export const leaderboardSlice = createSlice({
	name: "leaderboard",
	initialState,
	reducers: {
		setLeaderboard: (state, action: PayloadAction<IPaginatedLeaderboard>) => {
			state.leaderboard = action.payload;
		},
		setIsFetchingWeekLeaderboard: (
			state,
			action: PayloadAction<LeaderboardState["isFetchingWeekLeaderboard"]>
		) => {
			state.isFetchingWeekLeaderboard = action.payload;
		},
		setIsFetchingMonthLeaderboard: (
			state,
			action: PayloadAction<LeaderboardState["isFetchingMonthLeaderboard"]>
		) => {
			state.isFetchingMonthLeaderboard = action.payload;
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
	setIsFetchingMonthLeaderboard,
	setIsFetchingWeekLeaderboard,
} = leaderboardSlice.actions;

export const selectLeaderboard = (
	state: RootState
): IPaginatedLeaderboard | null => state.leaderboard.leaderboard;

export const selectIsFetchingWeekLeaderboard = (state: RootState) =>
	state.leaderboard.isFetchingWeekLeaderboard;

export const selectIsFetchingMonthLeaderboard = (state: RootState) =>
	state.leaderboard.isFetchingMonthLeaderboard;

export const selectIsFetchingSeasonLeaderboard = (state: RootState) =>
	state.leaderboard.isFetchingSeasonLeaderboard;
