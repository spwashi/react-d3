import {NodeDatum} from '../../nodes/types/types';
import {SvgComponentSelection} from '../../../../types/svg';

export type EdgeDatum = {
    source: NodeDatum | any;
    target: NodeDatum | any;
    strength?: number;
}
export type D3EdgeSelection = SvgComponentSelection<SVGLineElement, EdgeDatum>;