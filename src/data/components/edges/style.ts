import {d_selectColor, d_selectSourceX, d_selectSourceY, d_selectStrokeWidth, d_selectTargetX, d_selectTargetY, Edge} from './selectors/datum';
import {Selection} from 'd3-selection';
import {BaseType} from 'd3';

export default function styleLines<A extends BaseType, B extends Edge, C extends BaseType, D>(lines: Selection<A, B, C, D>) {
    return lines
        .attr('stroke', d_selectColor)
        .attr('stroke-width', d_selectStrokeWidth)
        .attr('x1', d_selectSourceX)
        .attr('y1', d_selectSourceY)
        .attr('x2', d_selectTargetX)
        .attr('y2', d_selectTargetY);
}
