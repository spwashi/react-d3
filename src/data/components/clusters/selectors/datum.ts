import {ClusterDatum} from '../types/types';
import {NodeDatum} from '../../nodes/types/types';

export const cluster_selectX      = (d: ClusterDatum | undefined) => !isNaN(d?.fx ?? d?.x ?? 10) ? d?.fx ?? d?.x ?? 10 : 10;
export const cluster_selectY      = (d: ClusterDatum | undefined) => !isNaN(d?.fy ?? d?.y ?? 10) ? d?.fy ?? d?.y ?? 10 : 10;
export const cluster_selectRadius = (d: ClusterDatum | undefined) => !isNaN(d?.r ?? 10) ? Math.max(
    400,
    Math.max(
        4000,
        (d?.r ?? 1),
    ) * Math.abs((d?.forces?.electronegativity ?? -1)),
) : 100;
export const cluster_selectFill   = (d: ClusterDatum | undefined) => {
    const e = d?.forces?.electronegativity ?? 0;
    return 'rgba(' + (e >= 0 ? '0,0,0' : '255,255,255') + ',' + Math.abs(e / 10) + ')';
};
export const cluster_correctNode  =
                 (cluster: ClusterDatum | undefined, d: NodeDatum) => {
                     d.x = d.x ?? 0;
                     d.r = d.r ?? 0;
                     d.y = d.y ?? 0;
                     if (!cluster) return;

                     cluster.r = cluster.r ?? 0;
                     cluster.x = cluster.fx ?? 0;
                     cluster.y = cluster.fy ?? 0;

                     const diffX = (cluster.x ?? 0) - d.x;
                     const diffY = (cluster.y ?? 0) - d.y;

                     const charge = (cluster.forces?.electronegativity ?? 0);
                     if (charge === 0) return;
                     const chargeSign = charge > 0 ? 1 : -1;
                     const maxDist    = Math.max(1, (cluster.r + d.r) * -charge);

                     const multiplier = 10;
                     if (chargeSign < 0) {
                         const m = -charge * multiplier;
                         if (Math.abs(diffX) > Math.abs(maxDist)) {
                             d.x = d.x + (diffX / maxDist) * m;
                         }
                         if (Math.abs(diffY) > Math.abs(maxDist)) {
                             d.y = d.y + (diffY / maxDist) * m;
                         }
                     } else {
                         const m = -charge * multiplier;
                         if (Math.abs(diffX) < Math.abs(maxDist)) {
                             d.x = d.x - (diffX / maxDist) * m
                         }
                         if (Math.abs(diffY) < Math.abs(maxDist)) {
                             d.y = d.y - (diffY / maxDist) * m;
                         }
                     }
                 };
