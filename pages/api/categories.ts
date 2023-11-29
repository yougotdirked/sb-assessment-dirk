import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.BASE_URL;
const token = process.env.TOKEN;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (!baseUrl || !token) {
            throw new Error("Configuration error");
        }
        if (req.method !== "GET") {
            res.status(405).statusMessage = "Method not allowed";
        }
        const response = await fetch(baseUrl + "/api/categories", {
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
    } catch (error: any) {
        if (error.message) {
            console.error(error.message);
            res.statusMessage = error.message;
        }
        res.status(400);
    }
}
