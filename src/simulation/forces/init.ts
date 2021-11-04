import {Simulation} from 'd3';
import {SimulationData} from '../../data/_types/data.types';
import {ForceConfiguration} from './types';
import {NodeDatum} from '../../data/components/nodes/_types/node.types';
import {EdgeDatum} from '../../data/components/edges/_types/edge.types';

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
    simulation.nodes(data.nodes ?? []);
    return config
        .forces
        .reduce(
            (simulation, force) =>
                force({config, data, simulation}),
            simulation,
        ).alphaDecay(0)
        .on('tick', tick)
        .alphaTarget(.9)
        .restart();
}