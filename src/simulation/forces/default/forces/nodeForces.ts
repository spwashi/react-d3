import {ForceCallbackParams} from '../../types';
import {forceManyBody} from 'd3';
import {NodeDatum} from '../../../data/types/node';

export function nodeForces({config, simulation}: ForceCallbackParams) {
    {
        const nodeForceStrength = config.options.nodeCharge || 0;
        if (nodeForceStrength) {
            simulation = simulation
                .force('charge', forceManyBody<NodeDatum>()
                    .strength((d: NodeDatum) => (d?.forces?.electronegativity ?? 1) * nodeForceStrength));
        }
    }
    return simulation;
}