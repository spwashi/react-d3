import {SvgSelection} from '../../../_types/svg/selection.types';
import {getComponentWrapperClassname} from '../../../data/util/getComponentWrapperClassname';
import {SimulationElement} from '../../../_types/simulation/simulation.types';

type Components = SimulationElement<any>[];
export function svg_appendComponents<ComponentManagers extends Components>(svg: SvgSelection, components: ComponentManagers) {
    [...components].reverse().forEach(({name}) => {
        const classname = getComponentWrapperClassname(name);
        svg.append('g')
           .classed(classname, true)
           .classed('wrapper', true);
    });
}