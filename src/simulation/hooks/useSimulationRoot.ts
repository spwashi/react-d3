import {create} from 'd3';
import {useEffect, useMemo} from 'react';
import {SimulationData} from '../../root/data/data.types';
import {SimulationElement, SimulationRoot} from '../../root/simulation/simulation.types';
import {ViewBox} from '../../viz.types';
import {SvgSelection} from '../../root/data/selection.types';
import {getComponentWrapperClassname} from '../../util/data/getComponentWrapperClassname';


interface SimRootParams<ComponentManagers> {
    viewBox: ViewBox;
    data: SimulationData;
    components: ComponentManagers;
}

export function useSimulationRoot<ComponentManagers extends SimulationElement<any>[]>(p: SimRootParams<ComponentManagers>, key: any): SimulationRoot<ComponentManagers> {
    const {viewBox, data, components} = p;

    const svg = useMemo(
        () => {
            let selection: SvgSelection = create('svg');
            const _svg: SvgSelection    = selection.attr('viewBox', viewBox.join(' '))
                                                   .attr('overflow', 'visible');
            [...components]
                .reverse()
                .forEach(
                    ({name}) => {
                        const classname = getComponentWrapperClassname(name);
                        _svg.append('g')
                            .classed(classname, true);
                    },
                );

            const size  = (viewBox[2] - viewBox[0]) / 100;
            const outer = _svg.append('g');
            outer.append('circle').style('fill', 'white').attr('r', size).attr('cx', 0);
            outer.append('text').style('fill', 'black').text('0, 0').attr('font-size', size)
            return _svg;
        },
        [viewBox],
    );
    useEffect(() => { svg && components.forEach(c => c.update(svg, data)) }, [svg, key, components, data]);
    useEffect(() => { if (svg) svg.attr('viewBox', viewBox.join(' '))}, [viewBox, svg]);
    return useMemo(() => ({svg, components}), [svg, components])
}
