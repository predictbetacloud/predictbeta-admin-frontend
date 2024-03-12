import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectIsDeletingPlayer,
	selectShowDeletePlayerModal,
	setShowDeletePlayerModal,
} from "../../state/slices/teams";
import Button from "../Buttons";

const DeletePlayerModal = ({
	playerName,
	teamName,
}: {
	teamName: string;
	playerName: string;
}) => {
	const dispatch = useAppDispatch();
	// const { clubId } = useParams().;

	const isDeletingPlayer = useAppSelector(selectIsDeletingPlayer);
	const showDeletePlayerModal = useAppSelector(selectShowDeletePlayerModal);

	// const deletePlayer = async ({ playerName, playerNumber }: FieldValues) => {
	// 	dispatch(
	// 		deletePlayerAPI({
	// 			teamId: clubId,
	// 			players: [{ playerName, playerNumber: Number(playerNumber) }],
	// 		})
	// 	);
	// };

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowDeletePlayerModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to delete{" "}
						<span className="font-medium">{playerName}</span> from{" "}
						<span className="font-medium">{teamName}</span>. Are you really sure
						about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Delete player"
						loading={isDeletingPlayer}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowDeletePlayerModal(false))}
					/>
				</div>
			}
			isOpen={showDeletePlayerModal}
			title="Delete Player"
		/>
	);
};

export default DeletePlayerModal;
