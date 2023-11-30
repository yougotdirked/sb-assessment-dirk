import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;
const token = process.env.TOKEN;

export async function GET(req: NextRequest) {
    try {
        if (!baseUrl || !token) {
            throw new Error("Configuration error");
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
            return NextResponse.json(result, { status: 200 });
        } else {
            console.error(`--- Social Brothers server repsonse: --- 
          ${response.status}: ${response.statusText}`);
            throw new Error(response.statusText);
        }
    } catch (error: any) {
        if (error.message) {
            console.error(error.message);
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
    }
}
