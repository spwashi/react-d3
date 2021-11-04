import {BaseType, D3DragEvent, D3ZoomEvent} from 'd3';
import {SvgComponentSelection} from '../../../../_types/svg/selection.types';

export type DatumDragBehavior = {
    locked?: boolean;
    drag?: (event: D3DragEvent<any, any, any>, d: NodeDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: NodeDatum) => void
    savePos?: boolean;
};
export type DatumScrollBehavior = {
    savePos?: boolean;
    scroll?: (event: D3ZoomEvent<any, any>, d: NodeDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: NodeDatum) => void
};

export type DatumForceConfiguration = {
    electronegativity?: number;
    inclination?: () => void
};
export type X = number;
export type Y = number;
export type Id = number;
export type Radius = number;
export type NodeDatumSelection<T extends BaseType = SVGGElement> = SvgComponentSelection<T, NodeDatum>;
export type NodeDatum =
    {
        color?: string;
        stroke?: string;

        x?: X,
        y?: Y,

        bound?: number,

        fx?: X,
        fy?: Y,

        vx?: X,
        vy?: Y,

        _fx?: X,
        _fy?: Y,

        r?: Radius,

        id?: Id,

        description?: { title?: string },

        forces?: DatumForceConfiguration,
        dragBehavior?: DatumDragBehavior,
        scrollBehavior?: DatumScrollBehavior,


        reset?: () => void;
        click?: (event?: MouseEvent | any) => void;
    };