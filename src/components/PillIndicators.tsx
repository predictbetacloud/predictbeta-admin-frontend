import styled from "styled-components";
import { colors } from "../utils/colors";
import { statusEnum } from "../types/types";

const Style = styled.span<{ bg: string }>`
	background: ${(props) => props.bg ?? colors.grey200};
	color: ${colors.grey900};
`;

export default function PillIndicator({
	type,
	title,
	className,
	style = {},
	onClick,
}: {
	type: keyof typeof statusEnum;
	title: string;
	className: string;
	style?: object;
	onClick?: () => void;
}) {
	return (
		<div onClick={onClick}>
			<Style
				bg={statusEnum[type]?.bg}
				className={
					"px-2 py-1 inline-flex justify-center rounded-full " + className
				}
				style={style}
			>
				<p style={{ color: statusEnum[type]?.color }}>{title ?? "Title"}</p>
			</Style>
		</div>
	);
}
