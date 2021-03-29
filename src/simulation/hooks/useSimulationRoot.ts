import {create} from 'd3';
import {useEffect, useMemo} from 'react';
import {SimulationData} from '../data/types';
import {SimulationElement, SimulationRoot} from '../types';
import {ViewBox} from '../../viz.types';
import {SvgSelection} from '../data/types/selection';


interface SimRootParams<ComponentManagers> {
    viewBox: ViewBox;
    data: SimulationData;
    components: ComponentManagers;
}

export function useSimulationRoot<ComponentManagers extends SimulationElement<any>[]>(p: SimRootParams<ComponentManagers>, key: any): SimulationRoot<ComponentManagers> {
    const {viewBox, data, components} = p;

    const svg = useMemo(() => {
                            let selection: SvgSelection = create('svg');
                            const _svg: SvgSelection    = selection.attr('viewBox', viewBox.join(' '))
                                                                   .attr('overflow', 'visible')
                            _svg.append('g').classed('nodes', true);

                            const size  = (viewBox[2] - viewBox[0]) / 100;
                            const outer = _svg.append('g');
                            outer.append('circle').style('fill', 'white').attr('r', size).attr('cx', 0);
                            outer.append('text').style('fill', 'black').text('0, 0').attr('font-size', size)
                            return _svg;
                        },
                        []);
    useEffect(() => { svg && components.forEach(c => c.update(svg, data)) }, [svg, key, components]);
    useEffect(() => { if (svg) svg.attr('viewBox', viewBox.join(' '))}, [viewBox, svg]);
    return useMemo(() => ({svg, components}), [svg, components])
}
