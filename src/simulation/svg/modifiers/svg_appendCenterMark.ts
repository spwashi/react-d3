import {SvgSelection} from '../../../types/svg';
import {ViewBox} from '../../../types/simulation/visualization';

export function svg_appendCenterMark(svg: SvgSelection, viewBox: ViewBox) {
    const [, , width] = viewBox;

    const outer =
              svg.append('g')
                 .classed('wrapper', true);

    outer.append('circle')
         .style('fill', 'white')
         .attr('r', 10)
         .attr('cx', 0);

    outer.append('text')
         .style('fill', 'black')
         .style('opacity', '1')
         .text('+')
         .attr('text-anchor', 'middle')
         .attr('dominant-baseline', 'central')
         .attr('font-size', (width - viewBox[0]) / 5)
         .attr('font-family', 'monospace')
}