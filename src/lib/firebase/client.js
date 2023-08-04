// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
	writeBatch
} from 'firebase/firestore';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	getIdToken,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { invalidateAll } from '$app/navigation';
import cards from '$lib/cards';
import { generateRandomBoolean } from '$lib/utils';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCDb2b-gy9MidrKw_h_Cv_PQeDZykfeuo0',
	authDomain: 'pup-hackathon-2023.firebaseapp.com',
	projectId: 'pup-hackathon-2023',
	storageBucket: 'pup-hackathon-2023.appspot.com',
	messagingSenderId: '491082349761',
	appId: '1:491082349761:web:590a4a7a8009f3b3aee840',
	measurementId: 'G-DGGMWPZ10F'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, 'CLIENT');
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);
export const realtime = getDatabase(app);
export async function google_signin() {
	const credential = await signInWithPopup(auth, new GoogleAuthProvider());
	const idToken = await getIdToken(credential.user);
	await fetch(`/api/auth?idToken=${idToken}`, { method: 'POST' });
	await signOut(auth);
	await invalidateAll();
}

export async function sign_out() {
	await fetch('/api/auth', { method: 'DELETE' });
	await invalidateAll();
}

/**
 * @param {any} user
 * @param {string} game_id
 */
export async function addPlayer(user, game_id) {
	const doc_ref = doc(db, `players/${user.uid}`);

	const snapshot = await getDoc(doc_ref);
	const data = snapshot.data();
	if (snapshot.exists() && data?.game_id !== game_id) await deleteDoc(doc_ref);
	if (snapshot.exists()) return;

	await setDoc(doc_ref, {
		game_id,
		photoURL: user.photoURL,
		displayName: user.displayName,
		hp: 30,
		mp: 4,
		max_mp: 10,
		first: true
	});
}
/**
 * @param {string} uid
 */
export async function removePlayer(uid) {
	const doc_ref = doc(db, `players/${uid}`);
	await deleteDoc(doc_ref);
}

/**
 * @param {string} game_id
 * @param {string} uid
 * @param {number} number
 */
export async function drawCard(game_id, uid, number = 1, first = false) {
	const cards_ref = collection(db, '/cards_on_hand');

	const batch = writeBatch(db);
	for (let i = 0; i < number; i++) {
		const randomIndex = Math.floor(Math.random() * cards.length);
		const card = cards[randomIndex];

		const doc_ref = doc(cards_ref);
		batch.set(doc_ref, {
			uid,
			game_id,
			...card
		});
	}
	if (first) batch.update(doc(db, `players/${uid}`), { first: false });

	await batch.commit();
}

/** @param {string} game_id */
export async function pick_first(game_id) {
	const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
	const game_data = game_snapshot.data();
	if (!game_data?.start) return {};

	const players_snapshot = await getDocs(
		query(collection(db, 'players'), where('game_id', '==', game_id))
	);
	const uids = players_snapshot.docs.map((doc) => doc.id);

	const random_index = generateRandomBoolean(game_id) ? 0 : 1;

	await setDoc(doc(db, `game/${game_id}`), {
		turn: uids[random_index],
		start: false
	});
}
