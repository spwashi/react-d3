import {ForceCallbackParams} from '../types';
import {forceCollide} from 'd3';
import {NodeDatum} from '../../../data/components/nodes/types/types';

export function collision({simulation}: ForceCallbackParams) {
    const force = forceCollide<NodeDatum>().radius(d => d.r ?? 0);
    return simulation.force('collision', force);
}