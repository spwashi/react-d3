import {NodeDatum} from './components/node.types';
import {EdgeDatum} from './components/edge.types';

export type DataCalculationPoint = {
    width?: number;
    height?: number;
    index: number;
    count?: number;
    steps?: number;

    scaledIndex?: number;

    radius?: number;
    radiusMultiplier?: number;

    theta?: number;
    thetaMultiplier?: number;
};

/**
 * SimulationData about the simulation Data represented by the simulation
 */
export type SimulationData = {
    nodes?: NodeDatum[] | undefined;
    edges?: EdgeDatum[] | undefined;
};