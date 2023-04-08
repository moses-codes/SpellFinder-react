import { useState } from 'react'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TestItem from './TestItem'

export default function Card() {

    const [items, setItems] = useState(["dog", "cat", "yarn", "ball"])

    function handleDragEnd() {
        console.log('ended')
    }
    return (
        <div>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>

                <div>Thing</div>
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}>

                    <ul>
                        {items.map(item => <TestItem key={item} id={item} name={item} />)}
                    </ul>

                </SortableContext>
            </DndContext>
        </div>
    )
}