import { auth_admin } from '$lib/firebase/admin.server';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	try {
		const sessionCookie = event.cookies.get('__session');
		if (!sessionCookie) throw new Error();
		const decodedClaims = await auth_admin.verifySessionCookie(sessionCookie);
		event.locals.user_id = decodedClaims.uid;
	} catch (e) {
		event.locals.user_id = null;
	}

	return resolve(event);
}
