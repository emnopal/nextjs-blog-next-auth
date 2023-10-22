import { MongoClient } from 'mongodb'

declare global {
	namespace globalThis {
		var mongoClientPromise: Promise<MongoClient>
	}
}

export async function getMongoClient() {
	if (!global.mongoClientPromise) {
		const client = new MongoClient(process.env.MONGODB_URI as string)
		global.mongoClientPromise = client.connect()
	}
	return global.mongoClientPromise
}

export async function getMongoDb() {
	const mongoClient = await getMongoClient()
	return mongoClient.db()
}
