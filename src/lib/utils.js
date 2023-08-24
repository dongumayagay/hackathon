/**  @param {string} inputString */
export function generateRandomBoolean(inputString) {
	const asciiSum = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return asciiSum % 100 < 50;
}

/**  @param {number} currentSecurity */
export function computePercentage(currentSecurity) {
	if (currentSecurity <= 10){
		let currentPercent =  (currentSecurity/10)*100;
		return currentPercent.toString();
	} else {
		return "100";
	}
	
}