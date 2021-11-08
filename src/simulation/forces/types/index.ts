import {Simulation} from 'd3';
import {NodeDatum} from '../../../data/components/nodes/types/types';
import {SimulationData} from '../../../data/types';
import {EdgeDatum} from '../../../data/components/edges/types/types';

type NumberRange = { max: number, min: number };

export type BoundingForceConfig = {
    width: number;
    height: number;
    x: NumberRange,
    y: NumberRange,
    option: number
};

export interface ForceConfiguration {
    options: {
        center?: number;
        internal?: boolean;
        nodeCharge?: number;
        edgeStrength?: number;
        velocityDecay?: number;
        bounding?: BoundingForceConfig
    };
    forces: Force[]
}

export interface ForceCallbackParams {
    config: ForceConfiguration;
    data: SimulationData;
    simulation: Simulation<NodeDatum, EdgeDatum>;
}

export type Force = (params: ForceCallbackParams) => Simulation<NodeDatum, undefined>;