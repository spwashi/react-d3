import {ForceCallbackParams} from '../../types';
import {forceCollide} from 'd3';
import {NodeDatum} from '../../../data/types/node';

export function collision({simulation}: ForceCallbackParams) {
    return simulation.force('collision', forceCollide<NodeDatum>().radius(d => d.r ?? 0));
}