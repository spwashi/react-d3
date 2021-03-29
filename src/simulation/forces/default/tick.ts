import {SimulationElement, SimulationRoot} from '../../types';

export function defaultTick<T extends SimulationElement<any>[]>(root: SimulationRoot<T>) {
    root.components.forEach(component => component.tick(root.svg))
}