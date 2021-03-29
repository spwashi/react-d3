import {ForceCallbackParams} from '../../types';
import {forceLink} from 'd3';
import {NodeDatum} from '../../../data/types/node';
import {EdgeDatum} from '../../../data/types/edge';

export function edgeForces({config, data, simulation}: ForceCallbackParams) {
    {
        const nodeLinkStrength = config.options.linkStrength;
        if (nodeLinkStrength && data.edges) {
            simulation = simulation.force('link',
                                          forceLink<NodeDatum, EdgeDatum>()
                                              .links(data.edges)
                                              .id(d => d.id ?? '')
                                              .strength((link) => (((link as EdgeDatum).strength ?? 1) * nodeLinkStrength)));

        }
    }
    return simulation;
}