import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import * as dfn from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { RiDeleteBinFill } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { P } from "../../../components/Texts";
import Table from "../../../components/Table";

import {
	selectIsFetchingSpecificTeam,
	selectIsFetchingSpecificTeamPlayers,
	selectShowAddPlayerModal,
	selectShowDeletePlayerModal,
	selectShowEditPlayerModal,
	selectSpecificTeam,
	selectSpecificTeamPlayers,
	setShowAddPlayerModal,
	setShowDeletePlayerModal,
	setShowEditPlayerModal,
} from "../../../state/slices/teams";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
	getSpecificClubPlayersAPI,
	getSpecificClubTeamAPI,
} from "../../../api/teamsAPI";
import { IPlayer } from "../../../types/types";
import PageLoading from "../../../components/loaders/PageLoading";
import AddPlayerModal from "../../../components/modals/AddPlayerModal";
import EditPlayerModal from "../../../components/modals/EditPlayerModal";
import DeletePlayerModal from "../../../components/modals/DeletePlayerModal";

const SpecificClubTeam = () => {
	const dispatch = useAppDispatch();
	const { clubId } = useParams();
	const navigate = useNavigate();

	const specificClub = useAppSelector(selectSpecificTeam);
	const players = useAppSelector(selectSpecificTeamPlayers);
	const showAddPlayerModal = useAppSelector(selectShowAddPlayerModal);
	const showEditPlayerModal = useAppSelector(selectShowEditPlayerModal);
	const showDeletePlayerModal = useAppSelector(selectShowDeletePlayerModal);
	const isFetchingClub = useAppSelector(selectIsFetchingSpecificTeam);
	const isFetchingPlayers = useAppSelector(selectIsFetchingSpecificTeamPlayers);

	const [page, setPage] = useState(1);
	const [selectedPlayer, setSelectedPlayer] = useState({
		name: "",
		number: 0,
	});

	useMemo(() => {
		dispatch(getSpecificClubTeamAPI({ clubId }));
		dispatch(getSpecificClubPlayersAPI({ clubId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clubId]);

	const columns = useMemo<ColumnDef<IPlayer>[]>(
		() => [
			{
				header: "PLAYER NAME",
				accessorKey: "name",
				cell: (info) => info.getValue(),
			},
			{
				header: "NUMBER",
				accessorKey: "number",
				cell: (info) => info.getValue(),
			},
			{
				header: "DATE ADDED",
				accessorKey: "createdAt",
				cell: (info) => {
					const dateValue = info.getValue<Date | string>();
					const date =
						typeof dateValue === "string" ? new Date(dateValue) : dateValue;

					if (date instanceof Date && !isNaN(date.getTime())) {
						return dfn.format(date, "MMM d, yyyy");
					} else {
						return "Invalid Date";
					}
				},
			},
			{
				header: "ACTION",
				accessorKey: "id",
				cell: (info) => {
					// const teamID = info.getValue();

					return (
						<div className="flex space-x-2">
							<Button.Outline
								title="Edit player"
								onClick={() => {
									setSelectedPlayer({
										name: info.row.original.name,
										number: info.row.original.number,
									});
									dispatch(setShowEditPlayerModal(true));
								}}
							/>
							<Button.Outline
								title=""
								content={<RiDeleteBinFill color="#6D7786" size={24} />}
								onClick={() => {
									setSelectedPlayer({
										name: info.row.original.name,
										number: info.row.original.number,
									});
									dispatch(setShowDeletePlayerModal(true));
								}}
							/>
						</div>
					);
				},
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<DashboardLayout
			title={`Team management ${
				!isFetchingClub ? `- ${specificClub?.name}` : ""
			}  `}
		>
			{isFetchingClub || isFetchingPlayers ? (
				<PageLoading />
			) : (
				<>
					<section className="w-full px-8 pt-8 flex items-center justify-between">
						<Button.Outline
							title=""
							onClick={() => navigate(-1)}
							content={
								<div className="flex items-center space-x-1">
									<TiArrowBackOutline color="#6D7786" size={20} />
									<p className="text-sm">Back</p>
								</div>
							}
						/>
						<Button
							title=""
							onClick={() => dispatch(setShowAddPlayerModal(true))}
							content={
								<P className="flex items-center gap-x-2">
									<FaPlus size={12} />
									Add new player
								</P>
							}
						/>
					</section>
					<section className="w-full p-8">
						<Table
							data={players}
							columns={columns}
							rows={10}
							loading={isFetchingPlayers}
							totalPages={1}
							current_page={page}
							setCurrentPage={(page: number): void => {
								setPage(page);
								throw new Error("Function not implemented.");
							}}
						/>
					</section>
					{showAddPlayerModal ? <AddPlayerModal /> : null}
					{showEditPlayerModal ? (
						<EditPlayerModal
							playerName={selectedPlayer?.name ?? ""}
							playerNumber={selectedPlayer?.number ?? 0}
						/>
					) : null}
					{showDeletePlayerModal ? (
						<DeletePlayerModal
							playerName={selectedPlayer?.name ?? ""}
							teamName={specificClub?.name ?? ""}
						/>
					) : null}
				</>
			)}
		</DashboardLayout>
	);
};

export default SpecificClubTeam;
