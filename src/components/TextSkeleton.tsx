import styled from "styled-components";

/**
 * Render a placeholder loading skeleton for texts
 * @param {string} width
 * @param {string} className
 * @returns {node}
 */

type Props = { width?: string };

const TextSkeletonStyle = styled.div<Props>`
	width: ${(props) => props.width || "100%"};
`;

export const TextSkeleton = ({
	className = "",
	width,
}: {
	width?: string;
	className?: string;
}) => {
	return (
		<TextSkeletonStyle
			width={width}
			className={
				"glade-subtitle-two glade-black w-3/5 bg-gray-300 animate-pulse transform rounded-md h-6 " +
				className
			}
		/>
	);
};
