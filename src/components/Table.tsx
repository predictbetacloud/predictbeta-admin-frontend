import React from "react";
import styled from "styled-components";

import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	ColumnDef,
	flexRender,
} from "@tanstack/react-table";

import { IClub, IPlayer } from "../types/types";
import Button from "./Buttons";
import { P } from "./Texts";
import { TextSkeleton } from "./TextSkeleton";

const TableHolder = styled.table`
	max-height: 80vh;
	box-shadow: 0px 4px 16px 0px #0000000d;
	border: 1px solid #e1e7ec;

	border-radius: 10px;
	border-spacing: 0;
	border-collapse: separate;

	tr:nth-child(even) {
		background: #f5f8fa;
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
	data: IClub[] | IPlayer[];
	columns: ColumnDef<IClub>[] | ColumnDef<IPlayer>[];
	rows: number;
	loading?: boolean;
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
		<div className="flex justify-end items-center mt-4 pb-6 px-6 md:px-2 ">
			<div className="flex">
				<span className="text-sm leading-7 text-gray-500">
					{"Page " + pageNumber + " of " + totalPages}
				</span>
			</div>
			<div className="flex">
				{canPreviousPage && (
					<Button.Outline
						disabled={!canPreviousPage}
						title="Prev"
						className="font-bold text-base leading-7 text-gray-500"
						onClick={prevOnClick}
					/>
				)}
				{canNextPage && (
					<Button.Outline
						disabled={!canNextPage}
						title="Next"
						className="font-bold text-base leading-7 text-gray-500"
						onClick={nextOnClick}
					/>
				)}
			</div>
		</div>
	);
}

function Table({
	columns,
	data,
	loading,
	current_page,
	totalPages,
	setCurrentPage,
	empty_message,
	empty_sub_message,
}: Props) {
	const tableData = React.useMemo(
		() => (loading ? Array(3).fill({}) : data?.length > 0 ? data : []),
		[loading, data]
	);

	const table = useReactTable({
		data: tableData,
		columns,
		// Pipeline
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		//
		debugTable: true,
	});

	return (
		<div className={" flex flex-col min-w-0 break-words w-full"}>
			{loading ? (
				<div className="block w-full overflow-x-auto">
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
							<div className="block w-full overflow-x-auto">
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
															"text-[#3F3E4D] bg-[#E1E7EC] text-xs font-medium px-6 py-4 align-middle  whitespace-nowrap text-left"
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
													className="border-t-0 px-6 align-middle font-normal text-sm whitespace-nowrap py-6"
													key={row.id}
												>
													{row.getVisibleCells().map((cell) => {
														return (
															<td
																className="px-6 py-3 text-[#3F3E4D]"
																key={cell.id}
															>
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
								totalPages={Math.ceil(Number(totalPages ?? 10) / 10)}
								prevOnClick={() => setCurrentPage(Number(current_page) - 1)}
								nextOnClick={() => setCurrentPage(Number(current_page) + 1)}
								canNextPage={current_page < totalPages / 10}
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
		</div>
	);
}

export default Table;
