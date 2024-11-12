import { useEffect, useState } from "react";
import queryString from "query-string";
import Select from "react-select";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingMatches,
	selectIsFetchingSpecificWeekResults,
	selectIsSubmittingWeekResult,
	selectMatches,
	selectSpecificWeekResults,
} from "../../../state/slices/fixtures";
import {
	getAllMatchesAPI,
	getAllSeasonsAPI,
	getAllWeeksAPI,
	getSpecificWeekResultsAPI,
	submitWeekResultAPI,
} from "../../../api/fixturesAPI";
import { VscFilter } from "react-icons/vsc";
import { useLocation, useSearchParams } from "react-router-dom";
import { Input, InputPlaceholder } from "../../../components/inputs/Input";
import { AiOutlineLoading } from "react-icons/ai";
import CustomListBox from "../../../components/inputs/CustomListBox";
import PageLoading from "../../../components/loaders/PageLoading";
import { MatchCard } from "../../../components/fixtures/MatchCard";
import { getAllPlayersAPI } from "../../../api/teamsAPI";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
	formatPredictionsFromObjectToArray,
	formatScorersFromObjectToArray,
	reverseFormatScorersFromObjectToArray,
} from "../../../utils/utils";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import {
	selectAllPlayers,
	selectIsFetchingAllPlayers,
} from "../../../state/slices/teams";
import IndicatorSeparator from "../../../components/IndicatorSeparator";
import { defaultStyle, invalidStyle } from "../../../utils/selectStyle";
import Button from "../../../components/Buttons";

