"use client";
import { ICategory } from "@/models";
import { FormEvent, useEffect, useState } from "react";

export interface IFormData {
    title: string;
    category_id: string;
    image: File | null;
    content: string;
}

const emptyForm: IFormData = {
    title: "",
    category_id: "",
    image: null,
    content: "",
};

export default function Form() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [formData, setFormData] = useState<IFormData>(emptyForm);
    const [submitEnabled, setSubmitEnabled] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            fetch("api/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    setCategories(result);
                });
        };
        getCategories();
    }, []);

    const createPost = async (data: FormData) => {
        const response = await fetch("api/posts", {
            method: "POST",
            body: data,
        });
        return response.status;
    };

    const validateFormData = () => {
        return (
            formData.title.length > 0 &&
            formData.category_id &&
            formData.image &&
            formData.content !== ""
        );
    };

    const onSubmitBehaviour = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(...data);
        if (!validateFormData()) {
            setSubmitEnabled(false);
            return;
        } else {
            const status = await createPost(data);
            if (status === 200) {
                (
                    document.getElementById(
                        "create-post-form"
                    ) as HTMLFormElement
                ).reset();
                setFormData(emptyForm);
            }
        }
    };

    const handleFormChange = (
        input: Record<string, string | number | File>
    ) => {
        setSubmitEnabled(true);
        setFormData({ ...formData, ...input } as IFormData);
    };

    return (
        <div className="col-span-5 max-w-[451px]">
            <form
                id="create-post-form"
                onSubmit={onSubmitBehaviour}
                className="bg-white p-[24px] flex flex-col"
            >
                <h2>Plaats een blog bericht</h2>
                <div className="min-h-62px flex flex-col">
                    <label>Berichtnaam</label>
                    <input
                        name="title"
                        onChange={(e) =>
                            handleFormChange({ title: e.target.value })
                        }
                        placeholder="Geen titel"
                        className={`${
                            !submitEnabled && formData.title.length < 1
                                ? "outline  outline-red-600"
                                : ""
                        }`}
                    />
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Categorie</label>
                    <select
                        name="category_id"
                        onChange={(e) =>
                            handleFormChange({ category_id: e.target.value })
                        }
                        placeholder="Geen categorie"
                        className={`${
                            !submitEnabled && formData.category_id
                                ? "outline  outline-red-600"
                                : ""
                        }`}
                    >
                        <option className={"text-[#C5C5C5]"} value={-1}>
                            Geen categorie
                        </option>
                        {categories.map((catgegory, index) => {
                            return (
                                <option
                                    className="text-[#262626]"
                                    key={index}
                                    value={catgegory.id.toString()}
                                >
                                    {catgegory.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Header afbeelding</label>
                    <input
                        name="image"
                        onChange={(e) =>
                            e.target.files &&
                            handleFormChange({
                                image: e.target.files[0],
                            })
                        }
                        type="file"
                        accept="image/png, image/jpeg"
                        className={`${
                            !submitEnabled && !formData.image
                                ? "outline  outline-red-600"
                                : ""
                        }`}
                    />
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Bericht</label>
                    <textarea
                        name="content"
                        onChange={(e) =>
                            handleFormChange({ content: e.target.value })
                        }
                        className={`${
                            !submitEnabled && formData.content.length === 0
                                ? "outline  outline-red-600"
                                : ""
                        }`}
                        rows={10}
                    />
                </div>
                <button className="mx-auto bg-[#F27623] main" type="submit">
                    Bericht aanmaken
                </button>
            </form>
        </div>
    );
}
