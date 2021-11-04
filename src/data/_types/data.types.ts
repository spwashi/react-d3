import {NodeDatum} from '../components/nodes/_types/node.types';
import {EdgeDatum} from '../components/edges/_types/edge.types';

/**
 * SimulationData about the simulation Data represented by the simulation
 */
export type SimulationData = {
    nodes?: NodeDatum[] | undefined;
    edges?: EdgeDatum[] | undefined;
};