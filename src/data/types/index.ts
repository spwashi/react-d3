import {NodeDatum} from '../components/nodes/types/types';
import {EdgeDatum} from '../components/edges/types/types';
import {ClusterDatum} from '../components/clusters/types/types';

/**
 * SimulationData about the simulation Data represented by the simulation
 */
export type SimulationData = {
    nodes?: NodeDatum[] | undefined;
    edges?: EdgeDatum[] | undefined;
    clusters?: ClusterDatum[] | undefined
};