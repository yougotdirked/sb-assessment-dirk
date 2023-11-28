'use client'
import { FormEvent } from 'react'

export default function Form() {
    const onSubmitBehaviour = (event: FormEvent<HTMLFormElement>) => {
        //event.preventDefault();
    }

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
                    <input placeholder="Geen categorie" />
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
    )
}
