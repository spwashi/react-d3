import {ViewBox} from '../../../../types/simulation/visualization';
import {SimulationData} from '../../../../data/types';
import {SimulationElement} from '../../../../types/simulation';

export type Components = SimulationElement<any>[];

export interface SimRootParams<ComponentManagers> {
    viewBox: ViewBox;
    data: SimulationData;
    components: ComponentManagers;
}