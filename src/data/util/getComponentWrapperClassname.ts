import {SimulationData} from '../types';

export function getComponentWrapperClassname(name: keyof SimulationData) {
    return name + '-_-outer-wrapper';
}