import {SimulationData} from '../../../../root/data/data.types';
import {ValueFn} from 'd3';
import {SimulationElement} from '../../../../root/simulation/simulation.types';
import {NodeDatum} from '../../../../root/data/components/node.types';
import {D3EdgeSelection} from '../../../../root/data/components/edge.types';
import {SvgSelection} from '../../../../root/data/selection.types';
import {EDGE_COMPONENT_NAME} from './constants';
import {svg_selectEdgeLines, svg_selectEdges} from './selectors/svg';

type L = { source: NodeDatum, target: NodeDatum, strength?: number, width?: number };
type GenericValueFn = ValueFn<any, any, any>;

function update(svg: SvgSelection, data: SimulationData) {
    if (!data.edges) return;
    const edges       = svg_selectEdges(svg);
    const wrapperData = edges.data(data.edges ?? [],
                                   d => `${d.source.id} ${d.target.id}`);
    wrapperData.exit()
               .remove();
    wrapperData.enter()
               .append('g')
               .classed('edge-wrapper', true)
        //
               .append('line')
               .attr('stroke', l => l.source.color)
               .attr('stroke-width', ((l: L) => `${(l.width ?? 0) ? l.width : ((l.strength ?? .1) * 7)}px`) as GenericValueFn)
               .attr('x1', ((l: L) => (l.source?.x)) as GenericValueFn)
               .attr('y1', ((l: L) => l.source?.y) as GenericValueFn)
               .attr('x2', ((l: L) => l.target?.x) as GenericValueFn)
               .attr('y2', ((l: L) => l.target?.y) as GenericValueFn);
}

export function edges(): SimulationElement<D3EdgeSelection> {
    return {
        name: EDGE_COMPONENT_NAME,
        update,
        tick,
    };
}
function tick(svg: SvgSelection) {
    svg_selectEdgeLines(svg)
        .attr('x1', ((l: L) => (l.source?.x)) as GenericValueFn)
        .attr('y1', ((l: L) => l.source?.y) as GenericValueFn)
        .attr('x2', ((l: L) => l.target?.x) as GenericValueFn)
        .attr('stroke-width', ((l: L) => `${l.width ?? 0 ? l.width : ((l.strength ?? .1) * 7)}px`) as GenericValueFn)
        .attr('y2', ((l: L) => l.target?.y) as GenericValueFn);
}
