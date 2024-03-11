import styled from "styled-components";
import { colors } from "../../utils/colors";

const Style = styled.button<{ isSelected: boolean }>`
	border: 1px solid;
	border-color: ${(props) =>
		props.isSelected ? colors.accent : colors.grey200};
	border-radius: 8px;

	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

export const AmountOption = ({
	currency = "NGN",
	value,
	isSelected,
	onClick = () => {},
}: {
	currency: string;
	value: number;
	isSelected: boolean;
	onClick: () => void;
}) => {
	return (
		<Style
			isSelected={isSelected}
			onClick={onClick}
			type="button"
			className="py-2 px-3 cursor-pointer"
		>
			<p className="whitespace-pre text-[#2A2E33] text-xs">
				{currency} {Number(value).toLocaleString()}
			</p>
		</Style>
	);
};
