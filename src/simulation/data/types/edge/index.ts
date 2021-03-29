import {NodeDatum} from '../node';
import {SvgComponentSelection} from '../selection';

export type EdgeDatum = {
    source: NodeDatum | any;
    target: NodeDatum | any;
    strength?: number;
}
export type D3EdgeSelection = SvgComponentSelection<SVGLineElement, EdgeDatum>;