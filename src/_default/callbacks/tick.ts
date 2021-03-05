import {SimulationRoot} from '../../hooks/simulation.types';
import {simulationRoot_componentManagers} from '../selectors';
import {D3EdgeSelection, D3NodeSelection} from '../../data/data.types';
import {drag as d3drag} from 'd3';
import {dragged} from '../../util/dragged';
import {_Simulation} from '../types';
import {SimulationData} from '../hooks/types';

export function tick(root: SimulationRoot, data: SimulationData, simulation: _Simulation) {
    /* initialize components */
    const {edges, nodes} = simulationRoot_componentManagers(root);

    let edgeSelection: D3EdgeSelection | undefined;
    const svg = root.svg;
    if (svg && data.edges) {
        edges.setData(svg, edges.data);
        edgeSelection = edges.selection(svg);
    }

    let nodeSelection: D3NodeSelection | undefined;
    if (svg && data.nodes) {
        nodes.setData(svg, nodes.data);
        nodeSelection = nodes.selection(svg);
    }

    let textSelection;
    if (nodeSelection) textSelection = nodeSelection.selectAll('text');

    // remove components
    {
        textSelection?.exit().remove();
        edgeSelection?.exit().remove();
        nodeSelection?.exit().remove();
    }

    // update components
    {
        edges.format(svg);
        // @ts-ignore
        const drag = d3drag().on('drag', dragged);
        nodes.selection(svg).selectAll('.node-wrapper').call(drag);
        nodes.format(svg, simulation);
    }
}