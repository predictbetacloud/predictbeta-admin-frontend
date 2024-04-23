import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import {
	IPaginatedUsers,
	IPaginatedWalletHistory,
	UserState,
	UserWithWallet,
} from "../../types/types";

const initialState: UserState = {
	users: null,
	specificUser: null,
	specificUserWalletHistory: null,
	isFundingUser: false,
	isCreatingUser: false,
	isDeletingUser: false,
	isEditingUser: false,
	isBlockingUser: false,
	isUnblockingUser: false,
	isFetchingAllUsers: false,
	isFetchingSpecificUser: false,
	isFetchingSpecificUserWalletHistory: false,
	showAddUserModal: false,
	showFundUserModal: false,
	showDeleteUserModal: false,
	showEditUserModal: false,
	showBlockUserModal: false,
	showUnblockUserModal: false,
};

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<IPaginatedUsers>) => {
			state.users = action.payload;
		},
		setSpecificUser: (state, action: PayloadAction<UserWithWallet>) => {
			state.specificUser = action.payload;
		},
		setSpecificUserWalletHistory: (
			state,
			action: PayloadAction<IPaginatedWalletHistory>
		) => {
			state.specificUserWalletHistory = action.payload;
		},
		setIsFetchingAllUsers: (
			state,
			action: PayloadAction<UserState["isFetchingAllUsers"]>
		) => {
			state.isFetchingAllUsers = action.payload;
		},
		setIsFetchingSpecificUser: (
			state,
			action: PayloadAction<UserState["isFetchingSpecificUser"]>
		) => {
			state.isFetchingSpecificUser = action.payload;
		},
		setIsFetchingSpecificUserWalletHistory: (
			state,
			action: PayloadAction<UserState["isFetchingSpecificUserWalletHistory"]>
		) => {
			state.isFetchingSpecificUserWalletHistory = action.payload;
		},
		setIsCreatingUser: (
			state,
			action: PayloadAction<UserState["isCreatingUser"]>
		) => {
			state.isCreatingUser = action.payload;
		},
		setIsDeletingUser: (
			state,
			action: PayloadAction<UserState["isDeletingUser"]>
		) => {
			state.isDeletingUser = action.payload;
		},
		setIsEditingUser: (
			state,
			action: PayloadAction<UserState["isEditingUser"]>
		) => {
			state.isEditingUser = action.payload;
		},
		setIsFundingUser: (
			state,
			action: PayloadAction<UserState["isFundingUser"]>
		) => {
			state.isFundingUser = action.payload;
		},
		setIsBlockingUser: (
			state,
			action: PayloadAction<UserState["isBlockingUser"]>
		) => {
			state.isBlockingUser = action.payload;
		},
		setIsUnblockingUser: (
			state,
			action: PayloadAction<UserState["isUnblockingUser"]>
		) => {
			state.isUnblockingUser = action.payload;
		},
		setShowAddUserModal: (
			state,
			action: PayloadAction<UserState["showAddUserModal"]>
		) => {
			state.showAddUserModal = action.payload;
		},
		setShowFundUserModal: (
			state,
			action: PayloadAction<UserState["showFundUserModal"]>
		) => {
			state.showFundUserModal = action.payload;
		},
		setShowDeleteUserModal: (
			state,
			action: PayloadAction<UserState["showDeleteUserModal"]>
		) => {
			state.showDeleteUserModal = action.payload;
		},
		setShowEditUserModal: (
			state,
			action: PayloadAction<UserState["showEditUserModal"]>
		) => {
			state.showEditUserModal = action.payload;
		},
		setShowBlockUserModal: (
			state,
			action: PayloadAction<UserState["showBlockUserModal"]>
		) => {
			state.showBlockUserModal = action.payload;
		},
		setShowUnblockUserModal: (
			state,
			action: PayloadAction<UserState["showUnblockUserModal"]>
		) => {
			state.showUnblockUserModal = action.payload;
		},
	},
});

export const {
	setIsUnblockingUser,
	setIsBlockingUser,
	setIsCreatingUser,
	setIsDeletingUser,
	setIsEditingUser,
	setIsFetchingAllUsers,
	setIsFetchingSpecificUser,
	setIsFetchingSpecificUserWalletHistory,
	setIsFundingUser,
	setShowUnblockUserModal,
	setShowBlockUserModal,
	setShowDeleteUserModal,
	setShowEditUserModal,
	setShowFundUserModal,
	setShowAddUserModal,
	setSpecificUserWalletHistory,
	setSpecificUser,
	setUsers,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllUsers = (state: RootState) => state.users.users;

export const selectSpecificUser = (state: RootState) =>
	state.users.specificUser;

export const selectSpecificUserWalletHistory = (state: RootState) =>
	state.users.specificUserWalletHistory;

export const selectIsFetchingAllUsers = (state: RootState) =>
	state.users.isFetchingAllUsers;

export const selectIsFetchingSpecificUser = (state: RootState) =>
	state.users.isFetchingSpecificUser;

export const selectIsFetchingSpecificUserWalletHistory = (state: RootState) =>
	state.users.isFetchingSpecificUserWalletHistory;

export const selectIsCreatingUser = (state: RootState) =>
	state.users.isCreatingUser;

export const selectIsFundingUser = (state: RootState) =>
	state.users.isFundingUser;

export const selectIsEditingUser = (state: RootState) =>
	state.users.isEditingUser;

export const selectIsDeletingUser = (state: RootState) =>
	state.users.isDeletingUser;

export const selectIsBlockingUser = (state: RootState) =>
	state.users.isBlockingUser;

export const selectIsUnblockingUser = (state: RootState) =>
	state.users.isUnblockingUser;

export const selectShowDeleteUserModal = (state: RootState) =>
	state.users.showDeleteUserModal;

export const selectShowFundUserModal = (state: RootState) =>
	state.users.showFundUserModal;

export const selectShowAddUserModal = (state: RootState) =>
	state.users.showAddUserModal;

export const selectShowEditUserModal = (state: RootState) =>
	state.users.showEditUserModal;

export const selectShowBlockUserModal = (state: RootState) =>
	state.users.showBlockUserModal;

export const selectShowUnblockUserModal = (state: RootState) =>
	state.users.showUnblockUserModal;
