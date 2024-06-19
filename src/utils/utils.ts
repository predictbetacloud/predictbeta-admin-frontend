import { NavigateFunction, Location } from "react-router-dom";
import {
	IClub,
	IPlayer,
	IWeekResult,
	Result,
	SharingFormularType,
} from "../types/types";
import { toastSuccess } from "./toast";

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
	// Remove one hour because of UTC
	const hours: string = pad(date.getHours() - 1);
	const minutes: string = pad(date.getMinutes());

	// Combine into the final string
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatUTCDateToDateString(utcString: string): string {
	const date: Date = new Date(utcString);

	// Padding function to ensure two digits
	function pad(number: number): string {
		return (number < 10 ? "0" : "") + number.toString();
	}

	// Format year, month, day, hours, and minutes
	const year: string = date.getFullYear().toString();
	const month: string = pad(date.getMonth() + 1); // getMonth() returns 0-11
	const day: string = pad(date.getDate());

	// Combine into the final string
	return `${year}-${month}-${day}`;
}

export function formatUTCDateToTimeString(utcString: string): string {
	const date: Date = new Date(utcString);

	// Padding function to ensure two digits
	function pad(number: number): string {
		return (number < 10 ? "0" : "") + number.toString();
	}

	// Format year, month, day, hours, and minutes
	const hours: string = pad(date.getHours() - 1);
	const minutes: string = pad(date.getMinutes());

	// Combine into the final string
	return `${hours}:${minutes}`;
}

// Format currency
export const formatCurrency = (number: number) => {
	return Number(number).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

// Format Predictions
export function formatPredictionsFromObjectToArray(results: {
	[key: number]: "HOME" | "AWAY" | "DRAW";
}): Result[] {
	return Object.entries(results).map(([key, value]) => ({
		id: parseInt(key),
		result: value,
	}));
}

// Format Scorers
export function formatScorersFromObjectToArray(
	scorers: {
		id: number;
		createdAt: string;
		deletedAt: string | null;
		name: string;
		number: number;
		team: IClub;
	}[]
): {
	playerId: number;
}[] {
	return scorers.map((scorer) => ({
		playerId: scorer.id,
	}));
}

// Format Scorers
export function reverseFormatScorersFromObjectToArray(
	scorers: IWeekResult["scorers"]
): IPlayer[] {
	const list = [];

	if (Array.isArray(scorers) && scorers.length > 0) {
		for (const scorer of scorers) {
			list.push(scorer.player);
		}
	}
	return list;
}

// create positions array
export const createPositionsArray = (count: number) => {
	const array = [];

	for (let index = 0; index < count; index++) {
		const position = index + 1;
		array.push(position);
	}
	return array;
};

// Change number to ordinal position
export function numberToOrdinal(n: number): string {
	// Determine the suffix for numbers ending in 11, 12, or 13, which don't follow the standard rules
	if (n % 100 >= 11 && n % 100 <= 13) {
		return n + "th";
	}
	// Determine the suffix based on the last digit of the number
	switch (n % 10) {
		case 1:
			return n + "st";
		case 2:
			return n + "nd";
		case 3:
			return n + "rd";
		default:
			return n + "th";
	}
}

export function formatSharingFormular(data: {
	[key: string]: string;
}): SharingFormularType {
	const sharingFormula = [];
	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			let position, percentage;
			if (key.includes("position")) {
				percentage = Number(data[key]);
				position = Number(key.split("-")[1]);
				sharingFormula.push({ position, percentage });
			}
		}
	}

	return sharingFormula;
}

/**
 * Copies text to device clipboard
 *
 * @param {string} text
 * @returns {string}
 */
export const copyTextToClipboard = async (text: string) => {
	if ("clipboard" in navigator) {
		await navigator.clipboard.writeText(text);
		toastSuccess("Copied text");
	} else {
		document.execCommand("copy", true, text);
		toastSuccess("Copied text");
	}
};

/**
 * Creates an array of objects representing a range of years, including a specified number of years before the given year and the year itself.
 * Each object has a `name` (the year as a string) and a `value` (the year as a number).
 *
 * @param year The year to base the range on.
 * @param numYearsBefore Optional. The number of years before the year to include in the range. Defaults to 5.
 * @returns An array of { name: string; value: number } objects representing the year range.
 */
export const createYearRange = (
	year: number,
	numYearsBefore: number = 5
): { name: string; value: number }[] => {
	if (!Number.isInteger(year) || !Number.isInteger(numYearsBefore)) {
		throw new Error(
			"Invalid input: 'year' and 'numYearsBefore' must be integers."
		);
	}

	const range: { name: string; value: number }[] = [];

	// Create range from numYearsBefore years before the year to the year itself
	for (let i = numYearsBefore; i > 0; i--) {
		const _year = year - i;
		range.push({ name: String(_year), value: _year });
	}

	// Add current year
	range.push({ name: String(year), value: year });

	return range;
};

/**
 * Defines an array of objects representing the months of the year.
 * Each object in the array contains the name of the month and its corresponding numerical value (1 for January through 12 for December).
 * This can be useful for applications that need to display months in a user interface or process date-related information programmatically.
 *
 * @returns {Array<{name: string; value: number}>} An array of objects where each object represents a month of the year.
 */
export const monthEnum: { name: string; value: number }[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
].map((month, index) => ({
	name: month,
	value: index + 1,
}));
