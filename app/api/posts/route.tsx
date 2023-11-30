import { NextRequest, NextResponse } from "next/server";

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

interface CreatePost {
    title: string;
    content: string;
    category_id: string;
    image: File;
}

export async function GET(req: NextRequest) {
    try {
        if (!baseUrl || !token) {
            throw new Error("Configuration error");
        }

        const response = await fetch(
            baseUrl + "/api/posts?" + req.nextUrl.searchParams,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token!,
                },
            }
        );
        if (response.status === 200) {
            const result = await response.json();
            return NextResponse.json(result, { status: 200 });
        } else {
            throw new Error(response.statusText);
        }
    } catch (error: any) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        if (!baseUrl || !token) {
            throw new Error("Configuration error");
        }

        const data = await req.formData();

        const response = await fetch(baseUrl + "/api/posts", {
            method: "POST",
            headers: {
                token: token!,
            },
            body: data,
        });

        if (response.status === 200 || response.status === 201) {
            const result = await response.json();
            return NextResponse.json(result, { status: 200 });
        } else {
            throw new Error(
                `remote server (${response.status}) : ${response.statusText}`
            );
        }
    } catch (error: any) {
        return serverError("nodejs: " + error);
    }
}

const serverError = (error: any) => {
    if (error.message) {
        console.error("error: " + error.message);
    }
    return NextResponse.json(
        {
            message: error.message ? error.message : "empty",
        },
        {
            status: 400,
        }
    );
};
