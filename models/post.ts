import { ICategory } from "./category";

export interface IPost {
    id: string;
    created_at: Date;
    updated_at: Date;
    title: string;
    content: string;
    category_id: number;
    img_url: string;
    category: ICategory;
}
