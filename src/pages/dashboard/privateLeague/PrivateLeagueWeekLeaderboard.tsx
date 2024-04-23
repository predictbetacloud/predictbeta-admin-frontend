import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { LeaderboardItem } from "../../../types/types";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
} from "../../../state/slices/fixtures";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getAllSeasonsAPI, getAllWeeksAPI } from "../../../api/fixturesAPI";
import { InputPlaceholder } from "../../../components/inputs/Input";
import { AiOutlineLoading } from "react-icons/ai";
import CustomListBox from "../../../components/inputs/CustomListBox";
import { VscFilter } from "react-icons/vsc";
import TabNav from "../../../components/layout/TabNav";
import {
	getPrivateLeagueWeekLeaderboardAPI,
	getSpecificPrivateLeagueAPI,
} from "../../../api/privateLeagueAPI";
import {
	selectIsFetchingSpecificPrivateLeague,
	selectIsFetchingSpecificPrivateLeagueWeekLeaderboard,
	selectSpecificPrivateLeague,
	selectSpecificPrivateLeagueLeaderboard,
} from "../../../state/slices/privateLeague";

const PrivateLeagueWeekLeaderboard = () => {
	const dispatch = useAppDispatch();
	const { leagueId } = useParams();

	const [, setSearchParams] = useSearchParams();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;
	const query_season = queries?.season;

	const leaderboard = useAppSelector(selectSpecificPrivateLeagueLeaderboard);
	const leagueDetails = useAppSelector(selectSpecificPrivateLeague);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingWeekLeaderboard = useAppSelector(
		selectIsFetchingSpecificPrivateLeagueWeekLeaderboard
	);
	const isFetchingSpecificPrivateLeague = useAppSelector(
		selectIsFetchingSpecificPrivateLeague
	);

	const [page, setPage] = useState(1);

	const allWeeks = useAppSelector(selectAllWeeks);
	const seasons = useAppSelector(selectAllSeasons);

	const [selectedWeek, setSelectedWeek] = useState<{
		id: string;
		number: string;
	} | null>(null);

	// Get all Season
	useMemo(() => {
		dispatch(getAllSeasonsAPI({}));
		dispatch(getSpecificPrivateLeagueAPI({ leagueId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Make latest week the active week
	useMemo(() => {
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

	useMemo(() => {
		if (query_season) {
			const activeSeason = seasons.find(
				(_season) => _season.name === query_season
			);
			if (activeSeason?.id && selectedWeek?.id) {
				dispatch(
					getPrivateLeagueWeekLeaderboardAPI({
						leagueId,
						weekId: selectedWeek?.id,
					})
				);
			}
		} else if (seasons?.[0]?.id && selectedWeek?.id) {
			dispatch(
				getPrivateLeagueWeekLeaderboardAPI({
					leagueId,
					weekId: selectedWeek?.id,
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

	const columns = useMemo<ColumnDef<LeaderboardItem>[]>(
		() => [
			{
				header: "POSITION",
				accessorKey: "position",
				cell: (info) => info.getValue(),
				sortingFn: "alphanumeric",
				enableSorting: true,
			},
			{
				header: "PLAYER NAME",
				accessorKey: "username",
				cell: (info) => {
					const username = String(info.getValue());
					return <p className="capitalize">{username}</p>;
				},
			},
			{
				header: "POINTS",
				accessorKey: "points",
				cell: (info) => Number(info.getValue()).toLocaleString(),
			},
		],
		[]
	);

	console.log("leaderboard", leaderboard);

	return (
		<DashboardLayout
			title={
				isFetchingSpecificPrivateLeague
					? "Standings"
					: `Standings - ${leagueDetails?.name}`
			}
		>
			<section className="predictbeta-header bg-white w-full px-4 lg:px-8 flex lg:items-end lg:justify-between flex-col-reverse lg:flex-row gap-4 lg:gap-0">
				<TabNav
					tabs={[
						{
							path: `/dashboard/private-league/standing/${leagueDetails?.id}`,
							title: "Week",
						},
						{
							path: `/dashboard/private-league/standing/season/${leagueDetails?.id}`,
							title: "Season",
						},
					]}
				/>
				{/* season select */}
				<div className="flex items-center gap-4 py-3">
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
			<section className="w-full px-4 py-8 lg:p-8">
				<Table
					data={leaderboard}
					columns={columns}
					rows={10}
					loading={
						isFetchingSeasons || isFetchingWeeks || isFetchingWeekLeaderboard
					}
					totalPages={1}
					isLeaderboardTable
					current_page={page}
					setCurrentPage={(page: number): void => {
						setPage(page);
						// throw new Error("Function not implemented.");
					}}
					empty_message="No leaderboard"
					empty_sub_message="There is no leaderboard for this week"
				/>
			</section>
		</DashboardLayout>
	);
};

export default PrivateLeagueWeekLeaderboard;
