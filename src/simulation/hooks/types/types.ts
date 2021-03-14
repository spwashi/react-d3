import {DatumEdge} from '../../../data/data.types';
import {Datum} from '../../../data/types/datum';

export type SimulationData = { nodes: Datum[], edges: DatumEdge[] };
export type Style = {
    radius: number,
    colors?: number,
    animation?: 'random',
    radialDecay?: number
};