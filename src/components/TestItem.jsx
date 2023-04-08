import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

export default function TestItem(props) {
    const {
        attributes, listeners, setNodeRef, transform
    } = useDraggable({ id: props.id })
    const style = {
        transform: CSS.Transform.toString(transform),

    }
    return (<li ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <h1>{props.name}</h1>
    </li>)
}