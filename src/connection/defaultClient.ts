import axios, { AxiosResponse } from "axios";
import { store } from "../state/store";
import { updateLogoutRetryCount, updateRetryCount } from "../state/slices/auth";
import { AxiosError } from "axios";
import { logOutAPI } from "../api/authAPI";
import { toastError } from "../utils/toast";
import { globalRouter } from "../utils/utils";

// Get user details
const userDetails = () => {
	const authState = store.getState().auth;
	return authState;
};

// Handle success response
const successResponseHandler = (response: AxiosResponse) => {
	const dispatch = store.dispatch;

	const { logout_retryCount, retryCount: _retryCount } = userDetails();

	const maxCount = 4;

	let retryCount = 0;
	if (response?.config?.url === "/auth/refresh") {
		retryCount = Number(_retryCount) ?? 0;
		dispatch(updateRetryCount((retryCount + 1).toString()));
	} else if (response?.config?.url === "/auth/logout") {
		retryCount = Number(logout_retryCount) ?? 0;
		dispatch(updateLogoutRetryCount((retryCount + 1).toString()));
	}

	const retry = retryCount < maxCount ? true : false;

	// No content response (204)
	if (response.status === 204) {
		response.data = { data: {} };
	}

	// Log response
	if (import.meta.env.VITE_REACT_APP_APP_ENV === "development") {
		console.log(response.data);
	}

	// Additional checks for API that does not utilize the HTTP status code properly
	if (response.data.status === false || response.data.status === "failed") {
		if (response.data.error && response.data.error.code === 401) {
			if (retry) {
				// dispatch(logOutAPI());
				return Promise.reject(response.data.error);
			}
		}

		// Error message is retrieved from the JSON body.
		const error = new Error(response.data.message);

		// Attach the response axiosInstance, in case you decide to access it.
		error.message = response.data.message;

		throw error;
	}

	// Return processed response
	return response;
};

// Handle failure response
const failureResponseHandler = async (error: AxiosError) => {
	// Store
	const dispatch = store.dispatch;

	const { logout_retryCount, retryCount: _retryCount } = userDetails();

	let retryCount = 0;
	if (error?.config?.url === "/auth/refresh") {
		retryCount = Number(_retryCount) ?? 0;
		dispatch(updateRetryCount((retryCount + 1).toString()));
	} else if (error?.config?.url === "/auth/logout") {
		retryCount = Number(logout_retryCount) ?? 0;
		dispatch(updateLogoutRetryCount((retryCount + 1).toString()));
	}

	// Log error response
	if (import.meta.env.VITE_REACT_APP_APP_ENV === "development") {
		console.log(error);
	}

	// Request Timeout
	if (error.message.includes("Network")) {
		// alert(`Could not connect to network`);
		toastError("Please check your internet connection and try again.");
		return Promise.reject(error);
	}

	// Request Timeout
	if (error.message.includes("timeout")) {
		// alert(`Could not connect to network`);
		toastError("Request took too long. Please try again.");
		return Promise.reject(error);
	}

	// No network response (ECONNABORTED)
	if (!error.response || error.code === "ECONNABORTED") {
		// alert(`Could not connect to network`);
		return Promise.reject(error);
	}

	// No authorization response (401)
	if (error.response && error.response.status === 401) {
		toastError("You need to be authenticated to continue");
		if (
			error &&
			error.config &&
			error.config.url &&
			error.config.url.includes("/logout")
		) {
			dispatch(logOutAPI());
		} else {
			if (globalRouter.navigate) {
				if (window.location.pathname !== "/") {
					globalRouter.navigate("/", {
						state: { from: window.location.pathname },
					});
				} else {
					globalRouter.navigate("/");
				}
			}
		}

		dispatch(updateRetryCount((0).toString()));
		dispatch(updateLogoutRetryCount((0).toString()));
		return Promise.reject(error);
	}

	// Return unprocessed error
	return Promise.reject(error);
};

// Create an axios axiosInstance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
	timeout: import.meta.env.VITE_REACT_APP_REQUEST_TIMEOUT,
	headers: {},
});

// Add a request interceptor
axiosInstance.interceptors.request.use((req) => {
	const { token } = userDetails();

	if (!req.headers?.Authorization && token) {
		req.headers.Authorization = `Bearer ${token}`;
	}

	// Reattach the base url
	if (!req.baseURL) {
		req.url = import.meta.env.VITE_REACT_APP_API_URL + "" + req.url;
	}

	// Log requests
	if (import.meta.env.VITE_REACT_APP_APP_ENV === "development") {
		console.log(req);
	}

	return req;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		return successResponseHandler(response);
	},
	(error) => {
		return failureResponseHandler(error);
	}
);

export default axiosInstance;
