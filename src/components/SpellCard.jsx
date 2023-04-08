import { useSortable } from "@dnd-kit/sortable"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'

export default function SpellCard({ spellInfo, id, handleDeleteSpell }) {
    let { desc, name, range, components, concentration,
        duration, higher_level, level, material,
        ritual, school, casting_time } = spellInfo

    const {
        attributes, listeners, setNodeRef, transform,
        // transition
    } = useDraggable({ id: id })

    // const {
    //     attributes, listeners, setNodeRef, transform,
    //     transition
    // } = useSortable({ id: id })

    const style = {
        transform: CSS.Transform.toString(transform),
        // transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
            className="mx-2 border-2 mb-2 border-black p-3 max-w-4xl shadow-xl rounded-md bg-white"
        >
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h2 className="md:text-3xl text-xl font-semibold tracking-wide text-left">{name && name}
                            <span className="inline-block text-xl font-thin ml-5">{concentration === 'yes' && "C"}</span></h2>
                        <button onClick={handleDeleteSpell} className="btn btn-outline btn-circle btn-error btn-sm ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <h4 className="text-left">{level} {school}</h4>
                    <p className="text-justify md:text-md text-sm">{desc}</p>
                    {higher_level && <p className="text-justify md:text-md text-sm"><span className="font-bold italic">At higher levels. </span>{`${higher_level}`}</p>}
                    <section className="flex ">
                        <div className="text-left w-1/2 md:text-md text-xs">
                            <p>Range: {range}</p>
                            <p>Components: {components}</p>
                            {material && <p>Materials needed: {material}</p>}
                            {ritual === "yes" && <p>Ritual</p>}
                        </div>

                        <div className="text-left w-1/2 md:text-md text-xs">
                            <p>Casting time: {casting_time}</p>
                            <p>Duration: {duration}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}