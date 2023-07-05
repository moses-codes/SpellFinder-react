import { data } from "autoprefixer"
import { useState } from "react"
import SpellCard from "./Spellcard";

//SEARCH RESULTS, SAVED SPELLS.

export default function SearchResults({ searchResults }) {

    const [savedSpells, setSavedSpells] = useState([]);

    let searchList = (
        <ul className="menu bg-base-100 w-full mx-auto">
            {searchResults.map(result => {
                let { slug, name } = result
                return (<li
                    className="mx-0 border-b-2 border-slate-200"
                    key={slug}>
                    <p className="flex justify-between md:text-xl sm:text-sm text-xs">{name} <button
                        onClick={() => handleClick(result)}
                        className="btn btn-primary btn-outline w-10 btn-xs">Add</button></p>

                </li>)
            })}
        </ul>
    )


    function handleClick(e) {

        let {
            desc, name, range, components, concentration,
            duration, higher_level, level, material,
            ritual, school, casting_time
        } = e
        const exists = savedSpells.some((item) => item.name === name);
        if (!exists) {
            setSavedSpells(prevSavedSpells => [...prevSavedSpells, {
                desc, name, range, components, concentration,
                duration, higher_level, level, material,
                ritual, school, casting_time
            }])
        }

    }

    function handleDeleteSpell(spell) {

        let filteredSpells = savedSpells.filter(saved => saved.name != spell.name)
        setSavedSpells(filteredSpells)
    }

    let spellCards = (savedSpells.map(spell => <SpellCard
        spellInfo={spell}
        handleDeleteSpell={() => handleDeleteSpell(spell)}
        key={spell.name}
    />))

    return (<>
        <section className='sm:flex sm:mt-10 mt-2'>
            <div
                className="sm:w-1/4 w-3/4 mx-auto"
            >{searchList && searchList}</div>
            <div className="md:w-3/4">
                {spellCards}
            </div>
        </section>
    </>)
}