import {NodeDatum} from '../types/types';

export const node_selectX      = (d: NodeDatum | undefined) => !isNaN(d?.x ?? 10) ? d?.x ?? 10 : 10;
export const node_selectY      = (d: NodeDatum | undefined) => !isNaN(d?.fy ?? d?.y ?? 10) ? d?.fy ?? d?.y ?? 10 : 10;
export const node_selectRadius = (d: NodeDatum | undefined) => !isNaN(d?.r ?? 10) ? Math.max(d?.r ?? 1, 0) : 10;
export const node_selectFill   = (d: NodeDatum | undefined) => (d as NodeDatum).color ?? '#ffffff';
