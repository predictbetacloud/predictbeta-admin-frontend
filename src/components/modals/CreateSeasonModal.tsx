import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";
import { P } from "../Texts";
import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import {
	selectIsCreatingSeason,
	selectShowCreateSeasonModal,
	setShowCreateSeasonModal,
} from "../../state/slices/fixtures";
import { createSeasonAPI } from "../../api/fixturesAPI";

const CreateSeasonModal = () => {
	const dispatch = useAppDispatch();
	useParams();

	const isCreatingSeason = useAppSelector(selectIsCreatingSeason);
	const showCreateSeasonModal = useAppSelector(selectShowCreateSeasonModal);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const createSeason = async ({ name }: FieldValues) => {
		dispatch(
			createSeasonAPI({
				name,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowCreateSeasonModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(createSeason)}>
					{/* Season Name */}
					<div className="">
						<label htmlFor="name" className="mb-2 block">
							<P className="text-[#222222] text-sm">Season</P>
						</label>
						<Input
							id="name"
							type="text"
							placeholder="e.g 2023/2024"
							{...register("name", {
								required: "Season is required",
							})}
							className={`w-full input ${errors?.name ? "invalid" : ""}`}
						/>
						{errors?.name && (
							<ErrorMessage
								message={errors?.name && errors?.name.message?.toString()}
							/>
						)}
					</div>

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isCreatingSeason}
					/>
				</form>
			}
			isOpen={showCreateSeasonModal}
			title="Create Season"
		/>
	);
};

export default CreateSeasonModal;
