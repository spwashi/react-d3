import * as d3 from 'd3';
import {ValueFn} from 'd3';
import {Datum, Link, SvgLineSelection} from './data.types';

/**
 * It puts the values in the d3
 */
type GenericValueFn = ValueFn<any, any, any>;

/**
 * Return a function that returns "false" when a link is not relevant
 * @param d
 */
const getFn_filterIrrelevantLinks = (d: Datum) => function (l: Link) { return l?.source === d; }

/**
 * Yields a function that updates nodes and links
 * @param simulation
 * @param lineSelection
 */
export function getFn_updateLinkLineElementWhenDragged(simulation: d3.Simulation<any, any>,
                                                       lineSelection: SvgLineSelection) {

    function dragged(this: Element, event: DragEvent, d: Datum) {
        // "fix" the node's position once dragged -- (make it static)
        {
            d.fx = event.x;
            d.fy = event.y;
        }

        // update the layout of the links
        {
            const filter = getFn_filterIrrelevantLinks(d) as GenericValueFn;
            lineSelection
                .filter(filter)
                .attr('x1', d.x).attr('x2', d.x)
                .attr('y1', d.y).attr('y2', d.y);
        }
    }

    return dragged;
}