import {NodeDatum} from '../components/nodes/types';
import {EdgeDatum} from '../components/edges/types';
import {ClusterDatum} from '../components/clusters/types';

/**
 * SimulationData about the simulation Data represented by the simulation
 */
export type SimulationData = {
    nodes?: NodeDatum[] | undefined;
    edges?: EdgeDatum[] | undefined;
    clusters?: ClusterDatum[] | undefined
};