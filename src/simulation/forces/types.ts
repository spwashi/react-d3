import {Simulation} from 'd3';
import {NodeDatum} from '../../root/data/components/node.types';
import {SimulationData} from '../../root/data/data.types';
import {EdgeDatum} from '../../root/data/components/edge.types';

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