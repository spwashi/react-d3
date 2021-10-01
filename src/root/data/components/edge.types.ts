import {NodeDatum} from './node.types';
import {SvgComponentSelection} from '../selection.types';

export type EdgeDatum = {
    source: NodeDatum | any;
    target: NodeDatum | any;
    strength?: number;
}
export type D3EdgeSelection = SvgComponentSelection<SVGLineElement, EdgeDatum>;