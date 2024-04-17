import CrudBaseService from './_crudBase.service'

export interface User {
	id: number
	name: string
	type: UserType
}

export enum UserType {
	ADMIN = 'ADMIN',
	GUEST = 'GUEST',
	USER = 'USER'
}

export default class UsersService extends CrudBaseService<User> {
	public constructor() {
		super('users')
	}
}
