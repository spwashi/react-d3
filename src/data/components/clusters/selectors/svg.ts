import {Selection} from 'd3';
import {getComponentWrapperSelector} from '../../../util/getComponentWrapperClassname';
import {COMPONENT_NAME} from '../constants';
import {ClusterDatum, ClusterDatumSelection} from '../types/types';
import {SvgSelection} from '../../../../types/svg';


export type ClusterWrapperSelection = Selection<SVGGElement, ClusterDatum, any, any>;

export function svg_selectClusters(svg: SvgSelection): ClusterWrapperSelection {
    return svg.select(getComponentWrapperSelector(COMPONENT_NAME))
              .selectAll('g');
}
export function svg_selectCircles(svg: SvgSelection) {
    return svg_selectClusters(svg)
        .selectAll('circle') as ClusterDatumSelection;
}
