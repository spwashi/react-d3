import {NodeDatum} from '../../../../../root/data/components/node.types';

export const d_selectX      = (d: NodeDatum | undefined) => d?.x ?? 10;
export const d_selectY      = (d: NodeDatum | undefined) => {
    return d?.fy ?? d?.y ?? 10;
};
export const d_selectRadius = (d: NodeDatum | undefined) => d?.r || 1;