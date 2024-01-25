import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";
import { addPlayerAPI } from "../../api/teamsAPI";
import {
	selectIsCreatingPlayer,
	selectShowAddPlayerModal,
	setShowAddPlayerModal,
} from "../../state/slices/teams";
import { P } from "../Texts";
import { Input } from "../Input";
import ErrorMessage from "../ErrorMessage";
import Button from "../Buttons";

const AddPlayerModal = () => {
	const dispatch = useAppDispatch();
	const { clubId } = useParams();

	const isCreatingPlayer = useAppSelector(selectIsCreatingPlayer);
	const showAddPlayerModal = useAppSelector(selectShowAddPlayerModal);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const addPlayer = async ({ playerName, playerNumber }: FieldValues) => {
		dispatch(
			addPlayerAPI({
				teamId: clubId,
				players: [{ playerName, playerNumber: Number(playerNumber) }],
			})
		);
	};
	return (
		<Modal
			closeModal={() => {
				dispatch(setShowAddPlayerModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(addPlayer)}>
					{/* Player Name */}
					<div className="">
						<label htmlFor="playerName" className="mb-2 block">
							<P className="text-[#222222] text-sm">Player Name</P>
						</label>
						<Input
							id="playerName"
							type="text"
							placeholder="Enter player name"
							{...register("playerName", {
								required: "Player name is required",
							})}
							className={`w-full input ${errors?.name ? "invalid" : ""}`}
						/>
						{errors?.name && (
							<ErrorMessage
								message={
									errors?.playerName && errors?.playerName.message?.toString()
								}
							/>
						)}
					</div>

					{/* Player Number */}
					<div className="mt-6">
						<label htmlFor="playerNumber" className="mb-2 block">
							<P className="text-[#222222] text-sm">Player Number</P>
						</label>
						<Input
							id="playerNumber"
							type="number"
							placeholder="Enter player number"
							{...register("playerNumber", {
								required: "Player Number is required",
							})}
							className={`w-full input ${
								errors?.playerNumber ? "invalid" : ""
							}`}
						/>
						{errors?.playerNumber && (
							<ErrorMessage message={errors.playerNumber.message?.toString()} />
						)}
					</div>
					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isCreatingPlayer}
					/>
				</form>
			}
			isOpen={showAddPlayerModal}
			title="Add Player"
		/>
	);
};

export default AddPlayerModal;
