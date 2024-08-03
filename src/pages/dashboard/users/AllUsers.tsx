import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { P } from "../../../components/Texts";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { IUser } from "../../../types/types";
import {
	selectAllUsers,
	selectIsFetchingAllUsers,
	selectShowAddUserModal,
	setShowAddUserModal,
} from "../../../state/slices/users";
import { getAllUsersAPI } from "../../../api/usersAPI";
import CreateUserModal from "../../../components/modals/CreateUserModal";
import { Input } from "../../../components/inputs/Input";

const AllUsers = () => {
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const page = queries?.page;

	const allUsers = useAppSelector(selectAllUsers);
	const showAddUserModal = useAppSelector(selectShowAddUserModal);
	const isFetchingUsers = useAppSelector(selectIsFetchingAllUsers);
	const dispatch = useAppDispatch();

	const [, setSearchParams] = useSearchParams();

	const [search, setSearch] = useState('')

	useMemo(
		() =>
			dispatch(
				getAllUsersAPI({
					params: {
						limit: 10,
						page,
						// ...params,
					},
				})
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[page]
	);

	useEffect(() => {
		if (!page) {
			setSearchParams({
				page: String(1),
			});
		}
	});

	const columns = useMemo<ColumnDef<IUser>[]>(
		() => [
			{
				header: "USER NAME",
				accessorKey: "firstName",
				cell: (info) => {
					const firstName = info.getValue();

					return (
						<p className="">
							<span>{String(firstName)}</span> {info.row.original.surname}
						</p>
					);
				},
			},
			{
				header: "USERNAME",
				accessorKey: "username",
				cell: (info) => info.getValue(),
			},
			{
				header: "EMAIL ADDRESS",
				accessorKey: "email",
				cell: (info) => info.getValue(),
			},
			{
				header: "PHONE NUMBER",
				accessorKey: "mobileNumber",
				cell: (info) => info.getValue(),
			},
			{
				header: "ACTION",
				accessorKey: "id",
				cell: (info) => {
					const userID = info.getValue();

					return (
						<div className="flex space-x-2">
							<Link to={`/dashboard/users/view/${userID}`}>
								<Button.Outline title="View user" />
							</Link>
						</div>
					);
				},
			},
		],
		[]
	);

	console.log(allUsers)

	return (
		<DashboardLayout title="User management">
			<section className="predictbeta-header w-full px-8 py-4  flex items-center justify-between">
				{/* <Link to="/dashboard/users/new-club"> */}
				<div>
					<Input
						type="text"
						placeholder="Search playername..."
						onChange={(e)=>setSearch(e.target.value)}
						className={`w-full md:flex-1`}
					/>
				</div>
				<Button
					title=""
					onClick={() => dispatch(setShowAddUserModal(true))}
					content={
						<P className="flex items-center gap-x-2">
							<FaPlus size={12} />
							New User
						</P>
					}
				/>
				{/* </Link> */}
			</section>
			<section className="w-full p-8">
				<Table
					data={allUsers?.items.filter((user)=>{return user.username?.toLowerCase() === '' ? user : user.username?.toLowerCase().includes(search.toLowerCase())}) ?? []}
					columns={columns}
					rows={10}
					loading={isFetchingUsers}
					totalPages={allUsers?.meta.totalPages ?? 1}
					current_page={Number(page ?? 1)}
					empty_message="There are no registered users"
					empty_sub_message="You will see users soon"
					setCurrentPage={(page: number): void => {
						setSearchParams({
							page: String(page),
						});
					}}
				/>
			</section>

			{showAddUserModal ? <CreateUserModal /> : null}
		</DashboardLayout>
	);
};

export default AllUsers;
