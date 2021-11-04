import {SvgSelection} from '../../../../types/svg';
import {D3EdgeSelection, EdgeDatum} from '../types';
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