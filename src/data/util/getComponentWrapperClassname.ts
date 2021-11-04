import {SimulationData} from '../_types/data.types';

export function getComponentWrapperClassname(name: keyof SimulationData) {
    return name + '-_-outer-wrapper';
}