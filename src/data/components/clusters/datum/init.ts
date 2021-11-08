import {ClusterDatum} from '../types/types';

export function cluster_init(id: any) {
    return {
        id,
        forces:       {electronegativity: -1},
        dragBehavior: {
            savePos: true,
        },
    } as ClusterDatum
}