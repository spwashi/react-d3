/**
 * Configuration for the forces in a simulation
 */
export interface ForceConfiguration {
    boundingBox?: boolean;
    nodeForceStrength: number;
    center?: number;
    nodeLinkStrength: number
}

/**
 * Describes 2 dimensions, X and Y
 */
export type NDimensionalTuple_2 = [number, number];