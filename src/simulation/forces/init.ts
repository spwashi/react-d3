import {Simulation} from 'd3';
import {SimulationData} from '../../data/types';
import {ForceConfiguration} from './types';
import {NodeDatum} from '../../data/components/nodes/types/types';
import {EdgeDatum} from '../../data/components/edges/types/types';

interface Params {
    config: ForceConfiguration | undefined;
    data: SimulationData;
    tick: any;
}

export function initSimulation(
    simulation: Simulation<NodeDatum, EdgeDatum>,
    {config, data, tick}: Params,
) {
    if (!config) return;
    simulation.stop();
    simulation.nodes(data.nodes ?? []);
    simulation = config
        .forces
        .reduce(
            (simulation, force) =>
                force({config, data, simulation}),
            simulation,
        )
        .on('tick', tick);

    simulation.restart();

    return simulation;
}