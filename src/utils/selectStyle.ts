/* eslint-disable @typescript-eslint/no-explicit-any */

export const defaultStyle = {
	control: (baseStyles: any, state: { isFocused: any }) => ({
		...baseStyles,
		background: "#F5F6F8",
		border: state.isFocused ? "1px solid #DBDFE6" : "1px solid #DBDFE6",
		borderRadius: "4px",
		padding: "0 5px",
		minHeight: "43px",
		"&:hover": {
			borderColor: "#DBDFE6",
			cursor: "pointer",
		},
		"&:focused": {
			borderColor: "#DBDFE6",
			cursor: "pointer",
			boxShadow: "0 0 0 1px #051b30",
		},
	}),
	input: (baseStyles: any) => ({
		...baseStyles,
		color: "#121212",
		padding: 0,
		fontFamily: "Rubik",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "22px",
	}),
	menuContainer: (baseStyles: any) => ({
		...baseStyles,
		zIndex: 20
	}),
	option: (baseStyles: any, state: { isFocused: any; isSelected: any }) => ({
		...baseStyles,
		fontFamily: "Rubik",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "22px",
		color: state.isSelected ? "#FFFFFF" : "#121212",
	}),
	valueContainer: (baseStyles: any) => ({
		...baseStyles,
		color: "#121212",
		fontFamily: "Rubik",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "22px",
	}),
	placeholder: (baseStyles: any) => ({
		...baseStyles,
		color: "#8c97a7",
		padding: 0,
		fontFamily: "Rubik",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "22px",
	}),
};

export const invalidStyle = {
	control: (baseStyles: any, state: { isFocused: any }) => ({
		...baseStyles,
		background: "#d52a2a40",
		border: state.isFocused ? "1px solid #D52A2A" : "1px solid #D52A2A",
		borderRadius: "4px",
		padding: "0 5px",
		minHeight: "43px",
		color: "#eb1536",
	}),
	placeholder: (baseStyles: any) => ({
		...baseStyles,
		color: "#eb1536",
		padding: 0,
		fontFamily: "Rubik",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "22px",
	}),
};
