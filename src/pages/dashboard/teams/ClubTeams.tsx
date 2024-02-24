import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import * as dfn from "date-fns";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import TabNav from "../../../components/layout/TabNav";
import { P } from "../../../components/Texts";
import Table from "../../../components/Table";

import {
	selectAllClubTeams,
	selectIsFetchingTeams,
} from "../../../state/slices/teams";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getAllClubTeamsAPI } from "../../../api/teamsAPI";
import { IClub } from "../../../types/types";

const ClubTeams = () => {
	const clubs = useAppSelector(selectAllClubTeams);
	const isFetchingClubs = useAppSelector(selectIsFetchingTeams);
	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);

	useMemo(
		() =>
			dispatch(
				getAllClubTeamsAPI({
					params: {
						limit: 10,
						// page,
						// ...params,
					},
				})
			),
		[]
	);

	const columns = useMemo<ColumnDef<IClub>[]>(
		() => [
			{
				header: "CLUB NAME",
				accessorKey: "name",
				cell: (info) => {
					const clubName = info.getValue();

					return (
						<div className="flex items-center space-x-4">
							<img
								src={info.row.original.clubLogo}
								alt={String(clubName)}
								className="w-8 h-8"
							/>
							<span>{String(clubName)}</span>
						</div>
					);
				},
			},
			{
				header: "ABBREV.",
				accessorKey: "shortName",
				cell: (info) => info.getValue(),
			},
			{
				header: "DATE ADDED",
				accessorKey: "createdAt",
				cell: (info) => {
					// Assuming info.getValue() returns a date string or a Date object
					const dateValue = info.getValue<Date | string>();

					// If dateValue is a string, convert it to a Date object
					const date =
						typeof dateValue === "string" ? new Date(dateValue) : dateValue;

					// Check if date is a valid Date object
					if (date instanceof Date && !isNaN(date.getTime())) {
						return dfn.format(date, "MMM d, yyyy");
					} else {
						return "Invalid Date";
					}
				},
			},
			{
				header: "PLAYERS",
				accessorKey: "players",
				cell: (info) => {
					const players = info.getValue<[]>();
					if (Array.isArray(players) && players.length) {
						return players.length;
					} else {
						return 0;
					}
				},
			},
			{
				header: "ACTION",
				accessorKey: "id",
				cell: (info) => {
					const teamID = info.getValue();

					return (
						<div className="flex space-x-2">
							<Link to={`/dashboard/teams/edit/${teamID}`}>
								<Button.Outline title="Edit team" />
							</Link>
							<Link to={`/dashboard/teams/view/${teamID}`}>
								<Button.Outline title="Manage players" />
							</Link>
						</div>
					);
				},
			},
		],
		[]
	);

	return (
		<DashboardLayout title="Team management">
			<section className="predictbeta-header w-full px-8  flex items-center justify-between">
				<div className="pt-8">
					<TabNav tabs={[{ path: "/dashboard/teams", title: "Club sides" }]} />
				</div>

				<Link to="/dashboard/teams/new-club">
					<Button
						title=""
						content={
							<P className="flex items-center gap-x-2">
								<FaPlus size={12} />
								New team
							</P>
						}
					/>
				</Link>
			</section>
			<section className="w-full p-8">
				<Table
					data={clubs}
					columns={columns}
					rows={10}
					loading={isFetchingClubs}
					totalPages={1}
					current_page={page}
					setCurrentPage={(page: number): void => {
						setPage(page);
						throw new Error("Function not implemented.");
					}}
				/>
			</section>
		</DashboardLayout>
	);
};

export default ClubTeams;
