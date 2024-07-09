import styled from "styled-components";

import { P } from "../Texts";
import { IMatch } from "../../types/types";
import { GreenTick, RedClose } from "../../assets/icons";

const Style = styled.div`
	border: 0.5px solid #e1e7ec;
`;

const SelectionCard = ({ match, type }: { match: IMatch; type?: string }) => {
	return (
		<Style className="px-4 py-2 flex items-center justify-between">
			<div className="w-full">
				<div className="flex items-center">
					<div className="rounded-sm bg-gray-200 h-6 w-6 flex items-center justify-center mr-4">
						<p className="text-[#5F6B7A]">H</p>
					</div>
					<img
						src={match?.homeTeam?.clubLogo}
						className="h-6 w-6 mr-3"
						alt={match?.homeTeam?.name}
					/>
					<p className="text-[#160B0F] text-sm">{match?.homeTeam?.name}</p>
				</div>
				<div className="flex items-cente mt-2">
					<div className="rounded-sm bg-gray-200 h-6 w-6 flex items-center justify-center mr-4">
						<p className="text-[#5F6B7A]">A</p>
					</div>
					<img
						src={match?.awayTeam?.clubLogo}
						className="h-6 w-6 mr-3"
						alt={match?.awayTeam?.name}
					/>
					<p className="text-[#160B0F] text-sm">{match?.awayTeam?.name}</p>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<P className="text-center text-[#8895A7] text-xs font-light">
					{type ? type : null}
					<>{match.prediction}</>
				</P>
				{match?.outcome && (
					<>{match.outcome === "win" ? <GreenTick /> : <RedClose />}</>
				)}
			</div>
		</Style>
	);
};

export default SelectionCard;
