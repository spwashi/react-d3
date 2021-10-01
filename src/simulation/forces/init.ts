import {forceSimulation} from 'd3';
import {defaultTick} from './default/tick';
import {SimulationData} from '../../root/data/data.types';
import {ForceConfiguration} from './types';

interface Params {
    config: ForceConfiguration | undefined;
    data: SimulationData;
    tick: any;
}

export function initSimulation({config, data, tick: lTick = defaultTick}: Params) {
    if (!config) return;
    const forces = config.forces;
    const sim    = forces.reduce((simulation, force) => force({config, data, simulation}),
                                 forceSimulation(data.nodes),
    );
    return sim.alphaDecay(0)
              .on('tick', lTick)
              .alphaTarget(.9)
              .restart();
}