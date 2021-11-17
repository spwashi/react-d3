import {BaseType, drag as d3drag, Selection} from 'd3';
import {ClusterDatum} from '../types/types';

export function addDragBehavior(selection: Selection<BaseType, any, BaseType, any>) {
    const dragBehavior =
              d3drag<any, any>()
                  .on('drag', (event, d: ClusterDatum) => {
                      event.sourceEvent.stopPropagation()
                      const drag = d?.dragBehavior?.drag;
                      if (drag) return drag(event, d);

                      const x = event.x;
                      const y = event.y;

                      d.x = d.fx = x;
                      d.y = d.fy = y;
                  })
                  .on('end', (event, d: ClusterDatum) => {
                      event.sourceEvent.stopPropagation();
                      d.dragBehavior?.release && d.dragBehavior.release(event, d)
                  });
    selection.call(dragBehavior);
}