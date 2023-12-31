// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	limit,
	query,
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
	const check_player = await getPlayer(game_id, user.uid);
	if (check_player) return null;

	const new_player = {
		game_id,
		uid: user.uid,
		photoURL: user.photoURL,
		displayName: user.displayName,
		hp: 10,
		mp: 4,
		max_mp: 10,
		first: true
	};

	const doc_ref = await addDoc(collection(db, 'players'), new_player);

	return { id: doc_ref.id, ...new_player };
}

/**
 * @param {string} game_id
 * @param {string} uid
 * @param {number} number
 */
export async function drawCard(game_id, uid, number = 1) {
	const cards_ref = collection(db, '/playerCards');

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

	await batch.commit();
}

/**
 * @param {string} game_id
 * @param {string} user_uid
 */
export async function getPlayer(game_id, user_uid) {
	const snapshot = await getDocs(
		query(
			collection(db, 'players'),
			where('game_id', '==', game_id),
			where('uid', '==', user_uid),
			limit(1)
		)
	);
	if (snapshot.size === 0) return null;
	const doc = snapshot.docs[0];
	return {
		id: doc.id,
		...doc.data()
	};
}
/**
 * @param {string} game_id
 * @param {string} user_uid
 */
export async function getOpponent(game_id, user_uid) {
	const snapshot = await getDocs(
		query(
			collection(db, 'players'),
			where('game_id', '==', game_id),
			where('uid', '!=', user_uid),
			limit(1)
		)
	);
	if (snapshot.size === 0) return null;
	const doc = snapshot.docs[0];
	return {
		id: doc.id,
		...doc.data()
	};
}
