import {NodeDatum} from '../../nodes/types';

export type Edge = {
    source: NodeDatum;
    target: NodeDatum;
    strength?: number;
    width?: number;
};

export const d_selectSourceX     = (l: Edge) => l.source?.x ?? 0;
export const d_selectSourceY     = (l: Edge) => l.source?.y ?? 0;
export const d_selectTargetX     = (l: Edge) => l.target?.x ?? 0;
export const d_selectTargetY     = (l: Edge) => l.target?.y ?? 0;
export const d_selectStrokeWidth = (l: Edge) => `${(l.width ?? 0) ? l.width : ((l.strength ?? .1) * 7)}px`;
export const d_selectColor       = (l: Edge) => l.source.color ?? '#ffffff';