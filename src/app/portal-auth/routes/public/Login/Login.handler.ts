/* eslint-disable @typescript-eslint/class-methods-use-this */

import UserService from 'api/supabase/user.service';

/* eslint-disable class-methods-use-this */
interface HandlerResponse {
	ok: boolean;
	data: Record<string, any>;
}

export default class LoginHandler {
	private readonly userService: UserService = new UserService();

	public async loginWithEmailAndPassword(email: string, password: string): Promise<HandlerResponse> {
		// Login logic
		console.log(`Starting loginWithEmailAndPassword...${email} ${password}`);

		try {
			const res = await this.userService.loginWithEmailPassword(email, password);
			return {
				ok: true,
				data: res,
			};
		} catch (error: any) {
			console.error('Error on loginWithEmailAndPassword', error);
			throw error;
		}
	}

	public loginWithGoogle(): void {
		// Login logic
	}

	public loginWithFacebook(): void {
		// Login logic
	}

	public loginWithApple(): void {
		// Login logic
	}
}
