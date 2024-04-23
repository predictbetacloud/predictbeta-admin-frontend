import { Menu } from "@headlessui/react";
import { IoSettingsOutline } from "react-icons/io5";
import styled from "styled-components";
import { Float } from "@headlessui-float/react";

import { PrivateLeagueItem } from "../types/types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import {
	setShowDeletePrivateLeagueModal,
	// setShowLeavePrivateLeagueModal,
	setShowSharePrivateLeagueModal,
} from "../state/slices/privateLeague";

const DropdownStyle = styled(Menu.Items)`
	box-shadow: 0px 8px 30px 0px #aeaec026;
`;

const PrivateLeagueOptions = ({
	leagueDetails,
	setSelectedLeague,
}: {
	leagueDetails: PrivateLeagueItem;
	setSelectedLeague: (league: PrivateLeagueItem) => void;
}) => {
	const dispatch = useAppDispatch();

	return (
		<Menu as="div" className="relative">
			<Float placement="bottom-end" portal offset={4}>
				<Menu.Button className="flex items-center gap-x-2">
					<IoSettingsOutline color="#292D32" size={20} />
					<p className="text-[#292D32]">Manage League</p>
				</Menu.Button>
				<DropdownStyle className="private-league-options ring-white outline-none bg-white rounded-md border border-[#E1E7EC]">
					<Menu.Item>
						<Link
							to={`/dashboard/private-league/standing/${leagueDetails?.id}`}
							className="block px-4 py-2.5 w-40 focus:bg-slate-100 hover:bg-slate-100"
						>
							<p className="text-[#5F6B7A]">View Standings</p>
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link
							to={`/dashboard/private-league/edit/${leagueDetails?.id}`}
							className="block px-4 py-2.5 w-40 focus:bg-slate-100 hover:bg-slate-100"
						>
							<p className="text-[#5F6B7A]">Edit League</p>
						</Link>
					</Menu.Item>
					{/* Invite Friends */}
					<Menu.Item>
						{({ close }) => (
							<button
								onClick={() => {
									setSelectedLeague(leagueDetails);
									dispatch(setShowSharePrivateLeagueModal(true));
									close();
								}}
								className="block px-4 py-2.5 w-40 text-left focus:bg-slate-100 hover:bg-slate-100"
							>
								<p className="text-[#5F6B7A]">Invite friends</p>
							</button>
						)}
					</Menu.Item>

					{/* Leave */}
					{/* <Menu.Item>
						{({ close }) => (
							<button
								onClick={() => {
									setSelectedLeague(leagueDetails);
									dispatch(setShowLeavePrivateLeagueModal(true));
									close();
								}}
								className="block px-4 py-2.5 w-40 text-left focus:bg-slate-100 hover:bg-slate-100"
							>
								<p className="text-[#5F6B7A]">Leave league</p>
							</button>
						)}
					</Menu.Item> */}

					{/* Delete League */}
					<Menu.Item>
						{({ close }) => (
							<button
								onClick={() => {
									setSelectedLeague(leagueDetails);
									dispatch(setShowDeletePrivateLeagueModal(true));
									close();
								}}
								className="block px-4 py-2.5 w-40 text-left focus:bg-red-100 hover:bg-red-100"
							>
								<p className="text-[#EB1536]">Delete League</p>
							</button>
						)}
					</Menu.Item>
				</DropdownStyle>
			</Float>
		</Menu>
	);
};

export default PrivateLeagueOptions;
