import { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from "react-select";

import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { P } from "../Texts";
import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import Modal from "./Modal";

import {
	selectAllSeasons,
	selectIsCreatingWeek,
	selectIsFetchingAllSeasons,
	selectShowCreateWeekModal,
	setShowCreateWeekModal,
} from "../../state/slices/fixtures";
import { createWeekAPI, getAllSeasonsAPI } from "../../api/fixturesAPI";
import { defaultStyle, invalidStyle } from "../../utils/selectStyle";

const IndicatorSeparator = () => {
	return null;
};

const CreateWeekModal = () => {
	const dispatch = useAppDispatch();

	const seasons = useAppSelector(selectAllSeasons);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isCreatingWeek = useAppSelector(selectIsCreatingWeek);
	const showCreateWeekModal = useAppSelector(selectShowCreateWeekModal);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const createWeek = async ({ season, number }: FieldValues) => {
		dispatch(
			createWeekAPI({
				seasonId: season.id,
				number,
			})
		);
	};

	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
	}, []);

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowCreateWeekModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(createWeek)}>
					{/* Season Select */}
					<div>
						<label htmlFor="season" className="mb-2 block">
							<P className="text-[#222222] text-sm">Season</P>
						</label>
						<Controller
							control={control}
							name="season"
							rules={{
								required: "Select a season",
							}}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={seasons}
									value={value}
									isLoading={isFetchingSeasons}
									components={{
										// DropdownIndicator,
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									maxMenuHeight={300}
									placeholder="e.g 2023/2024"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.season ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.season && (
							<ErrorMessage
								message={errors?.season && errors?.season.message?.toString()}
							/>
						)}
					</div>

					{/* Week Name */}
					<div className="mt-4">
						<label htmlFor="number" className="mb-2 block">
							<P className="text-[#222222] text-sm">Week</P>
						</label>
						<Input
							id="number"
							type="text"
							placeholder="e.g 1"
							{...register("number", {
								required: "Week is required",
							})}
							className={`w-full input ${errors?.number ? "invalid" : ""}`}
						/>
						{errors?.number && (
							<ErrorMessage
								message={errors?.number && errors?.number.message?.toString()}
							/>
						)}
					</div>

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isCreatingWeek}
					/>
				</form>
			}
			isOpen={showCreateWeekModal}
			title="Create Week"
		/>
	);
};

export default CreateWeekModal;
