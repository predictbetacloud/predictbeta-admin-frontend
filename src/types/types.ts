import { CSSProperties } from "react";

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

export interface UserType {
	id: string;
	email: string;
	fullName: string;
	verifiedOn: string | Date | number;
	username: string;
}
export interface AuthType {
	user?: Partial<UserType> | null;
	token?: string | null;
	refresh_token?: string | null;
	retryCount?: number | string | null;
	logout_retryCount?: number | string | null;
	isPerformingAuthAction?: boolean;
}

export interface TeamState {
	clubTeams: IClub[];
	searchQuery: string;
	specificTeam: IClub | null;
	specificTeamPlayers: IPlayer[];
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
