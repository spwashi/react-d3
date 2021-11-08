import {zoom as d3zoom} from 'd3-zoom';
import {BaseType, D3ZoomEvent, select, Selection} from 'd3';
import {ClusterDatum} from '../types/types';

export function addZoomBehavior(circles: Selection<BaseType, any, BaseType, any>) {
    const doZoom = true;

    const zoom =
              d3zoom<any, any>().on('zoom',
                                    function (this: HTMLElement, event: D3ZoomEvent<any, any> & { subject: ClusterDatum }) {
                                        let sourceEvent = event.sourceEvent;
                                        if (sourceEvent.type === 'end') return;
                                        let deltaY = sourceEvent.deltaY / 200;
                                        if (!deltaY) return;

                                        const selection = select(this) as Selection<any, any, any, any>;

                                        selection.each((d: ClusterDatum) => {
                                            (d.forces = d.forces ?? {}).electronegativity =
                                                (d.forces.electronegativity ?? 0) - deltaY;
                                        })
                                    });
    doZoom && circles.call(zoom);
}