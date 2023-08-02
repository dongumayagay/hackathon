// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
