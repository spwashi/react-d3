import {Selection} from 'd3';
import {SimulationData} from '../../../../simulation/data/types';
import {NodeDatum, NodeDatumSelection} from '../../../../simulation/data/types/node';
import {SimulationElement} from '../../../../simulation/types';
import {SvgSelection} from '../../../../simulation/data/types/selection';

const d_selectX      = (d: NodeDatum | undefined) => d?.x ?? 10;
const d_selectY      = (d: NodeDatum | undefined) => {
    // if(isNaN(<number>d?.y)) throw new Error();
    return d?.y ?? 10;
};
const d_selectRadius = (d: NodeDatum | undefined) => d?.r || 1;

function tick(svg: SvgSelection) {
    (svg
        .select('g.nodes')
        .selectAll('g').selectAll('circle') as NodeDatumSelection)
        .attr('cx', (d) => d_selectX(d as NodeDatum))
        .attr('cy', (d) => d_selectY(d as NodeDatum))
        .attr('r', ((d) => d_selectRadius(d as NodeDatum) || 10))
}


type NodeWrapperSelection = Selection<SVGGElement, NodeDatum, any, any>;
function update(svg: SvgSelection, data: SimulationData) {
    if (!data.nodes) return;
    const nodes = svg.select('g.nodes').selectAll('g');

    // @ts-ignore
    const wrapperData = (nodes as NodeWrapperSelection).data(data.nodes, d => d.id);
    const wrapperExit = wrapperData.exit();
    wrapperExit.remove();
    const wrapperEnter = wrapperData.enter()
                                    .append('g')
                                    .classed('node-wrapper', true)
                                    .attr('data-nodeID', d => `${d.id}`);
    wrapperEnter.append('circle')
                .attr('cx', (d) => d_selectX(d as NodeDatum))
                .attr('r', ((d) => d_selectRadius(d as NodeDatum) || 10))
                .attr('cy', (d) => d_selectY(d as NodeDatum))
                .attr('fill', d => (d as NodeDatum).color ?? '#ffffff');
    nodes.exit().remove();
}

export const nodes = () => ({update, tick} as SimulationElement<NodeDatumSelection>);