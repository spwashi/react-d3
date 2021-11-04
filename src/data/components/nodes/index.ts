import {Selection} from 'd3';
import {SimulationData} from '../../_types/data.types';
import {NodeDatum, NodeDatumSelection} from './_types/node.types';
import {SimulationElement} from '../../../_types/simulation/simulation.types';
import {SvgSelection} from '../../../_types/svg/selection.types';
import {NODE_COMPONENT_NAME} from './constants';
import {svg_selectCircles, svg_selectNodes} from './selectors/svg';
import {d_selectFill, d_selectRadius, d_selectX, d_selectY} from './selectors/datum';
import {addDragBehavior} from './behaviors/drag';
import {addZoomBehavior} from './behaviors/zoom';


export const nodeComponent: SimulationElement<NodeDatumSelection> =
                 ({
                     name: NODE_COMPONENT_NAME,
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
                                       wrapper
                                           .attr('cx', (d) => d_selectX(d as NodeDatum))
                                           .attr('r', ((d) => d_selectRadius(d as NodeDatum) || 10))
                                           .attr('cy', (d) => d_selectY(d as NodeDatum));
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
                         svg_selectCircles(svg)
                             .attr('cx', d_selectX)
                             .attr('cy', d_selectY)
                             .attr('fill', d_selectFill)
                             .attr('r', d_selectRadius)
                     },
                 });