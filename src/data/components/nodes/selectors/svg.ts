import {Selection} from 'd3';
import {getComponentWrapperSelector} from '../../../util/getComponentWrapperClassname';
import {COMPONENT_NAME} from '../constants';
import {NodeDatum, NodeDatumSelection} from '../types/types';
import {SvgSelection} from '../../../../types/svg';


export type NodeWrapperSelection = Selection<SVGGElement, NodeDatum, any, any>;

export function svg_selectNodes(svg: SvgSelection): NodeWrapperSelection {
    return svg.select(getComponentWrapperSelector(COMPONENT_NAME))
              .selectAll('g');
}
export function svg_selectCircles(svg: SvgSelection) {
    return svg_selectNodes(svg)
        .selectAll('circle') as NodeDatumSelection;
}
