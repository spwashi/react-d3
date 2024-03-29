import {SimulationData} from '../../types';
import {SvgSelection} from '../../../types/svg';
import {COMPONENT_NAME} from './constants';
import {svg_selectEdgeLines, svg_selectEdges} from './selectors/svg';
import styleLines from './style';
import {SimulationElement} from '../../../types/simulation';
import {D3EdgeSelection} from './types/types';
import {Selection} from 'd3';

type J = (s: Selection<any, any, any, any>) => any;
export const edgeComponent: SimulationElement<D3EdgeSelection> =
                 {
                     name: COMPONENT_NAME,
                     update(svg: SvgSelection, data: SimulationData) {
                         if (!data.edges) return;
                         const edges       = svg_selectEdges(svg);
                         const wrapperData = edges.data(data.edges ?? [],
                                                        d => (`${d.source.id} ${d.target.id}`));
                         const enter: J    = selection => styleLines(selection.append('g')
                                                                              .classed('edge-wrapper', true)
                                                                              .append('line'));
                         const update: J   = selection => selection;
                         const exit: J     = selection => selection.remove();
                         wrapperData.join(enter, update, exit)
                     },
                     tick(svg: SvgSelection) {
                         styleLines(svg_selectEdgeLines(svg))
                     },
                 }