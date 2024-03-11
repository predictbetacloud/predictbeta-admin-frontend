import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
	setUsers,
	setIsCreatingUser,
	setIsFetchingAllUsers,
	setIsFetchingSpecificUser,
	setSpecificUser,
	setShowDeleteUserModal,
	setIsDeletingUser,
	setIsFundingUser,
	setShowFundUserModal,
	setIsEditingUser,
	setIsBlockingUser,
	setShowBlockUserModal,
	setIsUnblockingUser,
	setShowUnblockUserModal,
	setIsFetchingSpecificUserWalletHistory,
	setSpecificUserWalletHistory,
	setShowEditUserModal,
	setShowAddUserModal,
} from "../state/slices/users";
import { globalRouter } from "../utils/utils";

export const createUserAPI = createAsyncThunk(
	"users/create",
	(
		{ password, email, mobileNumber, firstName, surname }: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsCreatingUser(true));

		axiosInstance
			.post(`/users`, { password, email, mobileNumber, firstName, surname })
			.then((data) => {
				dispatch(setIsCreatingUser(false));
				dispatch(getAllUsersAPI({}));
				dispatch(setShowAddUserModal(false));
				toastSuccess(data?.data?.message ?? "User added successfully");
				// if (globalRouter.navigate) {
				// 	globalRouter.navigate("/dashboard/users");
				// }
			})
			.catch((error) => {
				dispatch(setIsCreatingUser(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const updateUserAPI = createAsyncThunk(
	"users/edit",
	(
		{ email, mobileNumber, firstName, surname, username, userId }: FieldValues,
		{ dispatch }
	) => {
		dispatch(setIsEditingUser(true));

		axiosInstance
			.put(`/users/${userId}`, {
				email,
				mobileNumber,
				firstName,
				surname,
				username,
			})
			.then((data) => {
				dispatch(setIsEditingUser(false));
				dispatch(getSpecificUserAPI({ userId }));
				dispatch(setShowEditUserModal(false));
				toastSuccess(data?.data?.message ?? "User updated successfully");
			})
			.catch((error) => {
				dispatch(setIsEditingUser(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const getAllUsersAPI = createAsyncThunk(
	"users/getAllUsers",
	({ params }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingAllUsers(true));
		axiosInstance
			.get(`/users`, { params })
			.then((data) => {
				dispatch(setUsers(data.data));
				dispatch(setIsFetchingAllUsers(false));
			})
			.catch((error) => {
				dispatch(setIsFetchingAllUsers(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificUserAPI = createAsyncThunk(
	"users/getSpecific",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificUser(true));
		axiosInstance
			.get(`/users/${userId}`)
			.then((data) => {
				dispatch(setSpecificUser(data.data?.data));
				dispatch(setIsFetchingSpecificUser(false));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificUser(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const getSpecificUserWalletHistoryAPI = createAsyncThunk(
	"users/getSpecificUserWalletHistory",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsFetchingSpecificUserWalletHistory(true));
		axiosInstance
			.get(`/users/${userId}/wallet-history`)
			.then((data) => {
				dispatch(setSpecificUserWalletHistory(data.data?.data));
				dispatch(setIsFetchingSpecificUserWalletHistory(false));
			})
			.catch((error) => {
				dispatch(setIsFetchingSpecificUserWalletHistory(false));
				toastError(error?.response?.data?.message);
			});
	}
);

export const deletetUserAPI = createAsyncThunk(
	"users/deleteUser",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsDeletingUser(true));

		axiosInstance
			.delete(`/users/${userId}`)
			.then((data) => {
				dispatch(setIsDeletingUser(false));
				dispatch(setShowDeleteUserModal(false));
				if (globalRouter.navigate) {
					globalRouter.navigate("/dashboard/users");
				}
				toastSuccess(data?.data?.message ?? "User deleted successfully");
			})
			.catch((error) => {
				dispatch(setIsDeletingUser(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const fundUserAPI = createAsyncThunk(
	"users/fund",
	({ userId, amount }: FieldValues, { dispatch }) => {
		dispatch(setIsFundingUser(true));

		axiosInstance
			.post(`/users/${userId}/fund-wallet-admin`, { amount })
			.then((data) => {
				dispatch(setIsFundingUser(false));
				dispatch(setShowFundUserModal(false));
				dispatch(getSpecificUserAPI({ userId }));
				toastSuccess(data?.data?.message ?? "User funded successfully");
			})
			.catch((error) => {
				dispatch(setIsFundingUser(false));
				dispatch(setShowFundUserModal(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const blockUserAPI = createAsyncThunk(
	"users/block",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsBlockingUser(true));

		axiosInstance
			.post(`/users/${userId}/block`)
			.then((data) => {
				dispatch(setIsBlockingUser(false));
				dispatch(setShowBlockUserModal(false));
				dispatch(getSpecificUserAPI({ userId }));
				toastSuccess(data?.data?.message ?? "User blocked");
			})
			.catch((error) => {
				dispatch(setIsBlockingUser(false));
				dispatch(setShowBlockUserModal(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);

export const unblockUserAPI = createAsyncThunk(
	"users/unblock",
	({ userId }: FieldValues, { dispatch }) => {
		dispatch(setIsUnblockingUser(true));

		axiosInstance
			.post(`/users/${userId}/unblock`)
			.then((data) => {
				dispatch(setIsUnblockingUser(false));
				dispatch(setShowUnblockUserModal(false));
				dispatch(getSpecificUserAPI({ userId }));
				toastSuccess(data?.data?.message ?? "User unblocked");
			})
			.catch((error) => {
				dispatch(setIsUnblockingUser(false));
				dispatch(setShowUnblockUserModal(false));
				toastError(error?.response?.data?.message);
				console.error(error);
			});
	}
);
