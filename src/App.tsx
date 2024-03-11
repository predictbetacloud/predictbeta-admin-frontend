import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";

import { refreshTokenAPI } from "./api/authAPI";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { selectAuth } from "./state/slices/auth";
import { callFunctionInInterval } from "./utils/helpers";
import { globalRouter } from "./utils/utils";

// import ErrorFallback from "./components/layout/ErrorFallback";

import Login from "./pages/auth/Login";
import AllFixtures from "./pages/dashboard/fixtures/AllFixtures";
import NotFound from "./pages/404";
import ClubTeams from "./pages/dashboard/teams/ClubTeams";
import AddClubTeam from "./pages/dashboard/teams/AddClubTeam";
import EditClubTeam from "./pages/dashboard/teams/EditClubTeam";
import SpecificClubTeam from "./pages/dashboard/teams/SpecificClubTeam";
import Results from "./pages/dashboard/fixtures/Results";
import AllUsers from "./pages/dashboard/users/AllUsers";
import SpecificUser from "./pages/dashboard/users/SpecificUser";

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { refresh_token } = useAppSelector(selectAuth);

	globalRouter.navigate = navigate;
	globalRouter.location = location;

	useEffect(() => {
		if (refresh_token) {
			dispatch(refreshTokenAPI());
			const clearTimer = callFunctionInInterval(
				() => dispatch(refreshTokenAPI()),
				23 * 60 * 60000
			);
			return () => {
				clearTimer();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		// <ErrorBoundary FallbackComponent={ErrorFallback}>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/dashboard/users" element={<AllUsers />} />
			<Route path="/dashboard/users/view/:userId" element={<SpecificUser />} />
			<Route path="/dashboard/results" element={<Results />} />
			<Route path="/dashboard/fixtures" element={<AllFixtures />} />
			<Route path="/dashboard/teams" element={<ClubTeams />} />
			<Route path="/dashboard/teams/new-club" element={<AddClubTeam />} />
			<Route path="/dashboard/teams/edit/:clubId" element={<EditClubTeam />} />
			<Route
				path="/dashboard/teams/view/:clubId"
				element={<SpecificClubTeam />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
		// </ErrorBoundary>
	);
}

export default App;
