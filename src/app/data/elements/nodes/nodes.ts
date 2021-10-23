import {D3ZoomEvent, drag, select, Selection} from 'd3';
import {SimulationData} from '../../../../root/data/data.types';
import {NodeDatum, NodeDatumSelection} from '../../../../root/data/components/node.types';
import {SimulationElement} from '../../../../root/simulation/simulation.types';
import {SvgSelection} from '../../../../root/data/selection.types';
import {zoom as d3zoom} from 'd3-zoom';
import {NODE_COMPONENT_NAME} from './constants';
import {svg_selectCircles, svg_selectNodes} from './selectors/svg';
import {d_selectRadius, d_selectX, d_selectY} from './selectors/datum';


function tick(svg: SvgSelection) {
    svg_selectCircles(svg)
        .attr('cx', (d) => d_selectX(d as NodeDatum))
        .attr('cy', (d) => d_selectY(d as NodeDatum))
        .attr('r', ((d) => d_selectRadius(d as NodeDatum) || 10))
        .attr('fill', d => Math.random() > .95 && ((d.id ?? 0) % 7) ? ( '#42a5c3') : (d as NodeDatum).color ?? '#ffffff')

}
function update(svg: SvgSelection, data: SimulationData) {
    if (!data.nodes) return;
    const nodes       = svg_selectNodes(svg)
    const wrapperData = nodes.data(data.nodes,
                                   d => d.id as any);

    const lg =
              svg.append('defs').append('linearGradient')
                 .attr('id', 'mygrad')
                 .attr('x1', '0%')
                 .attr('x2', '0%')
                 .attr('y1', '0%')
                 .attr('y2', '100%')
    ;
    lg.append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#42a5c3')
      .style('stop-opacity', 1);

    lg.append('stop')
      .attr('offset', '100%')
      .style('stop-color', 'white');
    const wrapperEnter = wrapperData.enter()
                                    .append('g')
                                    .classed('node-wrapper', true)
                                    .attr('data-nodeID', d => `${d.id}`);
    const circles      = wrapperEnter.append('circle')
                                     .attr('cx', (d) => d_selectX(d as NodeDatum))
                                     .attr('r', ((d) => d_selectRadius(d as NodeDatum) || 10))
                                     .attr('cy', (d) => d_selectY(d as NodeDatum))
    ;
    wrapperData.exit()
               .remove();

    const doZoom = false;

    doZoom &&
    circles.call(
        d3zoom<any, any>()
            .on('zoom', function (this: HTMLElement, event: D3ZoomEvent<any, any> & { subject: NodeDatum }) {
                let sourceEvent = event.sourceEvent;
                if (sourceEvent.type === 'end') return;
                let deltaY = sourceEvent.deltaY / 2;
                if (!deltaY) return;
                console.log(event);

                const selection =
                          [
                              select(this),
                              circles,
                          ][0] as Selection<any, any, any, any>;

                selection.each((d: NodeDatum) => {
                    d.r =
                        Math.max(
                            10,
                            (d.r ?? 0) - deltaY,
                        ) || 10;
                })
            }),
    );
    circles.call(
        drag<SVGCircleElement, NodeDatum>()
            .on('drag', function dragged(this, event, d: NodeDatum) {
                event.sourceEvent.stopPropagation()
                const drag = d?.dragBehavior?.drag;
                if (drag) return drag(event, d);

                const x = d._fx ?? event.x;
                const y = d._fy ?? event.y;

                d.fx = x;
                d.fy = y;
            })
            .on('end', (event, d) => {
                event.sourceEvent.stopPropagation();
                const shifted = event.sourceEvent.shiftKey;
                let release   = d.dragBehavior?.release ?? (() => {
                    if ((d.dragBehavior?.savePos ?? false) && !shifted) {
                        return;
                    }
                    d.fx = undefined;
                    d.fy = undefined
                });
                release(event, d)
            }));
}

export const nodes = (): SimulationElement<NodeDatumSelection> => ({
    name: NODE_COMPONENT_NAME,
    update,
    tick,
});