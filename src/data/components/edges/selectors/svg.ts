import {SvgSelection} from '../../../../_types/svg/selection.types';
import {D3EdgeSelection, EdgeDatum} from '../_types/edge.types';
import {getComponentWrapperClassname} from '../../../util/getComponentWrapperClassname';
import {EDGE_COMPONENT_NAME} from '../constants';
import {Selection} from 'd3';

export type EdgeWrapperSelection = (Selection<SVGGElement, EdgeDatum, any, any>);

export const svg_selectEdges =
                 (svg: SvgSelection): EdgeWrapperSelection =>
                     svg.select('g.' + getComponentWrapperClassname(EDGE_COMPONENT_NAME))
                        .selectAll('g');

export const svg_selectEdgeLines = (svg: SvgSelection) =>
    svg_selectEdges(svg)
        .selectAll('line') as unknown as D3EdgeSelection;