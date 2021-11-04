import {Selection} from 'd3';
import {SimulationData} from '../../types';
import {NodeDatum, NodeDatumSelection} from './types';
import {SimulationElement} from '../../../types/simulation';
import {SvgSelection} from '../../../types/svg';
import {NODE_COMPONENT_NAME} from './constants';
import {svg_selectCircles, svg_selectNodes} from './selectors/svg';
import {d_selectRadius, d_selectX, d_selectY} from './selectors/datum';
import {addDragBehavior} from './behaviors/drag';
import {addZoomBehavior} from './behaviors/zoom';
import styleNodes from './style';


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
                                       wrapper.on('click', console.log)
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
                         styleNodes(svg_selectCircles(svg))
                     },
                 });
