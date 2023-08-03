// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
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
	if (snapshot.exists()) return;

	await setDoc(doc_ref, {
		game_id,
		photoURL: user.photoURL,
		displayName: user.displayName,
		hp: 30,
		mp: 4,
		max_mp: 10
	});
}

/**
 * @param {string} uid
 */
export async function removePlayer(uid) {
	const doc_ref = doc(db, `players/${uid}`);
	await deleteDoc(doc_ref);
}

export async function deleteGame(game_id) {}
