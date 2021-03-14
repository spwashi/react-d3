import {Index, Radius, X, Y} from '../data.types';
import {D3DragEvent} from 'd3';

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
        dragBehavior?: {
            savePos?: boolean;
            drag?: (event: D3DragEvent<any, any, any>, d: Datum) => void
            release?: (event: D3DragEvent<any, any, any>, d: Datum) => void
        },
        radiusMultiplier?: number,

        forces?: {
            electronegativity?: number;
            boundary?: {
                smallest?: { x?: () => void, y?: () => void },
                largest?: { x?: () => void, y?: () => void }
            }
        },

        reset?: () => void;
        click?: (event?: MouseEvent | any) => void;
    };