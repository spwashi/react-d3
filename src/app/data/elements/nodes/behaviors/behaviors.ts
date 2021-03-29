import {D3DragEvent, D3ZoomEvent, drag as d3drag, select, Selection, zoom as d3zoom} from 'd3';
import {NodeDatum, NodeDatumSelection} from '../../../../../simulation/data/types/node';
import {SvgSelection} from '../../../../../simulation/data/types/selection';

const _behaviorCache = new Map();

const svg_selectNodeContainer = (svg: SvgSelection) => (svg.select('g.nodes') as unknown as NodeDatumSelection);
const svg_selectCircles       = (svg: SvgSelection): Selection<SVGCircleElement, NodeDatum, any, any> => svg_selectNodeContainer(svg).selectAll('circle');

function behaviors(svg: SvgSelection) {
    if (_behaviorCache.has(svg)) return _behaviorCache.get(svg);

    if (_behaviorCache.size > 1) _behaviorCache.clear();

    const container = svg_selectNodeContainer(svg)
    const behaviors = {
        drag: d3drag<SVGGElement, NodeDatum>()
                  .on('drag', function dragged(this: Element, event: D3DragEvent<any, any, any>, d: NodeDatum) {
                      event.sourceEvent.stopPropagation()
                      const drag = d?.dragBehavior?.drag;
                      if (drag) return drag(event, d);

                      const x = d._fx ?? event.x;
                      const y = d._fy ?? event.y;

                      d.fx = x;
                      d.fy = y;
                  })
                  .on('end', (e, d) => {
                      e.sourceEvent.stopPropagation()
                      let release = d.dragBehavior?.release ?? (() => {
                          if ((d.dragBehavior?.savePos ?? false)) return;
                          d.fx = undefined;
                          d.fy = undefined
                      });
                      release(e, d)
                  }),
        zoom: d3zoom<any, any>()
                  .on('zoom', function (this: HTMLElement, event: D3ZoomEvent<any, any> & { subject: NodeDatum }) {
                      let sourceEvent = event.sourceEvent;
                      if (sourceEvent.type === 'end') return;
                      let deltaY = sourceEvent.deltaY / 2;
                      if (!deltaY) return;
                      console.log(event);

                      const selection =
                                [
                                    select(this),
                                    container.selectAll<any, NodeDatum>('circle'),
                                ][0] as Selection<any, any, any, any>;

                      selection.each((d: NodeDatum) => {
                          d.r =
                              Math.max(
                                  10,
                                  (d.r ?? 0) - deltaY,
                              ) || 10;
                      })
                  }),
    };

    _behaviorCache.set(svg, behaviors)

    return behaviors;
}