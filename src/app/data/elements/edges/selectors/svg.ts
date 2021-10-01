import {SvgSelection} from '../../../../../root/data/selection.types';
import {D3EdgeSelection, EdgeDatum} from '../../../../../root/data/components/edge.types';
import {getComponentWrapperClassname} from '../../../../../util/data/getComponentWrapperClassname';
import {EDGE_COMPONENT_NAME} from '../constants';
import {Selection} from 'd3';

type EdgeWrapperSelection = Selection<SVGGElement, EdgeDatum, any, any>;

export const svg_selectEdges =
                 (svg: SvgSelection): EdgeWrapperSelection =>
                     svg.select('g.' + getComponentWrapperClassname(EDGE_COMPONENT_NAME))
                        .selectAll('g');

export const svg_selectEdgeLines = (svg: SvgSelection) =>
    svg_selectEdges(svg)
        .selectAll('line') as unknown as D3EdgeSelection;