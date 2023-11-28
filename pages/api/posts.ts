import { NextApiRequest, NextApiResponse } from 'next'

const baseUrl = process.env.BASE_URL
const token = process.env.TOKEN

export interface IPostsGetRequest {
    page: number
    perPage: number
    sortBy: string
    sortDirection: 'asc' | 'desc'
    searchPhrase: string
    categoryId: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!baseUrl || !token) {
        throw new Error('Configuration error')
    }

    console.log(baseUrl + req.url)
    switch (req.method) {
        case 'POST': {
            console.log('post')
            break
        }
        case 'GET': {
            try {
                const response = await fetch(baseUrl + req.url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token!,
                    },
                })
                if (response.status === 200) {
                    console.log('OK')
                    const result = await response.json()
                    res.status(200).json(result)
                } else {
                    console.error(`--- Social Brothers server repsonse: --- 
                            ${response.status}: ${response.statusText}`)
                    throw new Error(response.statusText)
                }
            } catch (error: any) {
                res.statusMessage = error.message && error.message
                res.status(400)
            }
            break
        }
        default: {
            //logic here
            res.statusCode = 405
            res.statusMessage = '405: Method not allowed'
            res.json('')
        }
    }
}
