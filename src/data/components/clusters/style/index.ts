import {ClusterDatumSelection} from '../types';
import {cluster_selectFill, cluster_selectRadius, cluster_selectX, cluster_selectY} from '../selectors/datum';

export default function styleNodes(selection: ClusterDatumSelection) {
    return selection.attr('cx', cluster_selectX)
                    .attr('cy', cluster_selectY)
                    .attr('stroke', 'white')
                    .attr('fill', cluster_selectFill)
                    .attr('r', cluster_selectRadius)
}