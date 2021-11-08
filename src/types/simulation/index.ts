import {SimulationData} from '../../data/types';
import {SvgSelection} from '../svg';

/**
 * Objects,
 *  information,
 *  and functions to read and modify the nodes of a specific branch of components in this visualization
 */
export interface SimulationElement<SelectionType, ItemData = any> {
    name: keyof SimulationData;
    /**
     * Called when data changes
     *
     * @param svg
     * @param data
     */
    update: (svg: SvgSelection, data: SimulationData) => void;
    /**
     * Called when the simulation "ticks"
     *
     * @param selection
     */
    tick: (selection: SvgSelection) => void;
}

export interface SimulationRoot<T extends SimulationElement<any>[] = []> {
    svg: SvgSelection;
    components: T
}