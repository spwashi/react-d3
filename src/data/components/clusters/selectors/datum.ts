import {ClusterDatum} from '../types';

export const cluster_selectX      = (d: ClusterDatum | undefined) => !isNaN(d?.fx ?? d?.x ?? 10) ? d?.fx ?? d?.x ?? 10 : 10;
export const cluster_selectY      = (d: ClusterDatum | undefined) => !isNaN(d?.fy ?? d?.y ?? 10) ? d?.fy ?? d?.y ?? 10 : 10;
export const cluster_selectRadius = (d: ClusterDatum | undefined) => !isNaN(d?.r ?? 10) ? Math.max(d?.r ?? 1, 0) : 10;
export const cluster_selectFill   = (d: ClusterDatum | undefined) => {
    const e = d?.forces?.electronegativity ?? 0;
    return 'rgba(' + (e >= 0 ? '0,0,0' : '255,255,255') + ',' + Math.abs(e / 100) + ')';
};
function correct(d: ClusterDatum, target: number, n: number) {
    const diff             = n - target;
    const correctiveFactor = ((d.forces?.electronegativity ?? 0));
    const shouldRepel      = correctiveFactor < 0;
    const distance         = (d.r ?? 1) * 1.2;
    const isWrongDistance  = Math.abs(diff) > distance;

    const same = ((n || 1) / (target || 1)) > 0;

    if (!isWrongDistance) return n;

    return target;

}
export const cluster_selectXCorrection =
                 (d: ClusterDatum | undefined, n: number) => {
                     if (!d) return n;
                     return correct(d, d.x ?? 0, n);
                 };
export const cluster_selectYCorrection =
                 (d: ClusterDatum | undefined, n: number) => {
                     if (!d) return n;
                     return correct(d, d.y ?? 0, n);
                 };
