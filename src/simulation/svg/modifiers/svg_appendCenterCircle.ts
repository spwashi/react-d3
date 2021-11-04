import {SvgSelection} from '../../../types/svg';
import {ViewBox} from '../../../types/simulation/visualization';

export function svg_appendCenterCircle(svg: SvgSelection, viewBox: ViewBox) {
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
         .style('opacity', '.3')
         .text('0 , 0')
         .attr('text-anchor', 'middle')
         .attr('font-size', (width - viewBox[0]) / 100)
         .attr('font-family', 'monospace')
}