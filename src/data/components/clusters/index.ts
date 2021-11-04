import {Selection} from 'd3';
import {SimulationData} from '../../types';
import {ClusterDatum, ClusterDatumSelection} from './types';
import {SimulationElement} from '../../../types/simulation';
import {SvgSelection} from '../../../types/svg';
import {CLUSTER_COMPONENT_NAME} from './constants';
import {svg_selectCircles, svg_selectClusters} from './selectors/svg';
import {cluster_selectRadius, cluster_selectX, cluster_selectY} from './selectors/datum';
import {addDragBehavior} from './behaviors/drag';
import {addZoomBehavior} from './behaviors/zoom';
import styleClusters from './style';


export const clusterComponent: SimulationElement<ClusterDatumSelection> =
                 ({
                     name: CLUSTER_COMPONENT_NAME,
                     update(svg: SvgSelection, data: SimulationData) {
                         if (!data.clusters) return;
                         const clusters    = svg_selectClusters(svg)
                         const wrapperData = clusters.data(data.clusters ?? [], d => d.id as any);

                         type JoinFunc = (s: Selection<any, any, any, any>) => any;
                         const enter: JoinFunc =
                                   selection => {
                                       const g = selection.append('g');
                                       addZoomBehavior(g as any);
                                       const circles = g
                                           .classed('cluster-wrapper', true)
                                           .attr('data-clusterID', d => `${d.id}`)
                                           .append('circle');
                                       circles.on('click', (e, d: ClusterDatum) => {
                                           e.shiftKey && d.nodes?.forEach(dd => dd.y = d.y)
                                       })
                                       circles
                                           .attr('cx', (d) => cluster_selectX(d as ClusterDatum))
                                           .attr('r', ((d) => cluster_selectRadius(d as ClusterDatum) || 10))
                                           .attr('cy', (d) => cluster_selectY(d as ClusterDatum));
                                       return circles;
                                   };

                         const update: JoinFunc =
                                   selection => selection;

                         const exit: JoinFunc =
                                   selection => {
                                       return selection.remove();
                                   };

                         wrapperData.join(enter, update, exit);

                         const circles = wrapperData.enter().selectAll('circle');
                         addDragBehavior(circles);
                     },
                     tick: (svg: SvgSelection) => {
                         styleClusters(svg_selectCircles(svg))
                     },
                 });
