import { data } from "autoprefixer"
import { useState } from "react"
import SearchResults from "./SearchResults"
import SearchSortBar from "./SearchSortBar"
import SpellCard from "./Spellcard"

export default function SpellList(props) {

    const [searchResults, setSearchResults] = useState([])
    const [savedSpells, setSavedSpells] = useState([])

    console.log(savedSpells)

    function handleSort(e) {
        if (e.target.value === 'lvl') {
            console.log('sort by level')
            setSavedSpells([...savedSpells].sort((a, b) => a.spell_level - b.spell_level))
        } else if (e.target.value === 'alpha') {
            console.log('sort alphabetically')
            setSavedSpells([...savedSpells].sort((a, b) => a.name.localeCompare(b.name)))
        }
    }

    function handleDeleteSpell(spell) {

        let filteredSpells = savedSpells.filter(saved => saved.name != spell.name)
        setSavedSpells(filteredSpells)
    }

    return (
        <>

            <SearchSortBar
                setSearchResults={setSearchResults}
                handleSort={handleSort}
            />
            <main className='md:flex sm:mt-10 mt-2'>
                <div
                    className="md:w-1/4 w-3/4 mx-auto"
                ><SearchResults
                        searchResults={searchResults}
                        setSavedSpells={setSavedSpells}
                        savedSpells={savedSpells}
                        className="mx-0" />
                </div>
                <div
                    className="md:w-3/4"
                >
                    <div>
                        {savedSpells.map(spell => <SpellCard
                            spellInfo={spell}
                            handleDeleteSpell={() => handleDeleteSpell(spell)}
                            key={spell.name}
                        />)}
                    </div>
                </div>
            </main>
        </>
    )
}

// function SpellSearch() {

//     const [searchValue, setSearchValue] = useState('')
//     const [searchResults, setSearchResults] = useState([])
//     const [savedSpells, setSavedSpells] = useState([])


//     function handleSearchValueChange(e) {
//         setSearchValue(e.target.value)
//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         let input = searchValue.toLowerCase().trim()
//             .split(' ').join('%20')

//         // alert(`Searching for ${input}!`)
//         fetch(`https://api.open5e.com/spells/?search=${input}&limit=5`)
//             .then(res => res.json())
//             .then(data => {
//                 let results = data.results.filter(spell => spell.document__slug === "wotc-srd")
//                 console.log(results)
//                 setSearchResults(results)
//             })
//             .catch(error => console.log(error))


//     }

//     return (
//         <div>
//             <SearchResults
//                 searchResults={searchResults}
//             />
//         </div>
//     )
// }
