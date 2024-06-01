/* eslint-disable @typescript-eslint/class-methods-use-this */
/* eslint-disable class-methods-use-this */
interface HandlerResponse {
	ok: boolean;
	data: Record<string, any>;
}

export default class LoginHandler {
	public loginWithEmailAndPassword(email: string, password: string): HandlerResponse {
		// Login logic
		console.log(`Starting loginWithEmailAndPassword...${email} ${password}`);
		return {
			ok: true,
			data: {},
		};
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
