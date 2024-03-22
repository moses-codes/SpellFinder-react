import { data } from "autoprefixer"
import { useState } from "react"

export default function SpellCard({ spellInfo, handleDeleteSpell }) {
    let { desc, name, range, components, concentration,
        duration, higher_level, level, material,
        ritual, school, casting_time, spell_level } = spellInfo

    const [show, setShow] = useState(true)

    function handleToggleShow(e) {
        setShow(!show)
    }

    function formatDesc(str) {
        const segments = str.split('**');
        const result = [];

        for (let i = 0; i < segments.length; i++) {
            if (i % 2 === 1) {
                result.push(<p className=' pl-5 pt-1 ' key={i}> <span className='font-bold italic'>{segments[i]}</span> {segments[i + 1]}</p>);
                i++
            } else {
                result.push(segments[i]);
            }
        }

        return result
    }


    //format the description.

    desc = formatDesc(desc)

    return (
        <div className="mx-2 border-2 mb-2 border-black p-2 max-w-4xl shadow-xl rounded-md">

            <div className={`flex flex-col justify-between 
            md:py-4 md:px-6 p-1`}>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h2 className="md:text-3xl text-md font-semibold tracking-wide text-left">{name && name}
                            <span className="inline-block text-md md:text-xl font-thin md:ml-5 ml-2">{concentration === 'yes' && "C"}</span></h2>
                        <div>
                            <button className="btn btn-square md:btn-md btn-xs"
                                onClick={handleToggleShow}
                            >
                                {show ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                            </button>
                            <button onClick={handleDeleteSpell} className="btn btn-outline btn-circle btn-error btn-xs ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>nbfgt
                    </div>
                    {show && <div className="transition-all duration-75">
                        <h4 className="text-left mb-3">{level} {school}</h4>
                        <p className="text-justify md:text-md text-sm mb-3 ">{desc}</p>
                        {higher_level && <p className="text-justify md:text-md text-sm"><span className="font-bold italic">At higher levels. </span>{`${higher_level}`}</p>}
                        <section className="flex mt-3">
                            <div className="text-left w-1/2 md:text-md text-xs">
                                <p>Range: {range}</p>
                                <p>Components: {components}</p>
                                {material && <p>Materials needed: {material}</p>}
                                {ritual === "yes" && <p>Ritual Casting Allowed</p>}
                            </div>

                            <div className="text-left w-1/2 md:text-md text-xs">
                                <p>Casting time: {casting_time}</p>
                                <p>Duration: {duration}</p>
                            </div>
                        </section>
                    </div>}
                </div>
            </div>
        </div >
    )
}