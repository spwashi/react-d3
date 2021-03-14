import {SimulationRoot} from '../hooks/simulation.types';
import {ViewBox} from '../viz.types';

export function simulationRoot_componentManagers(root: SimulationRoot) {
    const [edges, nodes] = root.componentManagers;
    return {edges, nodes};
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

