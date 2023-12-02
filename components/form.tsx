"use client";
import { ICategory } from "@/models";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { PostsContext } from "@/app/page";

export interface IFormData {
    title: string;
    category_id: string | null;
    image: File | null;
    content: string;
}

const emptyForm: IFormData = {
    title: "",
    category_id: null,
    image: null,
    content: "",
};

export default function Form() {
    const postsContext = useContext(PostsContext);

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
        <div className="col-span-5 sm:max-w-[451px]">
            <form
                id="create-post-form"
                onSubmit={onSubmitBehaviour}
                className="bg-white p-[24px] flex flex-col"
            >
                <h2>Plaats een blog bericht</h2>
                <label>
                    <span className="mb-[6px]">Berichtnaam</span>
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
                </label>
                <label>
                    <span className="mb-[6px]">Categorie</span>
                    <select
                        name="category_id"
                        onChange={(e) => {
                            handleFormChange({
                                category_id: e.target.value,
                            });

                            e.target.value !== "" &&
                                postsContext.setPageQuery({
                                    ...postsContext.pageQuery,
                                    categoryId: Number.parseInt(e.target.value),
                                    page: 1,
                                });
                        }}
                        placeholder="Geen categorie"
                        className={`${
                            !submitEnabled && !formData.category_id
                                ? "outline  outline-red-600"
                                : ""
                        }`}
                    >
                        <option className={"text-[#C5C5C5]"} value={""}>
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
                </label>
                <label className="w-auto flex" htmlFor="file-upload">
                    <span className="mb-[6px]">Header afbeelding</span>
                    <div className="flex">
                        <button
                            role="Open fileupload"
                            onClick={() => {
                                document.getElementById("file-upload")!.click();
                            }}
                            type="button"
                            tabIndex={0}
                            className={`h-[39px] flex grow-1 customUploader focus-visible:outline-offset-0 focus-visible:no-underline ${
                                !submitEnabled && !formData.image
                                    ? "outline  outline-red-600"
                                    : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                color="#7D7D7D"
                                className="my-auto"
                                icon={faImage}
                            />
                            <div className="rounded-full bg-[#7D7D7D] px-[12px] py-[4px] my-auto ml-[16px] text-[10px] text-[#FFFFFF]">
                                Kies bestand
                            </div>
                        </button>
                        <input
                            id="file-upload"
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
                        <span className="my-auto ml-[12px]">
                            {formData.image?.name}
                        </span>
                    </div>
                </label>
                <label>
                    <span className="mb-[6px]">Bericht</span>
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
                </label>
                <button className="mx-auto bg-[#F27623] main" type="submit">
                    Bericht aanmaken
                </button>
            </form>
        </div>
    );
}
