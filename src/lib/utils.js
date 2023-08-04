/**  @param {string} inputString */
export function generateRandomBoolean(inputString) {
	const asciiSum = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return asciiSum % 100 < 50;
}

/**
 * @param {{ docs: any[]; }} snapshot
 */
export function playersSnapshotParser(snapshot) {
	const players_arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	const players = players_arr.reduce((result, item) => {
		const { id, ...rest } = item; // Destructure id and rest of the properties
		// @ts-ignore
		result[id] = { ...rest }; // Copy rest of the properties without id
		return result;
	}, {});

	return players;
}
