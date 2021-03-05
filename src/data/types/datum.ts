import {Index, Radius, X, Y} from '../data.types';

export type Datum =
    {
        color: string;

        x: X,
        y: Y,

        bound?: number,

        fx?: X,
        fy?: Y,

        _fx?: X,
        _fy?: Y,

        r: Radius,

        i?: Index,

        description?: { title?: string },
        dragBehavior?: { savePos?: boolean },
        radiusMultiplier?: number,

        reset?: () => void;
        log?: () => void;
    };