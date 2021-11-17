import {BaseType, D3DragEvent} from 'd3';
import {SvgComponentSelection} from '../../../../types/svg';
import {ClusterDatum} from '../../clusters/types/types';

export type DatumDragBehavior = {
    locked?: boolean;
    drag?: (event: D3DragEvent<any, any, any>, d: NodeDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: NodeDatum) => void
    savePos?: boolean;
};

export type DatumForceConfiguration = {
    electronegativity?: number;
    inclination?: (d: NodeDatum) => void
};
export type X = number;
export type Y = number;
export type Id = number;
export type Radius = number;
export type NodeDatumSelection<T extends BaseType = SVGGElement> = SvgComponentSelection<T, NodeDatum>;
export type NodeDatum =
    {
        color?: string;

        r?: Radius,
        // radius multiplier
        _r?: Radius,

        // a number, usually based on position.
        k?: number;

        cluster?: ClusterDatum;

        x?: X,
        y?: Y,

        fx?: X,
        fy?: Y,

        vx?: X,
        vy?: Y,


        id?: Id,

        description?: { title?: string },

        forces?: DatumForceConfiguration,
        dragBehavior?: DatumDragBehavior,
    };