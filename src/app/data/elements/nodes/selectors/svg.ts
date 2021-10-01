import {Selection} from 'd3';
import {getComponentWrapperClassname} from '../../../../../util/data/getComponentWrapperClassname';
import {NODE_COMPONENT_NAME} from '../constants';
import {NodeDatum, NodeDatumSelection} from '../../../../../root/data/components/node.types';
import {SvgSelection} from '../../../../../root/data/selection.types';


export type NodeWrapperSelection = Selection<SVGGElement, NodeDatum, any, any>;

export function svg_selectNodes(svg: SvgSelection): NodeWrapperSelection {
    return svg.select('g.' + getComponentWrapperClassname(NODE_COMPONENT_NAME))
              .selectAll('g');
}
export function svg_selectCircles(svg: SvgSelection) {
    return svg_selectNodes(svg)
        .selectAll('circle') as NodeDatumSelection;
}
