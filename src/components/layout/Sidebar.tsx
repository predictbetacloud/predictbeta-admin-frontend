import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo/logo-dark.svg";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { P } from "../Texts";
import Button from "../Buttons";
import { logOutAPI } from "../../api/authAPI";

const Style = styled.aside`
	max-width: 300px;
`;

const routes: { path: string; title: string }[] = [
	{
		path: "/dashboard/fixtures",
		title: "Fixture management",
	},
	{
		path: "/dashboard/results",
		title: "Results",
	},
	{
		path: "/dashboard/teams",
		title: "Team management",
	},
	{
		path: "/dashboard/users",
		title: "User management",
	},
	// {
	// 	path: "/dashboard/payouts",
	// 	title: "Payout",
	// },
	// {
	// 	path: "/dashboard/private-league",
	// 	title: "Private leagues",
	// },
	{
		path: "/dashboard/leaderboard",
		title: "Leaderboard",
	},
	// {
	// 	path: "/dashboard/predictions",
	// 	title: "Predictions",
	// },
	{
		path: "/dashboard/affiliates",
		title: "Affiliates",
	},
];

const Sidebar = () => {
	const location = useLocation();
	const { user } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	return (
		<Style className="flex-shrink-0 bg-[#051B30] w-1/5 h-screen top-0 sticky pt-2.5 pb-10 flex flex-col">
			<img src={logo} alt="Predictbeta" className="mx-auto mb-8" />

			<div className="flex flex-col flex-grow justify-between px-3">
				{/* Links */}
				<div>
					{routes.map((route, idx) => (
						<Link
							key={idx}
							to={route.path}
							className={`rounded-md pl-3 p-3 text-white block mb-3 ${
								location.pathname.includes(route.path)
									? "bg-[#EB1536]"
									: "bg-[#FFFFFF0D]"
							}`}
						>
							<P className="font-normal text-sm">{route.title}</P>
						</Link>
					))}
				</div>

				{/* User Card */}
				<div className="p-3 pt-4 bg-[#FFFFFF0D] rounded-xl">
					<div className="flex items-center gap-x-3">
						<div className="flex items-center justify-center rounded-md w-9 h-9 bg-[#F5F8FA] border border-[#E1E7EC]">
							<P className="uppercase text-[#051B30]">{user?.username?.[0]}</P>
						</div>
						<div>
							<P className="text-white text-sm">{user?.username}</P>
							<P className="text-[#8C97A7] text-xs">({user?.email})</P>
						</div>
					</div>
					<Button.Blue
						onClick={() => dispatch(logOutAPI())}
						title="Log out"
						className="mt-3 w-full"
					/>
				</div>
			</div>
		</Style>
	);
};

export default Sidebar;
