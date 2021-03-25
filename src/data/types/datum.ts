import {Index, Radius, X, Y} from '../data.types';
import {D3DragEvent} from 'd3';

export type DatumDragBehavior = {
    savePos?: boolean;
    drag?: (event: D3DragEvent<any, any, any>, d: Datum) => void
    release?: (event: D3DragEvent<any, any, any>, d: Datum) => void
};
export type DatumForceConfiguration = {
    electronegativity?: number;
    boundary?:  () => void
};
export type Datum =
    {
        color?: string;
        stroke?: string;

        x: X,
        y: Y,

        bound?: number,

        fx?: X,
        fy?: Y,

        vx?: X,
        vy?: Y,

        _fx?: X,
        _fy?: Y,

        r: Radius,

        i?: Index,

        description?: { title?: string },

        forces?: DatumForceConfiguration,
        dragBehavior?: DatumDragBehavior,


        reset?: () => void;
        click?: (event?: MouseEvent | any) => void;
    };