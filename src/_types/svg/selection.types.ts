import {BaseType, Selection} from 'd3';

export type SvgComponentSelection<S extends BaseType, D> = Selection<S, D, Element, unknown>
export type SvgSelection = Selection<SVGSVGElement, undefined, null, undefined>;