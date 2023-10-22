export interface IUserModel {
	id?: string
	username: string
	name: string
	email: string
	password: string
	role: string
	isDeleting?: boolean
}

export interface IUserCredentialsRequest {
	username: string
	password: string
}
