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
	selectAllWeeks,
	selectIsEditingMatch,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectShowEditMatchModal,
	setShowEditMatchModal,
} from "../../state/slices/fixtures";
import { editMatchAPI, getAllSeasonsAPI } from "../../api/fixturesAPI";
import { defaultStyle, invalidStyle } from "../../utils/selectStyle";
import {
	selectAllClubTeams,
	selectIsFetchingTeams,
} from "../../state/slices/teams";
import { getAllClubTeamsAPI } from "../../api/teamsAPI";
import { IMatch } from "../../types/types";
import { formatDateToDateTimeLocal } from "../../utils/utils";

const IndicatorSeparator = () => {
	return null;
};

const EditMatchModal = ({ match }: { match: IMatch | null }) => {
	const dispatch = useAppDispatch();

	const seasons = useAppSelector(selectAllSeasons);
	const weeks = useAppSelector(selectAllWeeks);
	const clubs = useAppSelector(selectAllClubTeams);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingClubs = useAppSelector(selectIsFetchingTeams);
	const isEditingMatch = useAppSelector(selectIsEditingMatch);

	const showEditMatchModal = useAppSelector(selectShowEditMatchModal);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const editMatch = async ({
		season,
		week,
		home,
		away,
		fixtureDateTime,
	}: FieldValues) => {
		dispatch(
			editMatchAPI({
				seasonId: season.id,
				weekId: week.id,
				homeTeamId: home.id,
				awayTeamId: away.id,
				fixtureDateTime,
				matchId: match?.id,
			})
		);
	};

	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		dispatch(getAllClubTeamsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowEditMatchModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(editMatch)}>
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
							defaultValue={seasons[0]}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={seasons}
									value={value}
									isLoading={isFetchingSeasons}
									components={{
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									defaultValue={seasons[0]}
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

					{/* Week Select */}
					<div className="mt-4">
						<label htmlFor="week" className="mb-2 block">
							<P className="text-[#222222] text-sm">Week</P>
						</label>
						<Controller
							control={control}
							name="week"
							rules={{
								required: "Select a week",
							}}
							defaultValue={() =>
								weeks.find((week) => week.id === match?.week.id)
							}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={weeks}
									value={value}
									isLoading={isFetchingWeeks}
									components={{
										// DropdownIndicator,
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["number"]}
									maxMenuHeight={300}
									defaultValue={() =>
										weeks.find((week) => week.id === match?.week.id)
									}
									placeholder="e.g 1"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.week ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.week && (
							<ErrorMessage
								message={errors?.week && errors?.week.message?.toString()}
							/>
						)}
					</div>

					{/* Home Team Select */}
					<div className="mt-4">
						<label htmlFor="home" className="mb-2 block">
							<P className="text-[#222222] text-sm">Home Team</P>
						</label>
						<Controller
							control={control}
							name="home"
							rules={{
								required: "Select a home team",
							}}
							defaultValue={() =>
								clubs?.items?.find((club) => club.id === match?.homeTeam.id)
							}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={clubs?.items}
									value={value}
									isLoading={isFetchingClubs}
									components={{
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									defaultValue={() =>
										clubs?.items?.find((club) => club.id === match?.homeTeam.id)
									}
									maxMenuHeight={300}
									placeholder="e.g 1"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.home ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.home && (
							<ErrorMessage
								message={errors?.home && errors?.home.message?.toString()}
							/>
						)}
					</div>

					{/* Away Team Select */}
					<div className="mt-4">
						<label htmlFor="away" className="mb-2 block">
							<P className="text-[#222222] text-sm">Away Team</P>
						</label>
						<Controller
							control={control}
							name="away"
							rules={{
								required: "Select an away team",
							}}
							defaultValue={() =>
								clubs?.items?.find((club) => club.id === match?.awayTeam.id)
							}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={clubs?.items}
									value={value}
									isLoading={isFetchingClubs}
									components={{
										// DropdownIndicator,
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									defaultValue={() =>
										clubs?.items?.find((club) => club.id === match?.awayTeam.id)
									}
									maxMenuHeight={300}
									placeholder="e.g 1"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.away ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.away && (
							<ErrorMessage
								message={errors?.away && errors?.away.message?.toString()}
							/>
						)}
					</div>

					{/* Match Date */}
					<div className="mt-4">
						<label htmlFor="fixtureDateTime" className="mb-2 block">
							<P className="text-[#222222] text-sm">Match Time</P>
						</label>
						<Input
							id="fixtureDateTime"
							type="datetime-local"
							placeholder="e.g enter date"
							{...register("fixtureDateTime", {
								required: "Match time is required",
							})}
							defaultValue={formatDateToDateTimeLocal(
								String(match?.fixtureDateTime)
							)}
							className={`w-full input ${
								errors?.fixtureDateTime ? "invalid" : ""
							}`}
						/>
						{errors?.fixtureDateTime && (
							<ErrorMessage
								message={
									errors?.fixtureDateTime &&
									errors?.fixtureDateTime.message?.toString()
								}
							/>
						)}
					</div>

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isEditingMatch}
					/>
				</form>
			}
			isOpen={showEditMatchModal}
			title="Edit Match"
		/>
	);
};

export default EditMatchModal;
