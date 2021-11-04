import {BaseType, D3DragEvent, D3ZoomEvent} from 'd3';
import {SvgComponentSelection} from '../../../types/svg';
import {NodeDatum} from '../nodes/types';

export type DatumDragBehavior = {
    locked?: boolean;
    drag?: (event: D3DragEvent<any, any, any>, d: ClusterDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: ClusterDatum) => void
    savePos?: boolean;
};
export type DatumScrollBehavior = {
    savePos?: boolean;
    scroll?: (event: D3ZoomEvent<any, any>, d: ClusterDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: ClusterDatum) => void
};

export type DatumForceConfiguration = {
    electronegativity?: number;
    inclination?: () => void
};
export type X = number;
export type Y = number;
export type Id = number;
export type Radius = number;
export type ClusterDatumSelection<T extends BaseType = SVGGElement> = SvgComponentSelection<T, ClusterDatum>;
export type ClusterDatum =
    {
        nodes?: Set<NodeDatum>;
        color?: string;
        stroke?: string;

        r?: Radius,
        x?: X,
        y?: Y,

        bound?: number,

        fx?: X,
        fy?: Y,

        vx?: X,
        vy?: Y,

        _fx?: X,
        _fy?: Y,


        id?: Id,

        description?: { title?: string },

        forces?: DatumForceConfiguration,
        dragBehavior?: DatumDragBehavior,
        scrollBehavior?: DatumScrollBehavior,


        reset?: () => void;
        click?: (event?: MouseEvent | any) => void;

        [k:string]: any;
    };