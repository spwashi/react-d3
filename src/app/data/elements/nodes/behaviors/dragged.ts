import {D3DragEvent} from 'd3'
import {NodeDatum} from '../../../../../simulation/data/types/node';

/**
 * Yields a function that updates nodes and edges
 * @param event
 * @param d
 */
export function dragged(this: Element, event: D3DragEvent<any, any, any>, d: NodeDatum) {
    const drag = d?.dragBehavior?.drag;
    if(drag) return drag(event, d);

    const x = d._fx ?? event.x;
    const y = d._fy ?? event.y;

    d.fx = x;
    d.fy = y;
}

