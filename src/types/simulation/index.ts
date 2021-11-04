import {SimulationData} from '../../data/types';
import {SvgSelection} from '../svg';

/**
 * Objects,
 *  information,
 *  and functions to read and modify the nodes of a specific branch of components in this visualization
 */
export interface SimulationElement<SelectionType, ItemData = any> {
    name: keyof SimulationData;
    tick: (selection: SvgSelection) => void;
    update: (svg: SvgSelection, data: SimulationData) => void;
}

/**
 * A collection of information about the SVG that's currently being constructed
 */
export interface SimulationRoot<T extends SimulationElement<any>[] = []> {
    svg: SvgSelection;
    components: T
}