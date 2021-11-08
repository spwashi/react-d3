import {SvgSelection} from '../../../types/svg';
import {zoom, ZoomTransform} from 'd3-zoom';

export function svg_addZoomBehavior(
    svg: SvgSelection,
    transform: Partial<ZoomTransform>,
    updateTransform: (t: Partial<ZoomTransform>) => void,
) {
    const zoomBehavior = zoom<any, any>()
        .on('zoom', ({transform}) => {
            const {k, x, y} = transform;
            updateTransform({k, x, y});
        });
    zoomBehavior.transform(svg, new ZoomTransform(transform.k ?? 0, transform.x ?? 0, transform.y ?? 0));
    svg.call(zoomBehavior)
}