import {SvgSelection} from '../../../types/svg';
import {ViewBox} from '../../../viz.types';
import {zoom} from 'd3-zoom';

export function svg_addZoomBehavior(svg: SvgSelection, viewBox: ViewBox) {
    const [, , width, height] = viewBox;
    svg.call(
        zoom<any, any>()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 8])
            .on('zoom', ({transform}) => {
                svg.selectAll('g.wrapper').attr('transform', transform);
            }),
    )
}