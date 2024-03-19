import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import CreateSeasonModal from "../../../components/modals/CreateSeasonModal";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllWeeks,
	selectIsFetchingMatches,
	selectMatches,
	selectShowCreateMatchModal,
	selectShowCreateSeasonModal,
	selectShowCreateWeekModal,
	selectShowDeleteMatchModal,
	selectShowEditMatchModal,
	selectShowPublishWeekModal,
	setShowCreateMatchModal,
	setShowCreateSeasonModal,
	setShowCreateWeekModal,
	setShowDeleteMatchModal,
	setShowEditMatchModal,
	setShowPublishWeekModal,
} from "../../../state/slices/fixtures";
import {
	getAllMatchesAPI,
	getAllSeasonsAPI,
	getAllWeeksAPI,
} from "../../../api/fixturesAPI";
import CreateWeekModal from "../../../components/modals/CreateWeekModal";
import { VscFilter } from "react-icons/vsc";
import { useLocation, useSearchParams } from "react-router-dom";
import { InputPlaceholder } from "../../../components/inputs/Input";
import { AiOutlineLoading } from "react-icons/ai";
import CustomListBox from "../../../components/inputs/CustomListBox";
import CreateMatchModal from "../../../components/modals/CreateMatchModal";
import PublishWeekModal from "../../../components/modals/PublishWeekModal";
import PageLoading from "../../../components/loaders/PageLoading";
import { MatchCard } from "../../../components/fixtures/MatchCard";
import { IMatch } from "../../../types/types";
import EditMatchModal from "../../../components/modals/EditMatchModal";
import DeleteMatchModal from "../../../components/modals/DeleteMatchModal";

const Results = () => {
	const dispatch = useAppDispatch();
	const [, setSearchParams] = useSearchParams();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const query_week = queries?.week;

	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isFetchingMatches = useAppSelector(selectIsFetchingMatches);
	const showCreateSeasonModal = useAppSelector(selectShowCreateSeasonModal);
	const showCreateWeekModal = useAppSelector(selectShowCreateWeekModal);
	const showCreateMatchModal = useAppSelector(selectShowCreateMatchModal);
	const showEditMatchModal = useAppSelector(selectShowEditMatchModal);
	const showDeleteMatchModal = useAppSelector(selectShowDeleteMatchModal);
	const showPublishWeekModal = useAppSelector(selectShowPublishWeekModal);

	const allWeeks = useAppSelector(selectAllWeeks);
	const allMatches = useAppSelector(selectMatches);
	const seasons = useAppSelector(selectAllSeasons);

	const [selectedWeek, setSelectedWeek] = useState<{
		id: string;
		number: string;
	} | null>(null);

	const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);

	// Get all Season
	useMemo(() => {
		dispatch(getAllSeasonsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Get all weeks in the latest season
	useMemo(() => {
		if (seasons?.[0]?.id) {
			dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seasons?.[0]?.id]);

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
				setSearchParams({ week: String(allWeeks?.[0]?.id) });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allWeeks, query_week]);

	useMemo(() => {
		if (seasons?.[0]?.id && selectedWeek?.id) {
			dispatch(
				getAllMatchesAPI({
					seasonId: seasons?.[0]?.id,
					weekId: selectedWeek?.id,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedWeek]);

	return (
		<DashboardLayout title="Fixture management">
			<section className="predictbeta-header w-full px-8 py-3 flex items-center justify-between sticky top-[90px]">
				{/* week select */}
				<div>
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
								value: String(week.id),
							}))}
							onChange={(value: string): void => {
								setSearchParams({ week: String(value) });
							}}
							defaultOption={selectedWeek?.id}
							title={"Week"}
							icon={<VscFilter />}
						/>
					)}
				</div>

				{/* actions */}
				<div className="flex items-center space-x-4">
					<Button.Outline
						title="Create Season"
						onClick={() => dispatch(setShowCreateSeasonModal(true))}
					/>
					<Button.Outline
						title="Create Week"
						onClick={() => dispatch(setShowCreateWeekModal(true))}
					/>
					<Button.Outline
						title="Create Match"
						onClick={() => dispatch(setShowCreateMatchModal(true))}
					/>
					<Button
						title="Publish Week"
						onClick={() => {
							dispatch(setShowPublishWeekModal(true));
						}}
					/>
				</div>
			</section>

			{/* Matches */}
			{isFetchingMatches ? (
				<PageLoading />
			) : (
				<section className="py-10 px-8">
					{allMatches?.length > 0 ? (
						<div className="grid md:grid-cols-2 gap-6">
							{allMatches?.map((match, idx) => (
								<div key={idx}>
									<MatchCard
										key={match.id}
										home={match.homeTeam}
										away={match.awayTeam}
										id={match.id}
										matchTime={match.fixtureDateTime}
										adminSet
										locked
										toggleUpdateModal={() => {
											setSelectedMatch(match);
											dispatch(setShowEditMatchModal(true));
										}}
										toggleDeleteModal={() => {
											setSelectedMatch(match);
											dispatch(setShowDeleteMatchModal(true));
										}}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="flex items-center justify-center py-20 lg:py-32 flex-col">
							<h3 className="font-bold text-3xl mb-2">
								There no matches for this week
							</h3>
							<p className="">Create a match to begin</p>
						</div>
					)}
				</section>
			)}

			{showCreateSeasonModal ? <CreateSeasonModal /> : null}
			{showCreateWeekModal ? <CreateWeekModal /> : null}
			{showCreateMatchModal ? <CreateMatchModal /> : null}
			{showEditMatchModal ? <EditMatchModal match={selectedMatch} /> : null}
			{showDeleteMatchModal ? (
				<DeleteMatchModal
					match={selectedMatch}
					weekId={Number(selectedWeek?.id)}
					seasonId={seasons?.[0]?.id}
				/>
			) : null}
			{showPublishWeekModal ? (
				<PublishWeekModal
					weekId={Number(selectedWeek?.id)}
					seasonId={seasons?.[0]?.id}
					season={seasons?.[0]?.name}
					week={Number(selectedWeek?.number)}
				/>
			) : null}
		</DashboardLayout>
	);
};

export default Results;
