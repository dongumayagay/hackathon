import { auth_admin } from '$lib/firebase/admin.server';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, cookies }) {
	const idToken = url.searchParams.get('idToken');
	if (!idToken) throw error(400, 'no auth token passed');

	const decodedIdToken = await auth_admin.verifyIdToken(idToken);
	if (new Date().getTime() / 1000 - decodedIdToken.auth_time > 5 * 60)
		throw error(401, 'Recent sign in required!');

	const expiresIn = 60 * 60 * 24 * 7 * 1000;
	const cookie = await auth_admin.createSessionCookie(idToken, { expiresIn });
	const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
	cookies.set('__session', cookie, options);
	return json({ status: 'signed in' });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ cookies }) {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signed out' });
}
