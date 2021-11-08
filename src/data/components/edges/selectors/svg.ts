import {SvgSelection} from '../../../../types/svg';
import {D3EdgeSelection, EdgeDatum} from '../types/types';
import {getComponentWrapperSelector} from '../../../util/getComponentWrapperClassname';
import {COMPONENT_NAME} from '../constants';
import {Selection} from 'd3';

export type EdgeWrapperSelection = (Selection<SVGGElement, EdgeDatum, any, any>);

export const svg_selectEdges =
                 (svg: SvgSelection): EdgeWrapperSelection =>
                     svg.select(getComponentWrapperSelector(COMPONENT_NAME))
                        .selectAll('g');

export const svg_selectEdgeLines = (svg: SvgSelection) =>
    svg_selectEdges(svg)
        .selectAll('line') as unknown as D3EdgeSelection;