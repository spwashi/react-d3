import {ForceCallbackParams} from '../../types';
import {forceCenter} from 'd3';

export function center({config, simulation}: ForceCallbackParams) {
    return simulation.force('center', forceCenter().strength((config.options.center ?? 1)));
}