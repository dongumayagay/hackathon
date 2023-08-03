import { auth_admin } from '$lib/firebase/admin.server';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	try {
		const sessionCookie = event.cookies.get('__session');
		if (!sessionCookie) throw new Error();
		const decodedClaims = await auth_admin.verifySessionCookie(sessionCookie);
		event.locals.claims = decodedClaims;
		event.locals.user = await auth_admin.getUser(decodedClaims.uid);
	} catch (e) {
		event.locals.claims = null;
		event.locals.user = null;
	}

	if (event.url.pathname.startsWith('/admin')) {
		if (!event.locals.claims) throw error(401, 'Unauthorized');
		if (event.locals.claims?.admin !== true) throw error(403, 'Forbidden');
	}

	return resolve(event);
}
