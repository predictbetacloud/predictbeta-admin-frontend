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
	selectAllWeeks,
	selectCompetitions,
	selectIsEditingMatch,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingCompetitions,
	selectShowEditMatchModal,
	setShowEditMatchModal,
} from "../../state/slices/fixtures";
import {
	editMatchAPI,
	getAllCompetitionsByTypeAPI,
	getAllSeasonsAPI,
	getWeeksForDropdownAPI,
} from "../../api/fixturesAPI";
import { defaultStyle, invalidStyle } from "../../utils/selectStyle";
import {
	selectAllClubTeams,
	selectAllCountryTeams,
	selectIsFetchingTeams,
	selectAllClubLeagueTeams,
} from "../../state/slices/teams";
import { getAllClubTeamsAPI, getAllCountryTeamsAPI, getAllClubLeagueTeamsAPI } from "../../api/teamsAPI";
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
	const leagueClubs = useAppSelector(selectAllClubLeagueTeams);
	const countries = useAppSelector(selectAllCountryTeams);
	const competitions = useAppSelector(selectCompetitions);
	const isFetchingCompetitions = useAppSelector(selectIsFetchingCompetitions);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingTeams = useAppSelector(selectIsFetchingTeams);
	const isEditingMatch = useAppSelector(selectIsEditingMatch);

	const showEditMatchModal = useAppSelector(selectShowEditMatchModal);

	const {
		register,
		handleSubmit,
		reset,
		control,
		watch,
		resetField,
		formState: { errors },
	} = useForm();

	const editMatch = async ({
		season,
		week,
		home,
		away,
		fixtureDateTime,
		competition,
		competitionType,
		teamType,
	}: FieldValues) => {
		dispatch(
			editMatchAPI({
				seasonId: season.id,
				weekId: week.id,
				homeTeamId: home.id,
				awayTeamId: away.id,
				fixtureDateTime,
				leagueId: competition.leagueId,
				matchId: match?.id,
				competitionType,
				teamType,
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
		dispatch(getAllClubLeagueTeamsAPI({clubOrCountryId:match?.homeTeam?.teamType, leagueId:match?.homeTeam?.league?.id, competitionTypeId:match?.league?.type}))
  	}, []);
	useEffect(() => {
		dispatch(getAllClubLeagueTeamsAPI({clubOrCountryId:clubOrCountry?.id, leagueId:league?.id, competitionTypeId:competitionType?.id}))
  	}, [clubOrCountry?.id, league?.id, competitionType?.id]);
	

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
							defaultValue={() =>
								[
									{ id: "cup", name: "Cup" },
									{ id: "league", name: "League" },
								].find(
									(type: { id: string; name: string }) =>
										type?.id === String(match?.league?.type)?.toLowerCase()
								)
							}
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
									defaultValue={() =>
										[
											{ id: "cup", name: "Cup" },
											{ id: "league", name: "League" },
										].find(
											(type: { id: string; name: string }) =>
												type?.id === String(match?.league?.type)?.toLowerCase()
										)
									}
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
								defaultValue={() =>
									competitions.find(
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										(competition: { [key: string]: any }) =>
											competition?.leagueId === match?.league?.leagueId
									)
								}
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
										defaultValue={() =>
											competitions.find(
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												(competition: { [key: string]: any }) =>
													competition?.leagueId === match?.league?.leagueId
											)
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
								required: "Select a match type",
							}}
							defaultValue={() =>
								[
									{ id: "club", name: "Clubs" },
									{ id: "country", name: "Countries" },
								].find(
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									(type: { [key: string]: any }) => type?.id === "club"
								)
							}
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
									defaultValue={() =>
										[
											{ id: "club", name: "Clubs" },
											{ id: "country", name: "Countries" },
										].find(
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											(type: { [key: string]: any }) => type?.id === "club"
										)
									}
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
									defaultValue={() =>
										clubs?.items?.find((club) => club.id === match?.homeTeam.id)
									}
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={leagueClubs?.items}
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
											defaultValue={() =>
												clubs?.items?.find(
													(club) => club.id === match?.homeTeam.id
												)
											}
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
											options={leagueClubs?.items}
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
											defaultValue={() =>
												clubs?.items?.find(
													(club) => club.id === match?.awayTeam.id
												)
											}
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
									defaultValue={() =>
										countries?.items?.find(
											(country) => country.id === match?.homeTeam.id
										)
									}
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
											defaultValue={() =>
												countries?.items?.find(
													(country) => country.id === match?.homeTeam.id
												)
											}
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
									defaultValue={() =>
										countries?.items?.find(
											(country) => country.id === match?.awayTeam.id
										)
									}
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
											defaultValue={() =>
												countries?.items?.find(
													(country) => country.id === match?.awayTeam.id
												)
											}
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
