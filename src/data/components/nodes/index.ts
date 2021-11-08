import {Selection} from 'd3';
import {SimulationData} from '../../types';
import {NodeDatum, NodeDatumSelection} from './types/types';
import {SimulationElement} from '../../../types/simulation';
import {SvgSelection} from '../../../types/svg';
import {COMPONENT_NAME} from './constants';
import {svg_selectCircles, svg_selectNodes} from './selectors/svg';
import {node_selectRadius, node_selectX, node_selectY} from './selectors/datum';
import {addDragBehavior} from './behaviors/drag';
import {addZoomBehavior} from './behaviors/zoom';
import nodeSelection_style from './style';


export const nodeComponent: SimulationElement<NodeDatumSelection> =
                 ({
                     name: COMPONENT_NAME,
                     update(svg: SvgSelection, data: SimulationData) {
                         if (!data.nodes) return;
                         const nodes       = svg_selectNodes(svg)
                         const wrapperData = nodes.data(data.nodes, d => d.id as any);

                         type JoinFunc = (s: Selection<any, any, any, any>) => any;
                         const enter: JoinFunc =
                                   selection => {
                                       const wrapper = selection.append('g')
                                                                .classed('node-wrapper', true)
                                                                .attr('data-nodeID', d => `${d.id}`)
                                                                .append('circle');
                                       wrapper.on('click', console.log)
                                       wrapper
                                           .attr('cx', (d) => node_selectX(d as NodeDatum))
                                           .attr('r', ((d) => node_selectRadius(d as NodeDatum) || 10))
                                           .attr('cy', (d) => node_selectY(d as NodeDatum));
                                       return wrapper;
                                   };

                         const update: JoinFunc =
                                   selection => selection;

                         const exit: JoinFunc =
                                   selection => {
                                       return selection.remove();
                                   };

                         wrapperData.join(enter, update, exit);

                         const circles = wrapperData.enter().selectAll('circle');
                         addZoomBehavior(circles);
                         addDragBehavior(circles);
                     },
                     tick: (svg: SvgSelection) => {
                         nodeSelection_style(svg_selectCircles(svg))
                     },
                 });
