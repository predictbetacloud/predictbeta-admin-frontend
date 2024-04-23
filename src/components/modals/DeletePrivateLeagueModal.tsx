import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectIsDeletingPrivateLeague,
	selectShowDeletePrivateLeagueModal,
	setShowDeletePrivateLeagueModal,
} from "../../state/slices/privateLeague";
import { PrivateLeagueItem } from "../../types/types";
import Button from "../Buttons";
import { deletePrivateLeagueAPI } from "../../api/privateLeagueAPI";

const DeletePrivateLeagueModal = ({
	leagueDetails,
}: {
	leagueDetails: PrivateLeagueItem | null;
}) => {
	const dispatch = useAppDispatch();

	const showDeletePrivateLeagueModal = useAppSelector(
		selectShowDeletePrivateLeagueModal
	);

	const isDeletingLeague = useAppSelector(selectIsDeletingPrivateLeague);

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowDeletePrivateLeagueModal(false));
			}}
			content={
				<section>
					<p className="text-[#5F6B7A] text-sm">
						You are about to Delete{" "}
						<span className="font-semibold">{leagueDetails?.name}</span>. Are
						you really sure about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						onClick={() =>
							dispatch(deletePrivateLeagueAPI({ leagueId: leagueDetails?.id }))
						}
						title="Delete League"
						loading={isDeletingLeague}
					/>
				</section>
			}
			isOpen={showDeletePrivateLeagueModal}
			title="Delete Private League"
		/>
	);
};

export default DeletePrivateLeagueModal;
