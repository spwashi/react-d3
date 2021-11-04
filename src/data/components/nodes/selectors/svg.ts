import {Selection} from 'd3';
import {getComponentWrapperClassname} from '../../../util/getComponentWrapperClassname';
import {NODE_COMPONENT_NAME} from '../constants';
import {NodeDatum, NodeDatumSelection} from '../_types/node.types';
import {SvgSelection} from '../../../../_types/svg/selection.types';


export type NodeWrapperSelection = Selection<SVGGElement, NodeDatum, any, any>;

export function svg_selectNodes(svg: SvgSelection): NodeWrapperSelection {
    return svg.select('g.' + getComponentWrapperClassname(NODE_COMPONENT_NAME))
              .selectAll('g');
}
export function svg_selectCircles(svg: SvgSelection) {
    return svg_selectNodes(svg)
        .selectAll('circle') as NodeDatumSelection;
}
