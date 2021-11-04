import {Selection} from 'd3';
import {getComponentWrapperClassname} from '../../../util/getComponentWrapperClassname';
import {CLUSTER_COMPONENT_NAME} from '../constants';
import {ClusterDatum, ClusterDatumSelection} from '../types';
import {SvgSelection} from '../../../../types/svg';


export type ClusterWrapperSelection = Selection<SVGGElement, ClusterDatum, any, any>;

export function svg_selectClusters(svg: SvgSelection): ClusterWrapperSelection {
    return svg.select('g.' + getComponentWrapperClassname(CLUSTER_COMPONENT_NAME))
              .selectAll('g');
}
export function svg_selectCircles(svg: SvgSelection) {
    return svg_selectClusters(svg)
        .selectAll('circle') as ClusterDatumSelection;
}
