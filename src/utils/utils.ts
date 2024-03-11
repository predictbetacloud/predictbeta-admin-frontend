import { NavigateFunction, Location } from "react-router-dom";

export const globalRouter = { navigate: null } as {
	navigate: null | NavigateFunction;
	location: null | Location;
};

/**
 * Converts a file to a base64 encoded string.
 *
 * @param {File} file - The file to be converted.
 * @returns {Promise<string>} A promise that resolves with the base64 encoded string of the file.
 *
 * @example
 * // Assume 'file' is a valid File object from an input form
 * convertToBase64(file)
 *   .then(base64String => console.log(base64String))
 *   .catch(error => console.error(error));
 */

export function convertToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}

// Function to format the date into YYYY-MM-DDTHH:MM format
export function formatDateToDateTimeLocal(utcString: string): string {
	const date: Date = new Date(utcString);

	// Padding function to ensure two digits
	function pad(number: number): string {
		return (number < 10 ? "0" : "") + number.toString();
	}

	// Format year, month, day, hours, and minutes
	const year: string = date.getFullYear().toString();
	const month: string = pad(date.getMonth() + 1); // getMonth() returns 0-11
	const day: string = pad(date.getDate());
	const hours: string = pad(date.getHours());
	const minutes: string = pad(date.getMinutes());

	// Combine into the final string
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Format currency
export const formatCurrency = (number: number) => {
	return Number(number).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
