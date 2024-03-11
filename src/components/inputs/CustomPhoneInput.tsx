import PhoneInput from "react-phone-number-input";

import styled from "styled-components";

const CustomPhoneInput = styled(PhoneInput)`
	border: 1px solid #dbdfe6;
	border-radius: 4px;
	// padding: 10px 16px;
	color: var(--primary-black);
	background: #f5f6f8;
	font-size: 14px;

	.PhoneInputCountry {
		padding: 14px 14px;
		gap: 8px;
	}

	.PhoneInputInput {
		background: transparent;
		padding: 10px 0px;
	}

	&:focus,
	&:focus-visible,
	&_no-border:focus,
	&_no-border:focus-visible,
	&:focus-visible,
	&:focus-within {
		outline-color: var(--predictbeta-blue);
	}

	&::placeholder {
		color: var(--neutral-ash);
	}

	&.invalid {
		border-color: var(--alert-red);
		// background: #d52a2a40;

		&::placeholder {
			// color: var(--alert-red);
		}
	}
`;

export default CustomPhoneInput;
