import { data } from "autoprefixer"
import { useState } from "react"
import SearchResults from "./SearchResults"

export default function SpellList(props) {

    return (
        <>
            <h1 className="text-5xl mb-5 text-center md:text-left"> <img className='h-20 inline' src='/spellfinderLogo.png' /> Spellfinder </h1>
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
                let results = data.results.filter(spell => spell.document__slug === "wotc-srd")
                console.log(results)
                setSearchResults(results)
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
