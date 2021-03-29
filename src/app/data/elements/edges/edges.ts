import {SimulationData} from '../../../../simulation/data/types';
import {ValueFn} from 'd3';
import {SimulationElement} from '../../../../simulation/types';
import {NodeDatum} from '../../../../simulation/data/types/node';
import {D3EdgeSelection} from '../../../../simulation/data/types/edge';
import {SvgSelection} from '../../../../simulation/data/types/selection';

const svg_selectEdges = (svg: SvgSelection) => (svg.select('g.edges').selectAll('line') as unknown as D3EdgeSelection);

export function edges(): SimulationElement<D3EdgeSelection> {
    type L = { source: NodeDatum, target: NodeDatum };
    type GenericValueFn = ValueFn<any, any, any>;
    return {
        update(svg: SvgSelection, data: SimulationData) {
            const edges = svg.select('g.edges')
                             .selectAll('g');
            edges
                .selectAll('line')
                .data(data.edges ?? [])
                .join('line')
                .attr('stroke', '#cccccc')
                .attr('stroke-width', `4px`);
        },
        tick(svg) {
            svg_selectEdges(svg)
                .attr('x1', ((l: L) => (l.source?.x)) as GenericValueFn)
                .attr('y1', ((l: L) => l.source?.y) as GenericValueFn)
                .attr('x2', ((l: L) => l.target?.x) as GenericValueFn)
                .attr('y2', ((l: L) => l.target?.y) as GenericValueFn);
        },
    };
}