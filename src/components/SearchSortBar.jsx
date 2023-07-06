import { data } from "autoprefixer"
import { useState } from "react"

export default function SearchSortBar({ setSearchResults, handleSort }) {

    const [searchValue, setSearchValue] = useState('')

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
                setSearchResults(results)
            })
            .catch(error => console.log(error))


    }
    return (
        <div className="md:flex md:justify-start ">
            <form onSubmit={handleSubmit} className="md:text-left md:w-full w-52 mx-auto">
                <label>
                    <input value={searchValue}
                        onChange={handleSearchValueChange}
                        type="text"
                        placeholder="Enter a spell..."
                        className="input input-bordered md:w-52 pl-2 ml-2 md:input-md input-xs w-28" />
                </label>

                <button
                    type='submit' className="btn md:btn-md btn-xs">Search</button>


            </form>
            <form
                onChange={handleSort}
                className="md:ml-5">
                <div className="form-control max-w-xs mx-auto">
                    <select
                        className="select select-bordered select-xs md:select-md w-48 md:mx-0 mx-auto"
                        defaultValue={"Sort by..."}
                    >
                        <option disabled value={"Sort by..."}>Sort by...</option>
                        <option value={'lvl'}>Level (asc)</option>
                        <option value={'alpha'}>A-Z (name)</option>
                    </select>
                </div>
            </form>
        </div>
    )
}