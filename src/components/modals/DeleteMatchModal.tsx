import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import { IMatch } from "../../types/types";
import { deleteMatchAPI } from "../../api/fixturesAPI";
import {
	selectIsDeletingMatch,
	selectShowDeleteMatchModal,
	setShowDeleteMatchModal,
} from "../../state/slices/fixtures";

const DeleteMatchModal = ({
	match,
	seasonId,
	weekId,
}: {
	match: IMatch | null;
	seasonId: number;
	weekId: number;
}) => {
	const dispatch = useAppDispatch();

	const isDeletingMatch = useAppSelector(selectIsDeletingMatch);
	const showDeleteMatchModal = useAppSelector(selectShowDeleteMatchModal);

	const deleteMatch = async () => {
		dispatch(
			deleteMatchAPI({
				matchId: match?.id,
				seasonId,
				weekId,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowDeleteMatchModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to delete{" "}
						<span className="font-medium">{match?.homeTeam.name}</span> vs{" "}
						<span className="font-medium">{match?.awayTeam.name}</span>. Are you
						really sure about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Delete match"
						onClick={deleteMatch}
						loading={isDeletingMatch}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowDeleteMatchModal(false))}
					/>
				</div>
			}
			isOpen={showDeleteMatchModal}
			title="Delete Match"
		/>
	);
};

export default DeleteMatchModal;
