import {Components} from '../types';
import {SvgSelection} from '../../../../types/svg';
import {SimulationData} from '../../../../data/types';
import {useEffect} from 'react';

export function useUpdateWhenDataChanges<ComponentManagers extends Components>(
    svg: SvgSelection,
    components: ComponentManagers,
    data: SimulationData,
) {
    useEffect(() => {
        svg && components.forEach(c => c.update(svg, data))
    }, [svg, components, data]);
}