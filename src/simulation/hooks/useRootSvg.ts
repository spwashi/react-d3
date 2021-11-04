import {create} from 'd3';
import {useEffect, useMemo} from 'react';
import {SimulationData} from '../../data/types';
import {SimulationElement, SimulationRoot} from '../../types/simulation';
import {ViewBox} from '../../viz.types';
import {SvgSelection} from '../../types/svg';
import {svg_appendCenterCircle} from '../svg/modifiers/svg_appendCenterCircle';
import {svg_appendComponents} from '../svg/modifiers/svg_appendComponents';
import {svg_addZoomBehavior} from '../svg/modifiers/svg_addZoomBehavior';


type Components = SimulationElement<any>[];

interface SimRootParams<ComponentManagers> {
    viewBox: ViewBox;
    data: SimulationData;
    components: ComponentManagers;
}

function useUpdateWhenDataChanges<ComponentManagers extends Components>(
    svg: SvgSelection,
    components: ComponentManagers,
    data: SimulationData,
    key: any,
) {
    useEffect(() => {
        svg && components.forEach(c => c.update(svg, data))
    }, [svg, key, components, data]);
}
export function useRootSvg<ComponentManagers extends Components>(
    params: SimRootParams<ComponentManagers>,
    key: any,
): SimulationRoot<ComponentManagers> {
    const {viewBox, data, components} = params;

    const svg = useMemo(() => {
        const svg: SvgSelection = create('svg')
            .attr('viewBox', viewBox.join(' '))
            .attr('overflow', 'visible');
        svg_appendCenterCircle(svg, viewBox);
        svg_appendComponents(svg, components);
        svg_addZoomBehavior(svg, viewBox);
        return svg;
    }, [viewBox, components]);

    useUpdateWhenDataChanges(svg, components, data, key);

    return useMemo(() => ({svg, components}), [svg, components])
}
