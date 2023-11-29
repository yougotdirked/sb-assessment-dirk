import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.BASE_URL;
const token = process.env.TOKEN;

export interface IPostsGetRequest {
    page: number;
    perPage: number;
    sortBy: string;
    sortDirection: "asc" | "desc";
    searchPhrase: string;
    categoryId: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (!baseUrl || !token) {
            throw new Error("Configuration error");
        }

        switch (req.method) {
            case "POST": {
                console.log("post");
                break;
            }
            case "GET":
                {
                    const response = await fetch(baseUrl + req.url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            token: token!,
                        },
                    });
                    if (response.status === 200) {
                        const result = await response.json();
                        res.status(200).json(result);
                    } else {
                        console.error(`--- Social Brothers server repsonse: --- 
                            ${response.status}: ${response.statusText}`);
                        throw new Error(response.statusText);
                    }
                }
                break;
            default: {
                //logic here
                res.statusCode = 405;
                res.statusMessage = "Method not allowed";
                res.json("");
            }
        }
    } catch (error: any) {
        if (error.message) {
            console.error(error.message);
            res.statusMessage = error.message;
        }
        res.status(400);
    }
}
