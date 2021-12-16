import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { defaults } from "./defaults"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getXVaderPrice = async (type: string, first: number) => {
	const query = first > 0 ? `
	{
		globals(
			${first ? `first: ${first}` : ""}
			skip: 0,
			orderBy: timestamp,
			orderDirection: desc,
			where:{ 
				name: "XVADER_PRICE",
				type: "${type}"
			}) {
			id
			name
			value
			type
			timestamp
		}
	}
	` :	`
	{
		global(id: "XVADER_PRICE") {
			id
			name
			value
		}
	}
	`
	try {
		const result = await queryGraphQL(query, defaults.api.graphql.uri.vaderProtocol)
		if (result) {
			return result
		}
	}
	catch (err) {
		console.log(err)
	}
}

const queryGraphQL = async (query: string | readonly string[], uri: string) => {
	try {
		const client = new ApolloClient({
			uri: uri,
			cache: new InMemoryCache(),
		})
		const result = await client.query({ query: gql(query) })
		if (result && result.data) {
			return result.data
		}
	}
	catch (err) {
		console.log(`Failed to get data from GraphQL: ${err}`)
	}
}

export {
	getXVaderPrice,
}
