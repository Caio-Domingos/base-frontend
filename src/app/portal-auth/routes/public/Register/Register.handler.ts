import UserService from 'api/supabase/user.service';

export default class RegisterHandler {
	private readonly userService: UserService = new UserService();

	public async register(name: string, email: string, password: string): Promise<{ ok: boolean; data?: any; error?: any }> {
		try {
			return {
				ok: true,
				data: await this.userService.registerWithEmailPassword(name, email, password),
			};
		} catch (error: any) {
			console.error(error);
			throw new Error(error.message);
		}
	}
}
