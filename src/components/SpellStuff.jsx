import { data } from "autoprefixer"
import { useState } from "react"


//drag and drop kit
import { DndContext, MouseSensor, closestCenter, useSensor, useSensors, useDroppable } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// import { useSortable } from "@dnd-kit/sortable"
// import { CSS } from '@dnd-kit/utilities'
import SpellCard from "./SpellCard"

export default function SpellList(props) {

    return (
        <>
            <h1 className="text-5xl mb-5 text-center md:text-left "> <img className='h-20 inline hover:-translate-y-1 duration-75' src='/spellfinderLogo.png' /> Spellfinder </h1>
            <SpellSearch className="mx-0" />
        </>
    )
}

function SpellSearch() {

    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])


    function handleSearchValueChange(e) {
        setSearchValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let input = searchValue.toLowerCase().trim()
            .split(' ').join('%20')
        // alert(`Searching for ${input}!`)
        fetch(`https://api.open5e.com/spells/?search=${input}&limit=5`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data.results)
            })
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit} className="md:text-left">
            <label>
                <input value={searchValue}
                    onChange={handleSearchValueChange}
                    type="text"
                    placeholder="Enter a spell..."
                    className="input input-bordered w-50 max-w-xs pl-2 ml-2" />
            </label>

            <button
                type='submit' className="btn ml-3">Search</button>
            <SearchResults
                searchResults={searchResults}
            />
        </form>
    )
}

//SEARCH RESULTS, SAVED SPELLS.

function SearchResults({ searchResults }) {

    const [savedSpells, setSavedSpells] = useState([]);

    //dnd sensors

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });

    const sensors = useSensors(
        mouseSensor
    )

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
            ritual, school, casting_time, slug
        } = e
        const exists = savedSpells.some((item) => item.name === name);
        if (!exists) {
            setSavedSpells(prevSavedSpells => [...prevSavedSpells, {
                slug, desc, name, range, components, concentration,
                duration, higher_level, level, material,
                ritual, school, casting_time
            }])
        }

    }

    function handleDeleteSpell(spell) {
        console.log('deleted' + spell.name)
        let filteredSpells = savedSpells.filter(saved => saved.name != spell.name)
        setSavedSpells(filteredSpells)
    }

    function handleDragEnd(e) {
        const active = e.active.id, over = e.over.id
        console.log(active, over)
        if (active !== over) {
            setSavedSpells((prevSpells) => {
                const activeIndex = prevSpells.findIndex(spell => spell.slug === active)
                const overIndex = prevSpells.findIndex(spell => spell.slug === over)
                console.log(activeIndex, overIndex)
                return arrayMove(prevSpells, activeIndex, overIndex)
            })
        }
    }
    return (
        <section className='sm:flex sm:mt-10 mt-2'>
            <div
                className="sm:w-1/4 w-3/4 mx-auto"
            >{searchList && searchList}</div>
            {/* DRAG AND DROP CONTEXT */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}><section className="md:w-3/4">
                    <div>
                        <SortableContext
                            items={savedSpells}
                            strategy={verticalListSortingStrategy}
                        >
                            {savedSpells.map(spell => <SpellCard
                                spellInfo={spell}
                                handleDeleteSpell={() => handleDeleteSpell(spell)}
                                key={spell.name}
                                id={spell.slug}
                            />)}
                        </SortableContext>
                    </div>


                </section></DndContext>
        </section>
    )
}

//SPELL CARD

// function SpellCard({ spellInfo, id, handleDeleteSpell }) {
//     let { desc, name, range, components, concentration,
//         duration, higher_level, level, material,
//         ritual, school, casting_time, slug } = spellInfo

//     const {
//         attributes, listeners, setNodeRef, transform, transition
//     } = useSortable({ id: id })

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition
//     }

//     return (
//         <div className="mx-2 border-2 mb-2 border-black p-3 max-w-4xl shadow-xl rounded-md hover:-translate-y-1 duration-200"
//             ref={setNodeRef} style={style} {...attributes} {...listeners}
//         >

//             <div className="flex flex-col justify-between p-6 space-y-8">
//                 <div className="space-y-2">
//                     <div className="flex justify-between">
//                         <h2 className="md:text-3xl text-xl font-semibold tracking-wide text-left">{name && name}
//                             <span className="inline-block text-xl font-thin ml-5">{concentration === 'yes' && "C"}</span></h2>
//                         <button onClick={handleDeleteSpell} className="btn btn-outline btn-circle btn-error btn-sm ">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                         </button>
//                     </div>
//                     <h4 className="text-left">{level} {school}</h4>
//                     <p className="text-justify md:text-md text-sm">{desc}</p>
//                     {higher_level && <p className="text-justify md:text-md text-sm"><span className="font-bold italic">At higher levels. </span>{`${higher_level}`}</p>}
//                     <section className="flex ">
//                         <div className="text-left w-1/2 md:text-md text-xs">
//                             <p>Range: {range}</p>
//                             <p>Components: {components}</p>
//                             {material && <p>Materials needed: {material}</p>}
//                             {ritual === "yes" && <p>Ritual</p>}
//                         </div>

//                         <div className="text-left w-1/2 md:text-md text-xs">
//                             <p>Casting time: {casting_time}</p>
//                             <p>Duration: {duration}</p>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     )
// }