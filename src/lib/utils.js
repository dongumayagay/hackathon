/**  @param {string} inputString */
export function generateRandomBoolean(inputString) {
	const asciiSum = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return asciiSum % 100 < 50;
}
