import React from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import styled from "styled-components";

import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	ColumnDef,
	flexRender,
	getSortedRowModel,
	SortingState,
} from "@tanstack/react-table";

import {
	IClub,
	IPlayer,
	LeaderboardItem,
	PrivateLeagueItem,
	WalletHistoryItem,
} from "../types/types";
import { P } from "./Texts";
import { TextSkeleton } from "./loaders/TextSkeleton";

const TableHolder = styled.table`
	// max-height: 80vh;
	box-shadow: 0px 4px 16px 0px #0000000d;
	border: 1px solid #e1e7ec;

	border-radius: 10px;
	border-spacing: 0;
	border-collapse: separate;

	tr:nth-child(even) {
		background: #f5f8fa;
		box-shadow: 0px -1px 0px 0px #e1e7ec inset;
	}

	tr:nth-child(odd):not(:last-of-type) {
		background: #ffffff;
		box-shadow: 0px -1px 0px 0px #e1e7ec inset;
	}

	tbody {
		tr.leaderboard-table {
			&.position-1 {
				background: #27c079;
				color: #fff;
			}
			&.position-2 {
				background: #71d0a7;
			}
			&.position-3 {
				background: #c4efdf;
			}
		}

		tr:last-of-type {
			td:first-of-type {
				border-radius: 0 0 0 10px;
			}
			td:last-of-type {
				border-radius: 0 0 10px 0;
			}
		}
	}
`;

const TableHeadStyle = styled.th`
	&:first-of-type {
		border-radius: 10px 0 0 0;
	}
	&:last-of-type {
		border-radius: 0 10px 0 0;
	}
`;

type Props = {
	data:
		| IClub[]
		| IPlayer[]
		| WalletHistoryItem[]
		| LeaderboardItem[]
		| PrivateLeagueItem[];
	columns:
		| ColumnDef<IClub>[]
		| ColumnDef<IPlayer>[]
		| ColumnDef<WalletHistoryItem>[]
		| ColumnDef<LeaderboardItem>[]
		| ColumnDef<PrivateLeagueItem>[];
	rows: number;
	loading?: boolean;
	isLeaderboardTable?: boolean;
	totalPages: number;
	current_page: number;
	setCurrentPage: (page: number) => void;
	empty_message?: string;
	empty_sub_message?: string;
	noPagination?: boolean;
};

export function CardTableFooter({
	pageNumber = 1,
	totalPages = 1,
	prevOnClick,
	nextOnClick,
	canPreviousPage,
	canNextPage,
}: {
	pageNumber: number;
	totalPages: number;
	prevOnClick: () => void;
	nextOnClick: () => void;
	canPreviousPage?: boolean;
	canNextPage?: boolean;
}) {
	return (
		<div className="flex justify-end items-center mt-4 pb-6 px-6 md:px-2 gap-x-4">
			{canPreviousPage && (
				<button
					type="button"
					className="text-sm leading-7 text-[#051B30] flex items-center gap-1"
					disabled={!canPreviousPage}
					onClick={prevOnClick}
				>
					<FiChevronsLeft color="inherit" />
					Prev
				</button>
			)}
			<span className="text-sm text-[#8895A7]">
				{"Page " + pageNumber + " of " + totalPages}
			</span>
			{canNextPage && (
				<button
					type="button"
					className="text-sm leading-7 text-[#EB1536] flex items-center gap-1"
					disabled={!canNextPage}
					onClick={nextOnClick}
				>
					Next
					<FiChevronsRight color="inherit" />
				</button>
			)}
		</div>
	);
}

function Table({
	columns,
	data,
	loading,
	current_page,
	totalPages,
	isLeaderboardTable,
	setCurrentPage,
	empty_message,
	empty_sub_message,
}: Props) {
	const tableData = React.useMemo(
		() => (loading ? Array(3).fill({}) : data?.length > 0 ? data : []),
		[loading, data]
	);

	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		manualPagination: true,
		debugTable: true,
	});

	return (
		<>
			{/* <div className=""> */}
			{loading ? (
				<div className="block max-w-full overflow-x-auto">
					<TableHolder className="items-center w-full bg-transparent border-collapse relative">
						<thead className="">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHeadStyle
											key={header.id}
											colSpan={header.colSpan}
											scope="col"
											className={
												"text-[#3F3E4D] bg-[#E1E7EC] text-xs font-medium px-6 py-4 align-middle whitespace-nowrap text-left"
											}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableHeadStyle>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<tr
										className="border-t-0 px-6 align-middle whitespace-nowrap py-6"
										key={row.id}
									>
										{row.getVisibleCells().map((cell) => {
											return (
												<td className="px-6 py-6 text-[#3F3E4D]" key={cell.id}>
													<TextSkeleton />
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</TableHolder>
				</div>
			) : (
				<>
					{tableData && data?.length > 0 ? (
						<>
							<div className="max-w-full overflow-x-scroll">
								<TableHolder className="w-full bg-transparent border-collapse">
									<thead className="">
										{table.getHeaderGroups().map((headerGroup) => (
											<tr key={headerGroup.id}>
												{headerGroup.headers.map((header) => (
													<TableHeadStyle
														key={header.id}
														colSpan={header.colSpan}
														scope="col"
														onClick={header.column.getToggleSortingHandler()}
														className={`text-[#3F3E4D] bg-[#E1E7EC] text-xs font-medium px-6 py-4 align-middle  whitespace-nowrap text-left ${
															header.column.getCanSort()
																? "cursor-pointer select-none"
																: ""
														}`}
														title={
															header.column.getCanSort()
																? header.column.getNextSortingOrder() === "asc"
																	? "Sort ascending"
																	: header.column.getNextSortingOrder() === "desc"
																	? "Sort descending"
																	: "Clear sort"
																: undefined
														}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{{
															asc: " 🔼",
															desc: " 🔽",
														}[header.column.getIsSorted() as string] ?? null}
													</TableHeadStyle>
												))}
											</tr>
										))}
									</thead>
									<tbody>
										{table.getRowModel().rows.map((row) => {
											return (
												<tr
													className={`border-t-0 px-6 align-middle font-normal text-[#3F3E4D] text-sm whitespace-nowrap py-6 ${
														isLeaderboardTable ? "leaderboard-table" : ""
													} ${
														row.original?.position
															? `position-${row.original.position}`
															: ""
													}`}
													key={row.id}
												>
													{row.getVisibleCells().map((cell) => {
														return (
															<td className="px-6 py-3" key={cell.id}>
																{flexRender(
																	cell.column.columnDef.cell,
																	cell.getContext()
																)}
															</td>
														);
													})}
												</tr>
											);
										})}
									</tbody>
								</TableHolder>
							</div>
							<CardTableFooter
								pageNumber={current_page}
								totalPages={totalPages}
								prevOnClick={() => setCurrentPage(Number(current_page) - 1)}
								nextOnClick={() => setCurrentPage(Number(current_page) + 1)}
								canNextPage={current_page < totalPages}
								canPreviousPage={current_page > 1}
							/>
						</>
					) : (
						<>
							<div className="flex items-center justify-center flex-col py-20 lg:py-32">
								<h3 className="font-bold text-3xl mb-2">
									{empty_message ?? "Check later!"}
								</h3>
								<P className="">{empty_sub_message ?? "Nothing to show"}</P>
							</div>
						</>
					)}
				</>
			)}
			{/* </div> */}
		</>
	);
}

export default Table;
