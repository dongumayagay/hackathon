// See https://kit.svelte.dev/docs/types#app

import type { UserRecord } from "firebase-admin/auth";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user_id: string | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
