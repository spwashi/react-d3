import {BaseType, Selection} from 'd3';

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
export type LinkDefinition = {
    source: DatumPrimaryKey;
    target: DatumPrimaryKey;
}
export type Link = {
    source: Datum;
    target: Datum;
}
export type Links = Link[];

export type DatumPrimaryKey = number;

export type Datum =
    {
        x: X,
        y: Y,
        fx?: X,
        fy?: Y,
        r: Radius,
        i?: Index,
        description?: {
            title?: string
        },
        radiusMultiplier?: number
    };
export type SvgSelection = Selection<SVGSVGElement, undefined, null, undefined>;
export type SvgCircleGSelection = Selection<SVGGElement, Datum, SVGSVGElement, undefined>;
export type SvgLineGSelection = Selection<SVGGElement, Link, SVGSVGElement, undefined>;

export type SvgComponentSelection<S extends BaseType, D> = Selection<S, undefined, SVGGElement, D>

export type SvgCircleSelection = SvgComponentSelection<SVGCircleElement, Datum>;
export type SvgLineSelection = SvgComponentSelection<SVGLineElement, LinkDefinition>;

export interface DataSetter<D, T> {
    (svg: Selection<any, any, any, any>, data: D[]): T | undefined
}

export interface CircleDataSetter extends DataSetter<Datum, SvgCircleSelection> {}

export interface LinkDataSetter extends DataSetter<LinkDefinition, SvgLineSelection> {}

export interface DataSelector<T> {
    (svg: SvgSelection): T
}