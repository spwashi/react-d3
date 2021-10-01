import {SimulationElement, SimulationRoot} from '../../../root/simulation/simulation.types';

export function defaultTick<T extends SimulationElement<any>[]>(root: SimulationRoot<T>) {
    root.components.forEach(component => component.tick(root.svg))
}