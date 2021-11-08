import {BaseType, D3DragEvent} from 'd3';
import {SvgComponentSelection} from '../../../../types/svg';
import {NodeDatum} from '../../nodes/types/types';

type DatumDragBehavior = {
    locked?: boolean;
    drag?: (event: D3DragEvent<any, any, any>, d: ClusterDatum) => void
    release?: (event: D3DragEvent<any, any, any>, d: ClusterDatum) => void
    savePos?: boolean;
};
type DatumForceConfiguration = {
    electronegativity?: number;
    inclination?: () => void
};
type X = number;
type Y = number;
type Id = number;
type Radius = number;
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

        reset?: () => void;
        click?: (event?: MouseEvent | any) => void;

        [k: string]: any;
    };