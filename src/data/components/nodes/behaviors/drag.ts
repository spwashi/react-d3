import {BaseType, drag as d3drag, Selection} from 'd3';
import {NodeDatum} from '../types';

export function addDragBehavior(selection: Selection<BaseType, any, BaseType, any>) {
    const dragBehavior =
              d3drag<any, any>()
                  .on('drag', (event, d: NodeDatum) => {
                      event.sourceEvent.stopPropagation()
                      const drag = d?.dragBehavior?.drag;
                      if (drag) return drag(event, d);

                      const x = d._fx ?? event.x;
                      const y = d._fy ?? event.y;

                      d.fx = x;
                      d.fy = y;
                  })
                  .on('end', (event, d: NodeDatum) => {
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
                  });
    selection.call(dragBehavior);
}