import { CSSProperties } from "react";
import { colors } from "../utils/colors";

// Buttons
export type ButtonAction = "button" | "submit" | "reset" | undefined;

export interface ButtonType {
	title?: string;
	type?: ButtonAction;
	style?: CSSProperties | undefined;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	content?: React.ReactElement;
	onClick?: () => void;
}

export interface IPlayer {
	name: string;
	number: number;
	createdAt: string;
	id: number;
}

export interface IClub {
	name: string;
	clubLogo: string;
	createdAt: string;
	id: number;
	region: null;
	shortName: string;
	players: [] | undefined;
}

export interface ICreateClub {
	name: "string";
	shortName: "string";
	region: "string";
	clubLogo: "string";
}

// Auth Types

export interface AdminType {
	id: string;
	email: string;
	fullName: string;
	verifiedOn: string | Date | number;
	username: string;
}
export interface AuthType {
	user?: Partial<AdminType> | null;
	token?: string | null;
	refresh_token?: string | null;
	retryCount?: number | string | null;
	logout_retryCount?: number | string | null;
	isPerformingAuthAction?: boolean;
}

export interface IPaginatedClubTeams {
	items: IClub[];
	meta: {
		totalItems: number;
		itemCount: number;
		itemsPerPage: number;
		totalPages: number;
		currentPage: number;
	};
}

export interface TeamState {
	clubTeams: IPaginatedClubTeams | null;
	searchQuery: string;
	specificTeam: IClub | null;
	specificTeamPlayers: IPlayer[];
	allPlayers: IPlayer[];
	isFetchingAllPlayers: boolean;
	noMoreTeams: boolean;
	isFetchingTeams: boolean;
	isFetchingSpecificTeam: boolean;
	isFetchingSpecificTeamPlayers: boolean;
	isCreatingTeam: boolean;
	isDeletingTeam: boolean;
	isUpdatingTeam: boolean;
	isCreatingPlayer: boolean;
	isUpdatingPlayer: boolean;
	isDeletingPlayer: boolean;
	showAddPlayerModal: boolean;
	showEditPlayerModal: boolean;
	showDeletePlayerModal: boolean;
}

export interface ISeason {
	id: number;
	name: string;
	createdAt: string;
}

export interface IWeek {
	id: number;
	number: number;
	createdAt: string;
}
export interface IMatch {
	prediction: "" | "HOME" | "DRAW" | "AWAY" | undefined;
	awayTeam: IClub;
	homeTeam: IClub;
	id: number;
	number: number;
	createdAt: string;
	fixtureDateTime: string;
	week: IWeek;
}

export const predictionEnum = {
	AWAY: "AWAY",
	HOME: "HOME",
	DRAW: "DRAW",
};

export type Result = {
	id: number;
	result: "HOME" | "AWAY" | "DRAW";
};

export interface FixtureState {
	seasons: ISeason[];
	specificSeason: ISeason | null;
	weeks: IWeek[];
	dropDownWeeks: IWeek[];
	matches: IMatch[];
	isCreatingSeason: boolean;
	isCreatingWeek: boolean;
	isCreatingMatch: boolean;
	specificWeek: IWeek | null;
	isFetchingSeasons: boolean;
	isFetchingSpecificSeason: boolean;
	isFetchingWeeks: boolean;
	isFetchingSpecificWeek: boolean;
	isPublishingWeek: boolean;
	isSubmittingWeekResult: boolean;
	isFetchingMatches: boolean;
	isEditingMatch: boolean;
	isDeletingMatch: boolean;
	showCreateSeasonModal: boolean;
	showCreateWeekModal: boolean;
	showCreateMatchModal: boolean;
	showEditMatchModal: boolean;
	showDeleteMatchModal: boolean;
	showPublishWeekModal: boolean;
}

