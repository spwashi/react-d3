import {ClusterDatum} from '../types/types';
import _ from 'lodash';

export function cluster_init(other: Partial<ClusterDatum>) {
    const cluster =
              {
                  forces:       {electronegativity: -1},
                  dragBehavior: {savePos: true},

              } as ClusterDatum;
    _.merge(cluster, other);

    cluster.id                   = other.id ?? other.k ?? null;
    cluster.x                    = other.x;
    cluster.y                    = other.y;
    cluster.dragBehavior         = cluster.dragBehavior ?? {};
    cluster.dragBehavior.drag    = (event, d) => {
        const x = d._fx ?? event.x;
        const y = d._fy ?? event.y;
        d.x     = d.fx = x;
        d.y     = d.fy = y;
    }
    cluster.dragBehavior.release = (event, d) => {
        d.save?.(d);
    }

    return cluster
}