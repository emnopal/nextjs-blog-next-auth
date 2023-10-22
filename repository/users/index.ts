import bcrypt from 'bcryptjs'
import { ObjectId, type Db } from 'mongodb'
import { IUserModel } from '@/models/users'

export async function authenticate(
	db: Db,
	username: string,
	plainPassword: string,
): Promise<IUserModel | null> {
	const usersCollection = db.collection<IUserModel>('users')
	const user = await usersCollection.findOne({ username })
	if (user && (await bcrypt.compare(plainPassword, user.password))) {
		return user
	}
	return null
}

export async function getAll(db: Db): Promise<IUserModel[]> {
	const usersCollection = db.collection<IUserModel>('users')
	return await usersCollection
		.find({}, { projection: { password: 0 } })
		.toArray()
}

export async function getById(db: Db, id: string): Promise<IUserModel | null> {
	const usersCollection = db.collection<IUserModel>('users')
	return await usersCollection
		.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
		.then((user) => user || null)
}

export async function getByUsername(
	db: Db,
	username: string,
): Promise<IUserModel | null> {
	const usersCollection = db.collection<IUserModel>('users')
	return await usersCollection
		.findOne({ username: username }, { projection: { password: 0 } })
		.then((user) => user || null)
}

export async function getByEmail(
	db: Db,
	email: string,
): Promise<IUserModel | null> {
	const usersCollection = db.collection<IUserModel>('users')
	return await usersCollection
		.findOne({ email: email }, { projection: { password: 0 } })
		.then((user) => user || null)
}

export async function insert(db: Db, params: IUserModel): Promise<IUserModel | boolean> {
	const usersCollection = db.collection<IUserModel>('users')

	if (await usersCollection.findOne({ username: params.username })) {
		return false
	}

	if (params.password) {
		params.password = await bcrypt.hash(params.password, 10)
	}

	params.role = 'user'

	const { insertedId } = await usersCollection.insertOne(params)
	params.id = insertedId.toString()
	return params
}

export async function update(
	db: Db,
	id: string,
	params: Partial<IUserModel>,
): Promise<void> {
	const usersCollection = db.collection<IUserModel>('users')
	const existingUser = await usersCollection.findOne({ _id: new ObjectId(id) })

	if (!existingUser) {
		throw 'User not found'
	}

	if (existingUser.username !== params.username) {
		const userWithSameUsername = await usersCollection.findOne({
			username: params.username,
		})

		if (userWithSameUsername) {
			throw 'Username "' + params.username + '" is already taken'
		}
	}

	return await usersCollection
		.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $set: params },
			{ returnDocument: 'after', projection: { password: 0 } },
		)
		.then(({ value }: any) => value)
}

export async function updatePassword(
	db: Db,
	id: string,
	oldPassword: string,
	newPassword: string,
) {
	const usersCollection = db.collection<IUserModel>('users')
	const user = await usersCollection.findOne(new ObjectId(id))
	if (!user) return false
	const matched = await bcrypt.compare(oldPassword, user.password)
	if (!matched) return false
	const password = await bcrypt.hash(newPassword, 10)
	await usersCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { password } },
	)
	return true
}

export async function _delete(db: Db, id: string): Promise<void> {
	const usersCollection = db.collection<IUserModel>('users')
	await usersCollection.deleteOne({ _id: new ObjectId(id) })
}
