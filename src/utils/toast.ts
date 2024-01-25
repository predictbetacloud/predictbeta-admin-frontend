import { toast } from "react-toastify";

export const toastError = (errorMessage: string) => {
	if (errorMessage?.includes("Unauthorized")) {
		return;
	} else {
		return toast.error(errorMessage, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
};

export const toastSuccess = (message: string) => {
	return toast.success(message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};

export const toastWarning = (message: string) => {
	return toast.warning(message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};
