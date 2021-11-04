import {NodeDatum} from '../types';

export const d_selectX      = (d: NodeDatum | undefined) => !isNaN(d?.x ?? 10) ? d?.x ?? 10 : 10;
export const d_selectY      = (d: NodeDatum | undefined) => !isNaN(d?.fy ?? d?.y ?? 10) ? d?.fy ?? d?.y ?? 10 : 10;
export const d_selectRadius = (d: NodeDatum | undefined) => !isNaN(d?.r ?? 10) ? Math.max(d?.r ?? 1, 0) : 10;
export const d_selectFill   = (d: NodeDatum | undefined) => Math.random() > .95 && ((d?.id ?? 0) % 7) ? ('#42a5c3') : (d as NodeDatum).color ?? '#ffffff';
