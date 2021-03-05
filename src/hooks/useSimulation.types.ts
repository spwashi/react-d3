/**
 * Configuration for the forces in a simulation
 */
export interface ForceConfiguration {
    boundingBox?: boolean;
    nodeForceStrength: number;
    center?: number;
    nodeLinkStrength: number
}
