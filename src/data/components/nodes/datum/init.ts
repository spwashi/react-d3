import {NodeDatum} from '../types/types';
import {interpolateBlues} from 'd3';
import {cluster_correctNode} from '../../clusters/selectors/datum';

export function node_init(id: number): NodeDatum {
    return {
        id,
        dragBehavior: {savePos: true},
        forces:       {
            inclination(d) {
                const top = window as any;
                !top.l && console.log(d);
                top.l = 100
                cluster_correctNode(d.cluster, d);
            },
        },
    };
}

export function node_colorInit(node: NodeDatum, interpolator = interpolateBlues) {
    return interpolator(1 - ((node.k ?? 0) / (node.NODE_COUNT ?? 1))) ?? '#ffffff'
}