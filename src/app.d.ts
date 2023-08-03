// See https://kit.svelte.dev/docs/types#app

import type { DecodedIdToken, UserRecord } from "firebase-admin/auth";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			claims: DecodedIdToken | null,
			user: UserRecord | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
