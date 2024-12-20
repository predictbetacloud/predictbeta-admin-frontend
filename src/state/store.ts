import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { teamsSlice } from "./slices/teams";
import { fixtureSlice } from "./slices/fixtures";
import { userSlice } from "./slices/users";
import { leaderboardSlice } from "./slices/leaderboard";
import { privateLeagueSlice } from "./slices/privateLeague";
import { affiliatesSlice } from "./slices/affiliates";
// ...

export const store = configureStore({
	reducer: {
		fixtures: fixtureSlice.reducer,
		teams: teamsSlice.reducer,
		auth: authSlice.reducer,
		users: userSlice.reducer,
		leaderboard: leaderboardSlice.reducer,
		privateLeague: privateLeagueSlice.reducer,
		affiliates: affiliatesSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