export interface WalletType {
	userId: number;
	currency: string;
	id: number;
	balance: number;
}
export interface IUser {
	userId: string;
	username: string;
	firstName: string;
	middleName: string;
	surname: string;
	email: string;
	profilePicUrl: string;
	mobileNumber: string;
	isBlocked: boolean;
}

export interface WalletHistoryItem {
	amount: number;
	balanceAfter: number;
	balanceBefore: number;
	createdAt: string;
	currency: string;
	deletedAt: string | null;
	id: number;
	reference: string;
	type: "credit" | "debit";
}

export interface UserWithWallet {
	user: IUser;
	wallet: WalletType;
}

export interface IPaginatedUsers {
	items: IUser[];
	meta: {
		totalItems: number;
		itemCount: number;
		itemsPerPage: number;
		totalPages: number;
		currentPage: number;
	};
}

export interface IPaginatedWalletHistory {
	items: WalletHistoryItem[];
	meta: {
		totalItems: number;
		itemCount: number;
		itemsPerPage: number;
		totalPages: number;
		currentPage: number;
	};
}

export interface UserState {
	users: IPaginatedUsers | null;
	specificUser: UserWithWallet | null;
	specificUserWalletHistory: IPaginatedWalletHistory | null;
	isCreatingUser: boolean;
	isFundingUser: boolean;
	isFetchingAllUsers: boolean;
	isFetchingSpecificUser: boolean;
	isFetchingSpecificUserWalletHistory: boolean;
	isEditingUser: boolean;
	isDeletingUser: boolean;
	isBlockingUser: boolean;
	isUnblockingUser: boolean;
	showAddUserModal: boolean;
	showFundUserModal: boolean;
	showBlockUserModal: boolean;
	showUnblockUserModal: boolean;
	showDeleteUserModal: boolean;
	showEditUserModal: boolean;
}

export interface LeaderboardItem {
	position: number;
	username: string;
	location: string | null;
	points: number;
}
export interface LeaderboardState {
	leaderboard: LeaderboardItem[];
	isFetchingWeekLeaderboard: boolean;
	isFetchingSeasonLeaderboard: boolean;
}

export interface PrivateLeagueItem {
	name: string;
	leagueCode: string;
	id?: number;
	scoringStarts: number;
	entranceFee: number;
	numberOfPlayers: number;
	winningPositions: number;
	sharingFormula: {
		position: number;
		percentage: number;
	}[];
}
export interface PrivateLeagueState {
	allPrivateLeagues: PrivateLeagueItem[];
	specificPrivateLeague: PrivateLeagueItem | null;
	specificPrivateLeagueLeaderboard: LeaderboardItem[];
	isFetchingAllPrivateLeagues: boolean;
	isFetchingSpecificPrivateLeague: boolean;
	isFetchingSpecificPrivateLeagueWeekLeaderboard: boolean;
	isFetchingSpecificPrivateLeagueSeasonLeaderboard: boolean;
	isJoiningPrivateLeague: boolean;
	isCreatingPrivateLeague: boolean;
	isEditingPrivateLeague: boolean;
	isDeletingPrivateLeague: boolean;
	isLeavingPrivateLeague: boolean;
	showSharePrivateLeagueModal: boolean;
	showLeavePrivateLeagueModal: boolean;
	showDeletePrivateLeagueModal: boolean;
}

export type SharingFormularType = {
	position: number;
	percentage: number;
}[];

export const statusEnum = {
	success: {
		bg: colors.green200,
		color: colors.green700,
	},
	pending: {
		bg: colors.orange200,
		color: colors.orange700,
	},
	warning: {
		bg: colors.orange200,
		color: colors.orange700,
	},
	error: {
		bg: colors.red200,
		color: colors.red700,
	},
	failed: {
		bg: colors.red200,
		color: colors.red700,
	},
	credit: {
		bg: colors.green200,
		color: colors.green700,
	},
	debit: {
		bg: colors.orange200,
		color: colors.orange700,
	},
};
