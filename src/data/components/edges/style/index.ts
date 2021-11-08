import {edge_selectColor, edge_selectSourceX, edge_selectSourceY, edge_selectStrokeWidth, edge_selectTargetX, edge_selectTargetY, Edge} from '../selectors/datum';
import {Selection} from 'd3-selection';
import {BaseType} from 'd3';

export default function styleLines<A extends BaseType, B extends Edge, C extends BaseType, D>(lines: Selection<A, B, C, D>) {
    return lines
        .attr('stroke', edge_selectColor)
        .attr('stroke-width', edge_selectStrokeWidth)
        .attr('x1', edge_selectSourceX)
        .attr('y1', edge_selectSourceY)
        .attr('x2', edge_selectTargetX)
        .attr('y2', edge_selectTargetY);
}
