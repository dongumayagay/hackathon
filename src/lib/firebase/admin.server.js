import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { env } from '$env/dynamic/private';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
	clientEmail: env.CLIENT_EMAIL,
	privateKey: env.PRIVATE_KEY,
	projectId: env.PROJECT_ID
};

function getFirebaseAdmin() {
	if (getApps().some((e) => e.name === 'ADMIN')) return getApp('ADMIN');
	return initializeApp({ credential: cert(serviceAccount) }, 'ADMIN');
}
export const admin = getFirebaseAdmin();
export const auth_admin = getAuth(admin);
export const db_admin = getFirestore(admin);
