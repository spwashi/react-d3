import {SimulationData} from '../types';

export function getComponentWrapperClassname(name: keyof SimulationData) {
    return name + '-_-outer-wrapper';
}

export function getComponentWrapperSelector(name: keyof SimulationData) {
    return 'g.' + getComponentWrapperClassname(name)
}