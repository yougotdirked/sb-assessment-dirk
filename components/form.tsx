"use client";
import { ICategory } from "@/models";
import { FormEvent, useEffect, useState } from "react";

//Add extra form validations here. Update through useState
const formValidations: Record<string, boolean>[] = [
    { titleValid: false },
    { categoryValid: false },
    { imageValid: false },
    { messagValid: false },
];

export default function Form() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [formState, setFormState] =
        useState<Record<string, boolean>[]>(formValidations);
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

    const onSubmitBehaviour = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formState.every((validation) => validation.value)) {
            setSubmitEnabled(false);
            return;
        } else {
            const data = new FormData(event.target as HTMLFormElement);
            console.log(data.entries);
        }
    };

    return (
        <div className="col-span-5 max-w-[451px]">
            <form
                onSubmit={onSubmitBehaviour}
                className="bg-white p-[24px] flex flex-col"
            >
                <h2>Plaats een blog bericht</h2>
                <div className="min-h-62px flex flex-col">
                    <label>Berichtnaam</label>
                    <input placeholder="Geen titel" />
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Categorie</label>
                    <select placeholder="Geen categorie">
                        <option className="text-[#C5C5C5]" value={-1}>
                            Geen categorie
                        </option>
                        {categories.map((catgegory, index) => {
                            return (
                                <option
                                    className="text-[#262626]"
                                    key={index}
                                    value={catgegory.id}
                                >
                                    {catgegory.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Header afbeelding</label>
                    <input type="file" />
                </div>
                <div className="min-h-62px flex flex-col">
                    <label>Bericht</label>
                    <textarea rows={10} />
                </div>
                <button className="mx-auto bg-[#F27623] main" type="submit">
                    Bericht aanmaken
                </button>
            </form>
        </div>
    );
}
