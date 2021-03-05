import {SimulationData} from '../types';
import {ForceConfiguration} from '../../../hooks/useSimulation.types';
import {D3EdgeSelection, SvgSelection} from '../../../data/data.types';
import {ValueFn} from 'd3';
import {ComponentManager} from '../../../hooks/simulation.types';
import {Datum} from '../../../data/types/datum';

export function initEdges(information: SimulationData, forces?: ForceConfiguration): ComponentManager<D3EdgeSelection> {
    type L = { source: Datum, target: Datum };
    type GenericValueFn = ValueFn<any, any, any>;
    return {
        data: information.edges,
        setData(svg, data) { this.selection(svg).data(data); },
        format(svg) {
            const links = this.selection(svg);
            links?.enter().append('line');
            links?.attr('stroke', '#cccccc')
                 .attr('stroke-width', (10 * Math.abs((forces?.nodeLinkStrength || .1))) + 'px')
                 .attr('x1', ((l: L) => (l.source?.x)) as GenericValueFn)
                 .attr('y1', ((l: L) => l.source?.y) as GenericValueFn)
                 .attr('x2', ((l: L) => l.target?.x) as GenericValueFn)
                 .attr('y2', ((l: L) => l.target?.y) as GenericValueFn);
        },
        selection(svg: SvgSelection) { return svg.select('g.edges').selectAll('line') as unknown as D3EdgeSelection; },
        initComponent(svg: SvgSelection) {
            const lines =
                      svg.append('g')
                         .attr('class', 'edges')
                         .selectAll('line')
                         .data(information.edges)
                         .join('line');
            const links = this.selection(svg);
            this.setData(svg, information.edges);
            if (links) this.format(svg);
        },
    };
}