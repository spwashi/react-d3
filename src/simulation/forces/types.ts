import {Simulation} from 'd3';
import {NodeDatum} from '../data/types/node';
import {SimulationData} from '../data/types';
import {EdgeDatum} from '../data/types/edge';

export interface ForceConfiguration {
    options: {
        center?: number;
        internal?: boolean;
        nodeCharge?: number;
        linkStrength?: number;
    };
    forces: Force[]
}

export interface ForceCallbackParams {
    config: ForceConfiguration;
    data: SimulationData;
    simulation: Simulation<NodeDatum, EdgeDatum>;
}

export type Force = (params: ForceCallbackParams) => Simulation<NodeDatum, undefined>;