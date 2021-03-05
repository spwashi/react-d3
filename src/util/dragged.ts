import {D3DragEvent} from 'd3'
import {Datum} from '../data/types/datum';

/**
 * Yields a function that updates nodes and edges
 * @param event
 * @param d
 */
export function dragged(this: Element, event: D3DragEvent<any, any, any>, d: Datum) {
    const x = d._fx ?? event.x;
    const y = d._fy ?? event.y;
    console.clear();
    console.log(event);
    if (event.sourceEvent?.shiftKey) {
        d.x = x;
        d.y = y;
    } else {
        d.fx = x;
        d.fy = y;
    }
}

