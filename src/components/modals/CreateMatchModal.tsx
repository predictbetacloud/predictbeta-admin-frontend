import { useEffect, useMemo } from "react";
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
	selectCompetitions,
	selectDropdownWeeks,
	selectIsCreatingMatch,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingCompetitions,
	selectShowCreateMatchModal,
	setShowCreateMatchModal,
} from "../../state/slices/fixtures";
import {
	createMatchAPI,
	getAllCompetitionsByTypeAPI,
	getAllSeasonsAPI,
	getWeeksForDropdownAPI,
} from "../../api/fixturesAPI";
import { defaultStyle, invalidStyle } from "../../utils/selectStyle";
import {
	selectAllClubLeagueTeams,
	selectAllCountryTeams,
	selectIsFetchingTeams,
} from "../../state/slices/teams";
import { getAllClubLeagueTeamsAPI, getAllClubTeamsAPI, getAllCountryTeamsAPI } from "../../api/teamsAPI";

const IndicatorSeparator = () => {
	return null;
};

const CreateMatchModal = () => {
	const dispatch = useAppDispatch();

	const seasons = useAppSelector(selectAllSeasons);
	const weeks = useAppSelector(selectDropdownWeeks);
	const countries = useAppSelector(selectAllCountryTeams);
	const clubs = useAppSelector(selectAllClubLeagueTeams);
	const competitions = useAppSelector(selectCompetitions);
	const isFetchingCompetitions = useAppSelector(selectIsFetchingCompetitions);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingTeams = useAppSelector(selectIsFetchingTeams);
	const isCreatingMatch = useAppSelector(selectIsCreatingMatch);
	const showCreateMatchModal = useAppSelector(selectShowCreateMatchModal);

	console.log("Clubs", clubs)

	const {
		register,
		handleSubmit,
		reset,
		resetField,
		control,
		watch,
		formState: { errors },
	} = useForm();

	const createMatch = async ({
		season,
		week,
		home,
		away,
		fixtureDate,
		fixtureTime,
		competition,
		competitionType,
		clubOrCountry,
	}: FieldValues) => {
		const fixtureDateTime = `${fixtureDate}T${fixtureTime}`;
		dispatch(
			createMatchAPI({
				seasonId: season.id,
				weekId: week.id,
				homeTeamId: home.id,
				awayTeamId: away.id,
				leagueId: competition.leagueId,
				competitionType: competitionType.id,
				teamType: clubOrCountry.id,
				fixtureDateTime,
			})
		);
	};

	const season = watch("season");
	const clubOrCountry = watch("clubOrCountry");
	const competitionType = watch("competitionType");
	const league = watch("competition")

	useMemo(() => {
		resetField("home");
		resetField("away");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clubOrCountry]);

	useMemo(() => {
		resetField("competition");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [competitionType]);

	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		dispatch(getAllClubTeamsAPI({}));
		dispatch(getAllCountryTeamsAPI({}));
		dispatch(getAllClubLeagueTeamsAPI({clubOrCountryID:clubOrCountry?.id, leagueId:league?.id, competitionTypeId:competitionType?.id}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (competitionType?.id) {
			dispatch(getAllCompetitionsByTypeAPI({ type: competitionType.id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [competitionType?.id]);

	useEffect(() => {
		if (season?.id) {
			dispatch(getWeeksForDropdownAPI({ seasonId: season?.id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [season?.id]);


	// fetch clubs and country based its specific league or country
	useEffect(() => {
		dispatch(getAllClubLeagueTeamsAPI({clubOrCountryId:clubOrCountry?.id, leagueId:league?.id, competitionTypeId:competitionType?.id}))
  	}, [clubOrCountry?.id, league?.id, competitionType?.id]);


	return (
		<Modal
			closeModal={() => {
				dispatch(setShowCreateMatchModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(createMatch)}>
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

					{/* Competition Type Select */}
					<div className="mt-4">
						<label htmlFor="competitionType" className="mb-2 block">
							<P className="text-[#222222] text-sm">Competition Type</P>
						</label>
						<Controller
							control={control}
							name="competitionType"
							rules={{
								required: "Select a competition type",
							}}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={[
										{ id: "cup", name: "Cup" },
										{ id: "league", name: "League" },
									]}
									value={value}
									components={{
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									maxMenuHeight={300}
									placeholder="e.g 1"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.competitionType ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.competitionType && (
							<ErrorMessage
								message={
									errors?.competitionType &&
									errors?.competitionType.message?.toString()
								}
							/>
						)}
					</div>

					{/* Competition Select */}
					{competitionType && (
						<div className="mt-4">
							<label htmlFor="competition" className="mb-2 block">
								<P className="text-[#222222] text-sm">Competition</P>
							</label>
							<Controller
								control={control}
								name="competition"
								rules={{
									required: "Select a competition",
								}}
								render={({ field: { onChange, value, ref } }) => (
									<Select
										ref={ref}
										onChange={onChange}
										options={competitions}
										value={value}
										isLoading={isFetchingCompetitions}
										components={{
											IndicatorSeparator,
										}}
										getOptionValue={(option) => option["leagueId"]}
										getOptionLabel={(option) =>
											`${option["country"]?.name} - ${option["name"]}`
										}
										maxMenuHeight={300}
										placeholder="e.g 1"
										classNamePrefix="react-select"
										isClearable
										styles={errors?.competition ? invalidStyle : defaultStyle}
									/>
								)}
							/>
							{errors?.competition && (
								<ErrorMessage
									message={
										errors?.competition &&
										errors?.competition.message?.toString()
									}
								/>
							)}
						</div>
					)}

					{/* Club Or Country Select */}
					<div className="mt-4">
						<label htmlFor="clubOrCountry" className="mb-2 block">
							<P className="text-[#222222] text-sm">Clubs or Countries</P>
						</label>
						<Controller
							control={control}
							name="clubOrCountry"
							rules={{
								required: "Select a team type",
							}}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									ref={ref}
									onChange={onChange}
									options={[
										{ id: "club", name: "Clubs" },
										{ id: "country", name: "Countries" },
									]}
									value={value}
									components={{
										IndicatorSeparator,
									}}
									getOptionValue={(option) => option["id"]}
									getOptionLabel={(option) => option["name"]}
									maxMenuHeight={300}
									placeholder="e.g 1"
									classNamePrefix="react-select"
									isClearable
									styles={errors?.clubOrCountry ? invalidStyle : defaultStyle}
								/>
							)}
						/>
						{errors?.clubOrCountry && (
							<ErrorMessage
								message={
									errors?.clubOrCountry &&
									errors?.clubOrCountry.message?.toString()
								}
							/>
						)}
					</div>

					{/* If club */}
					{clubOrCountry?.id === "club" && (
						<>
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
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={clubs?.items}
											value={value}
											isLoading={isFetchingTeams}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["name"]}
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
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={clubs?.items}
											value={value}
											isLoading={isFetchingTeams}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["name"]}
											maxMenuHeight={300}
											placeholder="e.g 1"
											classNamePrefix="react-select"
											isClearable
											menuPlacement="auto"
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
						</>
					)}

					{/* If Country */}
					{clubOrCountry?.id === "country" && (
						<>
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
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={countries?.items}
											value={value}
											isLoading={isFetchingTeams}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["name"]}
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
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
										 	options={countries?.items}
											value={value}
											isLoading={isFetchingTeams}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["name"]}
											maxMenuHeight={300}
											placeholder="e.g 1"
											classNamePrefix="react-select"
											isClearable
											menuPlacement="auto"
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
						</>
					)}

					{/* Match Date */}
					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="fixtureDate" className="mb-2 block">
								<P className="text-[#222222] text-sm">Match Date</P>
							</label>
							<Input
								id="fixtureDate"
								type="date"
								placeholder="e.g enter date"
								{...register("fixtureDate", {
									required: "Match date is required",
								})}
								className={`w-full input ${
									errors?.fixtureDate ? "invalid" : ""
								}`}
							/>
							{errors?.fixtureDate && (
								<ErrorMessage
									message={
										errors?.fixtureDate &&
										errors?.fixtureDate.message?.toString()
									}
								/>
							)}
						</div>
						<div>
							<label htmlFor="fixtureTime" className="mb-2 block">
								<P className="text-[#222222] text-sm">Match Time</P>
							</label>
							<Input
								id="fixtureTime"
								type="time"
								placeholder="e.g enter Time"
								{...register("fixtureTime", {
									required: "Match time is required",
								})}
								className={`w-full input ${
									errors?.fixtureTime ? "invalid" : ""
								}`}
							/>
							{errors?.fixtureTime && (
								<ErrorMessage
									message={
										errors?.fixtureTime &&
										errors?.fixtureTime.message?.toString()
									}
								/>
							)}
						</div>
					</div>

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isCreatingMatch}
					/>
				</form>
			}
			isOpen={showCreateMatchModal}
			title="Create Match"
		/>
	);
};

export default CreateMatchModal;
