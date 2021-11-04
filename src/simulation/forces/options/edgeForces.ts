import {ForceCallbackParams} from '../types';
import {forceLink} from 'd3';
import {NodeDatum} from '../../../data/components/nodes/_types/node.types';
import {EdgeDatum} from '../../../data/components/edges/_types/edge.types';

export function edgeForces({config, data, simulation}: ForceCallbackParams) {
    {
        const nodeLinkStrength = config.options.edgeStrength;
        if (nodeLinkStrength && data.edges) {
            simulation = simulation.force('link',
                                          forceLink<NodeDatum, EdgeDatum>()
                                              .links(data.edges)
                                              .id(d => d.id ?? '')
                                              .strength((link) => (((link as EdgeDatum).strength ?? 1) * nodeLinkStrength / 2000)));

        }
    }
    return simulation;
}