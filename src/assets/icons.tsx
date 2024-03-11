interface Props {
	size?: string | number;
	color?: string;
	fill?: string;
	className?: string;
	onClick?: () => void;
}
export function InfoIcon({ size, color, className, onClick }: Props) {
	return (
		<svg
			width={size ?? "18"}
			height={size ?? "18"}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14.6693 8.00016C14.6693 11.6821 11.6845 14.6668 8.0026 14.6668C4.32071 14.6668 1.33594 11.6821 1.33594 8.00016C1.33594 4.31826 4.32071 1.3335 8.0026 1.3335C11.6845 1.3335 14.6693 4.31826 14.6693 8.00016ZM8.0026 6.5835C8.41682 6.5835 8.7526 6.91928 8.7526 7.3335V10.6668C8.7526 11.081 8.41682 11.4168 8.0026 11.4168C7.58839 11.4168 7.2526 11.081 7.2526 10.6668V7.3335C7.2526 6.91928 7.58839 6.5835 8.0026 6.5835ZM8.0026 6.00016C8.37079 6.00016 8.66927 5.70169 8.66927 5.3335C8.66927 4.96531 8.37079 4.66683 8.0026 4.66683C7.63441 4.66683 7.33594 4.96531 7.33594 5.3335C7.33594 5.70169 7.63441 6.00016 8.0026 6.00016Z"
				fill={color ?? "#0D7FE9"}
			/>
		</svg>
	);
}
