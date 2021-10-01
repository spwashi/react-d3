import {ForceCallbackParams} from '../../types';
import {forceCollide} from 'd3';
import {NodeDatum} from '../../../../root/data/components/node.types';

export function collision({simulation}: ForceCallbackParams) {
    return simulation.force('collision', forceCollide<NodeDatum>().radius(d => d.r ?? 0));
}