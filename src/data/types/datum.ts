import {Index, Radius, X, Y} from '../data.types';

export type Datum =
    {
        color: string;

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
        dragBehavior?: { savePos?: boolean },
        radiusMultiplier?: number,

        forces?: {
            boundary?: {
                smallest?: { x?: number, y?: number },
                largest?: { x?: number, y?: number }
            }
        },

        reset?: () => void;
        log?: () => void;
    };