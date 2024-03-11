import { useMemo, useState } from "react";
import * as dfn from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { TiArrowBackOutline } from "react-icons/ti";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { WalletHistoryItem, statusEnum } from "../../../types/types";
import PageLoading from "../../../components/loaders/PageLoading";

import {
	getSpecificUserAPI,
	getSpecificUserWalletHistoryAPI,
} from "../../../api/usersAPI";
import {
	selectIsFetchingSpecificUser,
	selectIsFetchingSpecificUserWalletHistory,
	selectShowBlockUserModal,
	selectShowDeleteUserModal,
	selectShowEditUserModal,
	selectShowFundUserModal,
	selectShowUnblockUserModal,
	selectSpecificUser,
	selectSpecificUserWalletHistory,
	setShowBlockUserModal,
	setShowDeleteUserModal,
	setShowEditUserModal,
	setShowFundUserModal,
	setShowUnblockUserModal,
} from "../../../state/slices/users";
import PillIndicator from "../../../components/PillIndicators";
import { formatCurrency } from "../../../utils/utils";
import FundUserModal from "../../../components/modals/FundUserModal";
import DeleteUserModal from "../../../components/modals/DeleteUserModal";
import BlockUserModal from "../../../components/modals/BlockUserModal";
import UnblockUserModal from "../../../components/modals/UnblockUserModal";
import EditUserModal from "../../../components/modals/EditUserModal";

const SpecificUser = () => {
	const dispatch = useAppDispatch();
	const { userId } = useParams();
	const navigate = useNavigate();

	const specificUser = useAppSelector(selectSpecificUser);
	const walletHistory = useAppSelector(selectSpecificUserWalletHistory);
	const showFundUserModal = useAppSelector(selectShowFundUserModal);
	const showEditUserModal = useAppSelector(selectShowEditUserModal);
	const showDeleteUserModal = useAppSelector(selectShowDeleteUserModal);
	const showBlockUserModal = useAppSelector(selectShowBlockUserModal);
	const showUnblockUserModal = useAppSelector(selectShowUnblockUserModal);
	const isFetchingUser = useAppSelector(selectIsFetchingSpecificUser);
	const isFetchingUserWalletHistory = useAppSelector(
		selectIsFetchingSpecificUserWalletHistory
	);

	const [page, setPage] = useState(1);

	useMemo(() => {
		dispatch(getSpecificUserAPI({ userId }));
		dispatch(getSpecificUserWalletHistoryAPI({ userId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	const columns = useMemo<ColumnDef<WalletHistoryItem>[]>(
		() => [
			{
				header: "TYPE",
				accessorKey: "type",
				cell: (info) => {
					const value = info.getValue<keyof typeof statusEnum>();

					return (
						<PillIndicator
							className="px-5 py-1 capitalize"
							type={value}
							title={value}
						/>
					);
				},
			},
			{
				header: "AMOUNT",
				accessorKey: "amount",
				cell: (info) => formatCurrency(Number(info.getValue())),
			},
			{
				header: "REFERENCE",
				accessorKey: "reference",
				cell: (info) => info.getValue(),
			},
			{
				header: "DATE",
				accessorKey: "createdAt",
				cell: (info) => {
					// Assuming info.getValue() returns a date string or a Date object
					const dateValue = info.getValue<Date | string>();

					// If dateValue is a string, convert it to a Date object
					const date =
						typeof dateValue === "string" ? new Date(dateValue) : dateValue;

					// Check if date is a valid Date object
					if (date instanceof Date && !isNaN(date.getTime())) {
						return dfn.format(date, "MMM d, yyyy hh:mm aa");
					} else {
						return "Invalid Date";
					}
				},
			},
		],
		[]
	);

	return (
		<DashboardLayout
			title={`User management ${
				!isFetchingUser
					? `- ${specificUser?.user.firstName} ${specificUser?.user.surname}`
					: ""
			}  `}
		>
			{isFetchingUser ? (
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
						<div className="flex items-center flex-wrap gap-2">
							<Button.Outline
								title="Fund User Wallet"
								onClick={() => dispatch(setShowFundUserModal(true))}
							/>
							<Button.Outline
								title="Edit User"
								onClick={() => dispatch(setShowEditUserModal(true))}
							/>
							{specificUser?.user?.isBlocked ? (
								<div className="flex items-center gap-2">
									<Button.Outline
										title="Unblock User"
										onClick={() => dispatch(setShowUnblockUserModal(true))}
									/>
									<Button.Outline
										title="Delete User"
										onClick={() => dispatch(setShowDeleteUserModal(true))}
									/>
								</div>
							) : (
								<Button.Outline
									title="Block User"
									onClick={() => dispatch(setShowBlockUserModal(true))}
								/>
							)}
						</div>
					</section>

					<section className="w-full p-8 flex items-center flex-wrap gap-10">
						<div className="">
							<p className="text-sm font-light">Name</p>
							<h3 className="font-semibold text-xl">
								{specificUser?.user?.firstName} {specificUser?.user?.surname}
							</h3>
						</div>
						<div className="">
							<p className="text-sm font-light">Email</p>
							<h3 className="font-semibold text-xl">
								{specificUser?.user?.email ?? "Not available"}
							</h3>
						</div>
						<div className="">
							<p className="text-sm font-light">Username</p>
							<h3 className="font-semibold text-xl">
								{specificUser?.user?.username ?? "Not available"}
							</h3>
						</div>
						<div className="">
							<p className="text-sm font-light">Phone Number</p>
							<h3 className="font-semibold text-xl">
								{specificUser?.user?.mobileNumber ?? "Not available"}
							</h3>
						</div>
						<div className="">
							<p className="text-sm font-light">Account Status</p>
							<h3 className="font-semibold text-xl">
								{specificUser?.user?.isBlocked ? "Blocked" : "Active"}
							</h3>
						</div>
						<div className="">
							<p className="text-sm font-light">Wallet Balance</p>
							<h3 className="font-semibold text-xl">
								₦{formatCurrency(Number(specificUser?.wallet?.balance ?? 0))}
							</h3>
						</div>
					</section>
					<hr />
					<section className="w-full p-8">
						<Table
							data={walletHistory}
							columns={columns}
							rows={10}
							loading={isFetchingUserWalletHistory}
							totalPages={1}
							current_page={page}
							empty_message="No transactions"
							empty_sub_message="User hasn't performed any transactions yet."
							setCurrentPage={(page: number): void => {
								setPage(page);
								throw new Error("Function not implemented.");
							}}
						/>
					</section>
					{showFundUserModal ? <FundUserModal /> : null}
					{showDeleteUserModal ? (
						<DeleteUserModal user={specificUser?.user} />
					) : null}
					{showBlockUserModal ? (
						<BlockUserModal user={specificUser?.user} />
					) : null}
					{showUnblockUserModal ? (
						<UnblockUserModal user={specificUser?.user} />
					) : null}
					{showEditUserModal ? (
						<EditUserModal user={specificUser?.user} />
					) : null}
				</>
			)}
		</DashboardLayout>
	);
};

export default SpecificUser;
