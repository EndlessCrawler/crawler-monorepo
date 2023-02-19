import { getView } from '@/api/view'

// TODO: TEST OK
// http://localhost:3000/api/view/tokenIdToCoord?chainId=1&tokenId=1
// TODO: TEST NOK
// http://localhost:3000/api/view/xxxxx?chainId=1&tokenId=1
// http://localhost:3000/api/view/tokenIdToCoord?chainId=999&tokenId=1
// http://localhost:3000/api/view/tokenIdToCoord?chainId=1
// http://localhost:3000/api/view/tokenIdToCoord?chainId=1&tokenId=0
// http://localhost:3000/api/view/tokenIdToCoord?chainId=1&tokenId=10000

export default async function handler(request, response) {
	const { view } = request.query
	const [functionName] = view

	const { data, error } = await getView(functionName, request.query)
	// console.log(`view result:`, data, error)

	if (error) {
		return response.status(400).json({
			error,
			query: request.query,
		});
	}

	return response.status(200).json(data);
}