const Results = () => {
	const dispatch = useAppDispatch();
	const [, setSearchParams] = useSearchParams();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;
	const query_season = queries?.season;

	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
	const isFetchingResult = useAppSelector(selectIsFetchingSpecificWeekResults);
	const isFetchingAllPlayers = useAppSelector(selectIsFetchingAllPlayers);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isSubmittingResults = useAppSelector(selectIsSubmittingWeekResult);

	const allWeeks = useAppSelector(selectAllWeeks);
	const allMatches = useAppSelector(selectMatches);
	const results = useAppSelector(selectSpecificWeekResults);
	const seasons = useAppSelector(selectAllSeasons);
	const allPlayers = useAppSelector(selectAllPlayers);

	const [selectedWeek, setSelectedWeek] = useState<{
		id: string;
		number: string;
	} | null>(null);

	const [matches, setMatches] = useState(allMatches);

	const activeSeason = seasons.find((_season) => _season.name === query_season);

	const {
		register,
		setValue,
		handleSubmit,
		control,
		trigger,
		formState: { errors },
	} = useForm();

	// Set matches
	if (matches?.[0]?.id !== allMatches?.[0]?.id) {
		setMatches(allMatches);
		allMatches?.forEach((match) => {
			register(String(match.id), {
				required: "Select result for match",
			});
		});
	}

	// Get all Season
	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Make latest week the active week
	useEffect(() => {
		if (allWeeks?.[0]?.number) {
			// if week is in query use that week
			if (query_week) {
				const activeWeek = allWeeks.find(
					(_week) => _week.number === Number(query_week)
				);
				if (activeWeek?.id) {
					setSelectedWeek({
						id: String(activeWeek?.id),
						number: String(activeWeek?.number),
					});
				}
			} else {
				setSearchParams({
					season: query_season
						? String(query_season)
						: String(seasons?.[0]?.name),
					week: String(allWeeks?.[0]?.number),
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allWeeks, query_week]);

	// Make latest season the active season
	useEffect(() => {
		if (query_season) {
			if (activeSeason?.id) {
				dispatch(getAllWeeksAPI({ seasonId: activeSeason?.id }));
			}
		} else {
			if (seasons?.[0]?.id) {
				dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seasons, query_season]);

	useEffect(() => {
		if (seasons?.[0]?.id && selectedWeek?.id) {
			dispatch(
				getAllMatchesAPI({
					seasonId: seasons?.[0]?.id,
					weekId: selectedWeek?.id,
				})
			);
			dispatch(
				getAllPlayersAPI({
					weekId: selectedWeek?.id,
				})
			);
			dispatch(
				getSpecificWeekResultsAPI({
					weekId: selectedWeek?.id,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedWeek]);

	// Update Selection
	const updateSelection = (
		matchId: number,
		prediction: "" | "HOME" | "DRAW" | "AWAY" | undefined
	) => {
		// Update form value for match
		setValue(String(matchId), prediction);
		trigger(String(matchId));

		const old_matches_array = [...matches];

		const match_index = matches.findIndex((_match) => matchId === _match.id);
		const matchToSelect = matches[match_index];
		const new_match = { ...matchToSelect, prediction: prediction };
		old_matches_array.splice(match_index, 1, new_match);
		setMatches(old_matches_array);
	};

	const onSubmit = ({ scorers, timeOfFirstGoal, ..._results }: FieldValues) => {
		const results = formatPredictionsFromObjectToArray(_results);
		const _scorers = formatScorersFromObjectToArray(scorers);

		dispatch(
			submitWeekResultAPI({
				seasonId: activeSeason?.id,
				weekId: Number(selectedWeek?.id),
				scorers: _scorers,
				timeOfFirstGoal: Number(timeOfFirstGoal),
				fixtureResults: results,
			})
		);
	};

	return (
		<DashboardLayout title="Result management">
			<section className="predictbeta-header w-full px-8 py-3 flex items-center justify-between sticky top-[90px]">
				{/* season select */}
				<div className="flex items-center gap-4">
					{isFetchingSeasons || !seasons ? (
						<InputPlaceholder>
							<AiOutlineLoading
								className="animate-spin"
								color="#5D65F6"
								size={16}
							/>
						</InputPlaceholder>
					) : (
						<CustomListBox
							options={seasons?.map((season) => ({
								name: season.name,
								value: String(season.name),
							}))}
							onChange={(value: string): void => {
								setSearchParams({
									season: String(value),
									week: "",
								});
							}}
							defaultOption={String(query_season)}
							title={"Season"}
							icon={<VscFilter />}
						/>
					)}

					{/* week select */}
					{isFetchingWeeks || !allWeeks ? (
						<InputPlaceholder>
							<AiOutlineLoading
								className="animate-spin"
								color="#5D65F6"
								size={16}
							/>
						</InputPlaceholder>
					) : (
						<CustomListBox
							options={allWeeks?.map((week) => ({
								name: `Week ${week.number}`,
								value: String(week.number),
							}))}
							onChange={(value: string): void => {
								setSearchParams({
									season: String(query_season),
									week: String(value),
								});
							}}
							defaultOption={selectedWeek?.number}
							title={"Week"}
							icon={<VscFilter />}
						/>
					)}
				</div>
			</section>

			{/* Matches */}
			{isFetchingMatches ||
			isFetchingResult ||
			isFetchingWeeks ||
			isFetchingSeasons ? (
				<PageLoading />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="py-10 px-8 md:w-4/5">
					{matches?.length > 0 ? (
						<section className="flex ">
							<div className="flex-grow bg-white p-3 md:p-5 border rounded-lg">
								<div className="grid md:grid-cols-2 gap-6">
									{matches?.map((match, idx) => (
										<div key={idx}>
											<MatchCard
												key={match.id}
												home={match.homeTeam}
												away={match.awayTeam}
												id={match.id}
												matchTime={match.fixtureDateTime}
												prediction={match.prediction}
												result={
													results?.fixtures?.find(
														(_match) => _match.fixture.id === match.id
													)?.result
												}
												onChange={updateSelection}
												invalid={!!errors?.[match?.id]}
											/>
											{errors?.[match?.id] && (
												<div className="-mt-0.5">
													<ErrorMessage
														message={errors?.[match?.id]?.message?.toString()}
													/>
												</div>
											)}
										</div>
									))}
								</div>
								<hr className="my-8" />
								<h3 className="text-[#000] font-medium text-lg text-center">
									Decider
								</h3>

								<div className="grid md:grid-cols-2 gap-6 py-6">
									{/* Most likely To Score to score? */}
									<div>
										<label htmlFor="scorers" className="mb-2 block">
											<p className="text-[#222222] text-sm">Scorers</p>
										</label>
										<Controller
											control={control}
											name="scorers"
											rules={{
												required: "Make a selection",
											}}
											defaultValue={reverseFormatScorersFromObjectToArray(
												results?.scorers
											)}
											render={({ field: { onChange, value, ref } }) => (
												<Select
													ref={ref}
													onChange={onChange}
													options={allPlayers}
													value={value}
													isLoading={isFetchingAllPlayers || isFetchingResult}
													components={{
														IndicatorSeparator,
													}}
													getOptionValue={(option) => option["id"]}
													getOptionLabel={(option) => option["name"]}
													maxMenuHeight={300}
													placeholder="- Select -"
													classNamePrefix="react-select"
													isMulti
													isClearable
													defaultValue={reverseFormatScorersFromObjectToArray(
														results?.scorers
													)}
													styles={errors?.scorers ? invalidStyle : defaultStyle}
												/>
											)}
										/>
										{errors?.scorers && (
											<ErrorMessage
												message={
													errors?.scorers && errors?.scorers.message?.toString()
												}
											/>
										)}
									</div>

									{/* Goal time */}
									<div className="">
										<label htmlFor="timeOfFirstGoal" className="mb-2 block">
											<p className="text-[#222222] text-sm">
												Minute the first goal in the round be scored
											</p>
										</label>
										<Input
											id="timeOfFirstGoal"
											type="number"
											placeholder="1"
											max={120}
											{...register("timeOfFirstGoal", {
												required: "Enter a valid number",
												min: {
													value: 1,
													message: "Please enter a valid number",
												},
												value: results?.timeOfFirstGoal ?? "",
											})}
											defaultValue={results?.timeOfFirstGoal}
											className={`w-full input ${
												errors?.timeOfFirstGoal ? "invalid" : ""
											}`}
										/>
										{errors?.timeOfFirstGoal && (
											<ErrorMessage
												message={errors.timeOfFirstGoal.message?.toString()}
											/>
										)}
									</div>
								</div>
								<div className="">
									<Button
										// className="w-full"
										type="submit"
										loading={isSubmittingResults}
										title="Submit result"
									/>
								</div>
							</div>
						</section>
					) : (
						<div className="flex items-center justify-center py-20 lg:py-32 flex-col">
							<h3 className="font-bold text-3xl mb-2">
								There are no matches for this week
							</h3>
							<p className="">
								Matches will show here once they are published.
							</p>
						</div>
					)}
				</form>
			)}
		</DashboardLayout>
	);
};

export default Results;
