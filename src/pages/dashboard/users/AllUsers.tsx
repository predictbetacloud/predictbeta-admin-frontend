import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

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

const AllUsers = () => {
	const allUsers = useAppSelector(selectAllUsers);
	const showAddUserModal = useAppSelector(selectShowAddUserModal);
	const isFetchingUsers = useAppSelector(selectIsFetchingAllUsers);
	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);

	useMemo(
		() =>
			dispatch(
				getAllUsersAPI({
					params: {
						limit: 10,
						// page,
						// ...params,
					},
				})
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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

	return (
		<DashboardLayout title="User management">
			<section className="predictbeta-header w-full px-8 py-4  flex items-center justify-end">
				{/* <Link to="/dashboard/users/new-club"> */}
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
					data={allUsers}
					columns={columns}
					rows={10}
					loading={isFetchingUsers}
					totalPages={1}
					current_page={page}
					empty_message="There are no registered users"
					empty_sub_message="You will see users soon"
					setCurrentPage={(page: number): void => {
						setPage(page);
						throw new Error("Function not implemented.");
					}}
				/>
			</section>

			{showAddUserModal ? <CreateUserModal /> : null}
		</DashboardLayout>
	);
};

export default AllUsers;
