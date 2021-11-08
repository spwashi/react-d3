import {NodeDatum} from '../../nodes/types/types';
import {EdgeDatum} from '../types/types';

export type Edge = EdgeDatum & {
    source: NodeDatum;
    target: NodeDatum;
    strength?: number;
    width?: number;
};

export const edge_selectSourceX     = (l: Edge) => l.source?.x ?? 0;
export const edge_selectSourceY     = (l: Edge) => l.source?.y ?? 0;
export const edge_selectTargetX     = (l: Edge) => l.target?.x ?? 0;
export const edge_selectTargetY     = (l: Edge) => l.target?.y ?? 0;
export const edge_selectStrokeWidth = (l: Edge) => `${(l.width ?? 0) ? l.width : ((l.strength ?? .1) * 7)}px`;
export const edge_selectColor       = (l: Edge) => l.source.color ?? '#ffffff';