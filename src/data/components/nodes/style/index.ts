import {NodeDatumSelection} from '../types';
import {d_selectFill, d_selectRadius, d_selectX, d_selectY} from '../selectors/datum';

export default function styleNodes(selection: NodeDatumSelection) {
    return selection.attr('cx', d_selectX)
                    .attr('cy', d_selectY)
                    .attr('fill', d_selectFill)
                    .attr('r', d_selectRadius)
}