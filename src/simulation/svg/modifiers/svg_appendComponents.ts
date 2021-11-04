import {SvgSelection} from '../../../types/svg';
import {getComponentWrapperClassname} from '../../../data/util/getComponentWrapperClassname';
import {SimulationElement} from '../../../types/simulation';

type Components = SimulationElement<any>[];
export function svg_appendComponents<ComponentManagers extends Components>(svg: SvgSelection, components: ComponentManagers) {
    [...components].reverse().forEach(({name}) => {
        const classname = getComponentWrapperClassname(name);
        svg.append('g')
           .classed(classname, true)
           .classed('wrapper', true);
    });
}