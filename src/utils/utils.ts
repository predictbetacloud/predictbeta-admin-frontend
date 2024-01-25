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
