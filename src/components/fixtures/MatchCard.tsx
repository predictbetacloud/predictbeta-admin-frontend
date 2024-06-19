/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { IoIosLock } from "react-icons/io";
import * as dfn from "date-fns";

import { P } from "../Texts";
import { IClub } from "../../types/types";
import { colors } from "../../utils/colors";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import Button from "../Buttons";

const Style = styled.div<{ $invalid: "true" | "false" }>`
	border: 1px solid;
	border-color: ${(props) =>
		props.$invalid === "true" ? "#EB1536" : "#e1e7ec"};
`;

interface PredictionStyle {
	$isSelected: "true" | "false";
	$isCorrect: "true" | "false";
}

const PredictionStyle = styled.div<PredictionStyle>`
	background: ${(props) =>
		props.$isCorrect === "true"
			? colors.green700
			: props.$isSelected === "true"
			? "#EB1536"
			: "#051B30"};
	padding: 8px 14px;
`;

const Prediction = ({
	value,
	title,
	onClick,
	selectedPrediction,
	className = "",
	style,
	locked,
	inactive,
	result,
}: {
	className?: string;
	onClick: (value: any) => void;
	selectedPrediction: any;
	style: object;
	title?: string;
	locked: boolean;
	inactive: boolean;
	value: any;
	result: "" | "HOME" | "DRAW" | "AWAY" | undefined;
}) => (
	<PredictionStyle
		className={`flex items-center justify-center  ${
			inactive ? "" : "cursor-pointer"
		} ${className ? className : ""}`}
		style={style}
		onClick={inactive ? () => {} : () => onClick(value)}
		$isCorrect={result === value ? "true" : "false"}
		$isSelected={selectedPrediction === value ? "true" : "false"}
	>
		{locked ? (
			<IoIosLock color="white" width="14px" className="cursor-not-allowed" />
		) : (
			<P className="text-white">{title ?? value}</P>
		)}
	</PredictionStyle>
);

const Team = ({ team }: { team: IClub }) => (
	<div className="flex items-center">
		<img
			src={team?.clubLogo || team?.flag}
			className="h-6 w-6 mr-3"
			alt={team?.name}
		/>
		<P className="text-[#000301] text-[0.8em]">{team?.name}</P>
	</div>
);

export const MatchCard = ({
	id,
	home,
	away,
	onChange,
	prediction,
	matchTime,
	inactive = false,
	locked = false,
	invalid = false,
	adminSet,
	toggleUpdateModal,
	toggleDeleteModal,
	result,
}: {
	away: any;
	home: any;
	id: number;
	matchTime: string;
	onChange?: (id: number, value: any) => void;
	locked?: boolean;
	inactive?: boolean;
	invalid?: boolean;

	isScoreSet?: boolean;
	result?: "" | "AWAY" | "DRAW" | "HOME";
	prediction?: "" | "HOME" | "DRAW" | "AWAY";
	score?: "" | "AWAY" | "DRAW" | "HOME";
	adminSet?: boolean;
	toggleUpdateModal?: () => void;
	toggleDeleteModal?: () => void;
}) => {
	const captureSelection = (value: any) => {
		onChange ? onChange(id, value) : null;
	};

	return (
		<Style className="p-4 rounded-md" $invalid={invalid ? "true" : "false"}>
			<div className="md:flex items-center justify-between">
				<div className="md:space-y-2 flex md:block items-center justify-between mb-4 md:mb-0">
					<Team team={home} />
					<Team team={away} />
				</div>
				<div>
					<div className="grid grid-cols-3 w-fit ml-auto">
						<Prediction
							value={"HOME"}
							onClick={captureSelection}
							inactive={inactive}
							locked={locked}
							title="H"
							selectedPrediction={prediction}
							result={result}
							style={{
								borderRadius: "5px 0px 0px 5px",
							}}
						/>
						<Prediction
							// title="1"
							value={"DRAW"}
							onClick={captureSelection}
							inactive={inactive}
							locked={locked}
							title="X"
							selectedPrediction={prediction}
							result={result}
							style={{
								borderRight: `1px solid ${colors.grey500}`,
								borderLeft: `1px solid ${colors.grey500}`,
							}}
						/>
						<Prediction
							value={"AWAY"}
							title="A"
							inactive={inactive}
							locked={locked}
							onClick={captureSelection}
							selectedPrediction={prediction}
							result={result}
							style={{
								borderRadius: "0px 5px 5px 0px",
							}}
						/>
					</div>
				</div>
			</div>
			{adminSet && (
				<>
					<hr className="my-4" />
					<div className="md:flex items-center justify-between gap-4">
						<p className="text-[#8C97A7] text-sm">
							{matchTime
								? dfn.format(dfn.subHours(matchTime, 1), "eee dd MMM, HH:mm ")
								: ""}
						</p>
						<div className="flex items-center justify-between gap-4">
							<Button.Outline
								content={
									<div className="flex items-center space-x-2">
										<RiEdit2Line size={18} color={colors.grey700} />
										<p className="text-sm font-normal text-[#2A2E33]">Edit</p>
									</div>
								}
								className="cursor-pointer flex items-center"
								title=""
								onClick={toggleUpdateModal}
							/>
							<Button.Outline
								content={
									<div className="flex items-center space-x-2">
										<RiDeleteBin5Line size={18} color={colors.grey700} />
										<p className="text-sm font-normal text-[#2A2E33]">Delete</p>
									</div>
								}
								className="cursor-pointer flex items-center"
								title=""
								onClick={toggleDeleteModal}
							/>
						</div>
					</div>
				</>
			)}
		</Style>
	);
};
