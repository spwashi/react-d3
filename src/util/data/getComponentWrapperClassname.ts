import {SimulationData} from '../../root/data/data.types';

export function getComponentWrapperClassname(name: keyof SimulationData) {
    return name + '-_-outer-wrapper';
}