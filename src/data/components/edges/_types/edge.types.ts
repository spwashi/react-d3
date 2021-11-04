import {NodeDatum} from '../../nodes/_types/node.types';
import {SvgComponentSelection} from '../../../../_types/svg/selection.types';

export type EdgeDatum = {
    source: NodeDatum | any;
    target: NodeDatum | any;
    strength?: number;
}
export type D3EdgeSelection = SvgComponentSelection<SVGLineElement, EdgeDatum>;