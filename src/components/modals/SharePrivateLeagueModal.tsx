import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectShowSharePrivateLeagueModal,
	setShowSharePrivateLeagueModal,
} from "../../state/slices/privateLeague";
import { PrivateLeagueItem } from "../../types/types";
import { RiFileCopyFill } from "react-icons/ri";
import { copyTextToClipboard } from "../../utils/utils";

const SharePrivateLeagueModal = ({
	leagueDetails,
}: {
	leagueDetails: PrivateLeagueItem | null;
}) => {
	const dispatch = useAppDispatch();

	const showSharePrivateLeagueModal = useAppSelector(
		selectShowSharePrivateLeagueModal
	);

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowSharePrivateLeagueModal(false));
			}}
			content={
				<section>
					<p className="text-[#5F6B7A] text-sm">
						Invite your friends to join{" "}
						<span className="font-semibold">{leagueDetails?.name}</span> with
						the code below.
					</p>
					<div className="flex bg-[#F5F6F8] rounded p-3 justify-between items-center mt-6 border border-dashed border-[#CED6DE]">
						<div className="flex items-center">
							<p className="text-xs text-[#212934] font-semibold mr-1">
								League code:
							</p>
							<p className="text-xs text-[#5F6B7A] font-semibold">
								{leagueDetails?.leagueCode}
							</p>
						</div>
						<RiFileCopyFill
							color="#8895A7"
							className="cursor-pointer"
							onClick={() =>
								copyTextToClipboard(String(leagueDetails?.leagueCode))
							}
						/>
					</div>
				</section>
			}
			isOpen={showSharePrivateLeagueModal}
			title="Share Private League"
		/>
	);
};

export default SharePrivateLeagueModal;
