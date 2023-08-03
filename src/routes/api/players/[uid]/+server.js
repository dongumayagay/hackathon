import { db } from '$lib/firebase/client';
import { deleteDoc, doc } from 'firebase/firestore';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response();
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ params }) {
	await deleteDoc(doc(db, `players/${params.uid}`));
	return new Response('deleted');
}
