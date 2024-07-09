import queryString from "query-string";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";

import { Controller, useForm } from "react-hook-form";
import { VscFilter } from "react-icons/vsc";
import {
	getAllMatchesAPI,
	getAllSeasonsAPI,
	getAllWeeksAPI,
	getSpecificUserWeekPredictionAPI,
} from "../../../api/fixturesAPI";
import { getAllPlayersAPI } from "../../../api/teamsAPI";
import IndicatorSeparator from "../../../components/IndicatorSeparator";
import SelectionCard from "../../../components/fixtures/SelectionCard";
import CustomListBox from "../../../components/inputs/CustomListBox";
import { Input, InputPlaceholder } from "../../../components/inputs/Input";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import PageLoading from "../../../components/loaders/PageLoading";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
	selectIsFetchingMatches,
	selectIsFetchingSpecificWeekPrediction,
	selectMatches,
	selectSpecificWeekPrediction,
} from "../../../state/slices/fixtures";
import {
	selectAllPlayers,
	selectIsFetchingAllPlayers,
} from "../../../state/slices/teams";
import { correctStyle, invalidStyle } from "../../../utils/selectStyle";

const UserPredictionHistory = () => {
	const dispatch = useAppDispatch();
	const [, setSearchParams] = useSearchParams();
	const l = useLocation();
	const { username } = useParams();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;
	const query_season = queries?.season;

	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
	const isFetchingSpecificWeekPredictions = useAppSelector(
		selectIsFetchingSpecificWeekPrediction
	);
	const specificWeekPredictions = useAppSelector(selectSpecificWeekPrediction);
	const isFetchingAllPlayers = useAppSelector(selectIsFetchingAllPlayers);

	const allWeeks = useAppSelector(selectAllWeeks);
	const allMatches = useAppSelector(selectMatches);
	const seasons = useAppSelector(selectAllSeasons);
	const allPlayers = useAppSelector(selectAllPlayers);

	const [selectedWeek, setSelectedWeek] = useState<{
		id: string;
		number: string;
	} | null>(null);

	const { control } = useForm();

	// Get all Season
	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Make latest week the active week
	useEffect(() => {
		if (allWeeks?.[0]?.id) {
			// if week is in query use that week
			if (query_week) {
				const activeWeek = allWeeks.find(
					(_week) => _week.number === Number(query_week)
				);

				if (activeWeek) {
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

	useEffect(() => {
		if (query_season) {
			const activeSeason = seasons.find(
				(_season) => _season.name === query_season
			);
			if (activeSeason?.id && selectedWeek?.id) {
				dispatch(
					getAllMatchesAPI({
						seasonId: activeSeason?.id,
						weekId: selectedWeek?.id,
					})
				);
			}
			if (selectedWeek?.id) {
				dispatch(
					getAllPlayersAPI({
						weekId: selectedWeek?.id,
					})
				);
				dispatch(
					getSpecificUserWeekPredictionAPI({
						weekId: selectedWeek?.id,
						username,
					})
				);
			}
		} else if (seasons?.[0]?.id && selectedWeek?.id) {
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
				getSpecificUserWeekPredictionAPI({
					weekId: selectedWeek?.id,
					username,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedWeek]);

	// Make latest season the active season
	useEffect(() => {
		if (query_season) {
			const activeSeason = seasons.find(
				(_season) => _season.name === query_season
			);

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

	return (
		<DashboardLayout title={`Prediction History - ${username}`}>
			<section className="predictbeta-header bg-white w-full px-4 lg:px-8 py-3 flex items-center justify-between">
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
							defaultOption={String(
								allWeeks?.find((_week) => _week.number === Number(query_week))
									?.number
							)}
							title={"Week"}
							icon={<VscFilter />}
						/>
					)}
				</div>
			</section>

			{/* Matches */}
			{isFetchingMatches ||
			isFetchingWeeks ||
			isFetchingSeasons ||
			isFetchingSpecificWeekPredictions ? (
				<PageLoading />
			) : (
				<>
					{Array.isArray(specificWeekPredictions?.predictions?.fixtures) &&
					specificWeekPredictions?.predictions?.fixtures.length > 0 ? (
						<>
							<section className="flex py-5 lg:py-10 px-4 lg:px-8">
								<div className="flex-grow bg-white p-3 md:p-5 border rounded-lg">
									<div className="grid md:grid-cols-2 gap-6">
										{allMatches?.map((match) => (
											<SelectionCard
												key={match.id}
												match={{
													...match,
													prediction:
														specificWeekPredictions?.predictions?.fixtures.find(
															(_match) => _match.fixture.id === match.id
														)?.result,
													outcome:
														specificWeekPredictions?.predictions?.fixtures.find(
															(_match) => _match.fixture.id === match.id
														)?.result ===
														specificWeekPredictions?.results?.fixtures.find(
															(_match) => _match.fixture.id === match.id
														)?.result
															? "win"
															: "lose",
												}}
											/>
										))}
									</div>
									<hr className="my-8" />
									<h3 className="text-[#000] font-medium text-lg text-center">
										Deciders
									</h3>
									<div className="grid md:grid-cols-2 gap-6 py-6">
										{/* Most likely To Score to score? */}
										<div>
											<label
												htmlFor="mostLikelyToScore"
												className="mb-2 flex gap-2"
											>
												<p className="text-[#222222] text-sm">
													Most likely to score?
												</p>
												<div className="py-1 px-2 bg-gray-100 rounded-md">
													<p className="text-[#EB1536] text-xs">5 points</p>
												</div>
											</label>
											<Controller
												control={control}
												name="mostLikelyToScore"
												rules={{
													required: "Make a selection",
												}}
												disabled
												defaultValue={allPlayers.find(
													(player) =>
														player.id ===
														specificWeekPredictions?.predictions
															?.mostLikelyToScore?.id
												)}
												render={({ field: { onChange, value, ref } }) => (
													<Select
														ref={ref}
														onChange={onChange}
														options={allPlayers}
														value={value}
														isLoading={isFetchingAllPlayers}
														components={{
															IndicatorSeparator,
														}}
														getOptionValue={(option) => option["id"]}
														getOptionLabel={(option) => option["name"]}
														maxMenuHeight={300}
														placeholder="- Select -"
														classNamePrefix="react-select"
														isClearable
														isDisabled
														styles={
															specificWeekPredictions?.results?.scorers?.some(
																(player) =>
																	player.id ===
																	specificWeekPredictions?.predictions
																		?.mostLikelyToScore?.id
															)
																? correctStyle
																: invalidStyle
														}
													/>
												)}
											/>
										</div>

										{/* More likely To Score to score? */}
										<div>
											<label
												htmlFor="moreLikelyToScore"
												className="mb-2 flex gap-2"
											>
												<p className="text-[#222222] text-sm">
													More likely to score?
												</p>
												<div className="py-1 px-2 bg-gray-100 rounded-md">
													<p className="text-[#EB1536] text-xs">3 points</p>
												</div>
											</label>
											<Controller
												control={control}
												name="moreLikelyToScore"
												rules={{
													required: "Make a selection",
												}}
												disabled
												defaultValue={allPlayers.find(
													(player) =>
														player.id ===
														specificWeekPredictions?.predictions
															?.moreLikelyToScore?.id
												)}
												render={({ field: { onChange, value, ref } }) => (
													<Select
														ref={ref}
														onChange={onChange}
														options={allPlayers}
														value={value}
														isLoading={isFetchingAllPlayers}
														components={{
															IndicatorSeparator,
														}}
														getOptionValue={(option) => option["id"]}
														getOptionLabel={(option) => option["name"]}
														maxMenuHeight={300}
														placeholder="- Select -"
														classNamePrefix="react-select"
														isClearable
														isDisabled
														styles={
															specificWeekPredictions?.results?.scorers?.some(
																(player) =>
																	player.id ===
																	specificWeekPredictions?.predictions
																		?.moreLikelyToScore?.id
															)
																? correctStyle
																: invalidStyle
														}
													/>
												)}
											/>
										</div>

										{/* Likely to score? */}
										<div>
											<label
												htmlFor="likelyToScore"
												className="mb-2 flex gap-2"
											>
												<p className="text-[#222222] text-sm">
													Likely to score?
												</p>
												<div className="py-1 px-2 bg-gray-100 rounded-md">
													<p className="text-[#EB1536] text-xs">1 points</p>
												</div>
											</label>
											<Controller
												control={control}
												name="likelyToScore"
												rules={{
													required: "Make a selection",
												}}
												disabled
												defaultValue={allPlayers.find(
													(player) =>
														player.id ===
														specificWeekPredictions?.predictions?.likelyToScore
															?.id
												)}
												render={({ field: { onChange, value, ref } }) => (
													<Select
														ref={ref}
														onChange={onChange}
														options={allPlayers}
														value={value}
														isLoading={isFetchingAllPlayers}
														components={{
															IndicatorSeparator,
														}}
														getOptionValue={(option) => option["id"]}
														getOptionLabel={(option) => option["name"]}
														maxMenuHeight={300}
														placeholder="- Select -"
														classNamePrefix="react-select"
														isClearable
														menuPlacement="auto"
														isDisabled
														styles={
															specificWeekPredictions?.results?.scorers?.some(
																(player) =>
																	player.id ===
																	specificWeekPredictions?.predictions
																		?.likelyToScore?.id
															)
																? correctStyle
																: invalidStyle
														}
													/>
												)}
											/>
										</div>

										{/* Goal time */}
										<div className="">
											<label htmlFor="timeOfFirstGoal" className="mb-2 block">
												<p className="text-[#222222] text-sm">
													Minute the earliest goal in the round will be scored
												</p>
											</label>
											<Input
												id="timeOfFirstGoal"
												type="text"
												placeholder="1"
												disabled
												defaultValue={
													specificWeekPredictions?.predictions?.timeOfFirstGoal
												}
												className={`w-full input ${
													specificWeekPredictions?.predictions
														?.timeOfFirstGoal ===
													specificWeekPredictions?.results?.timeOfFirstGoal
														? "correct"
														: "invalid"
												}`}
											/>
										</div>
									</div>

									<div className="mt-6 bg-[#f5f8fa] border border-gray-400 border-dashed rounded-md text-center py-3 px-10">
										<p className="text-[#5F6B7A]">
											Week {query_week} points:{" "}
											<span className="font-semibold">
												{specificWeekPredictions?.score}
											</span>
										</p>
									</div>
								</div>
							</section>
						</>
					) : (
						<div className="flex items-center justify-center py-20 lg:py-32 px-4 lg:px-0 flex-col text-center">
							<h3 className="font-bold text-3xl mb-2">
								There no Predictions for this week
							</h3>
							<p className="">
								This user didn't make any prediction for this week.
							</p>
						</div>
					)}
				</>
			)}
		</DashboardLayout>
	);
};

export default UserPredictionHistory;
