import {SimulationRoot} from './types';
import {ViewBox} from '../viz.types';

export function simulationRoot_componentManagers(root: SimulationRoot) {
}

/**
 * Simulation Width
 * @param offset
 */
export const offset_width  = (offset: ViewBox) => offset[2];
/**
 * Simulation Height
 * @param offset
 */
export const offset_height = (offset: ViewBox) => offset[3];

