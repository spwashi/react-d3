import {BaseType, Selection} from 'd3';
import {Datum} from './types/datum';

export type DataCalculationPoint = {
    width?: number;
    height?: number;
    index: number;
    count?: number;
    steps?: number;

    scaledIndex?: number;

    radius?: number;
    radiusMultiplier?: number;

    theta?: number;
    thetaMultiplier?: number;
};

export type X = number;
export type Y = number;
export type Index = number;
export type Radius = number;
export type DatumEdge = {
    source: Datum;
    target: Datum;

    strength?: number;
}

export type SvgSelection = Selection<SVGSVGElement, undefined, null, undefined>;
export type SvgComponentSelection<S extends BaseType, D> = Selection<S, D, SVGGElement, unknown>
export type D3NodeSelection = SvgComponentSelection<SVGGElement, Datum>;
export type D3NodeLabelSelection = SvgComponentSelection<SVGCircleElement, Datum>;
export type D3EdgeSelection = SvgComponentSelection<SVGLineElement, DatumEdge>;

export interface DataSetter<D> {
    (svg: SvgSelection, data: D[]): void
}

export interface DataSelector<T> {
    (svg: SvgSelection): T
}