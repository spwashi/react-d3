import {DataSelector, DataSetter, Datum, LinkDefinition, SvgSelection} from './data.types';
import {ViewBox} from './viz.types';
import * as d3 from 'd3';

/**
 * Objects,
 *  information,
 *  and functions to read and modify the data of a specific branch of components in this visualization
 */
interface ComponentManager<SelectionType, ItemData = any> {
    element: Definition<SelectionType>;
    itemSelector: DataSelector<SelectionType>;
    setData: DataSetter<ItemData, SelectionType>;
}

/**
 * Function that modifies the svg to reflect
 */
type ElementInitializer<ComponentSelectionType, ItemData = any> = (this: ComponentManager<ComponentSelectionType, ItemData>, svg: SvgSelection) => void;

/**
 * Information about the simulation Data represented by the simulation
 */
type SimulationInformation = {
    data: Datum[],
    links: LinkDefinition[]
};

/**
 * Represents the "element" input to the
 */
export type DefinitionsObject<T> = { [P in keyof T]: Definition<T[P]> }

/**
 * Represents a class of items that exhibit similar style and behavior based on the inputs they're affected by
 */
export interface Definition<ComponentSelectionType, ItemData = any> {
    initComponent: ElementInitializer<ComponentSelectionType>;
    select: DataSelector<ComponentSelectionType>,
    data: ItemData;
    format: (items: ComponentSelectionType | undefined, simulation?: d3.Simulation<any, any>) => ComponentSelectionType | undefined,
}

/**
 * ComponentManagers accessible by keys
 */
export type SvgComponentManagers = {
    circles: ComponentManager<any>;
    lines: ComponentManager<any>
};

/**
 * An object that describes the classes of elements in this SVG
 */
export type ComponentManagersObject<T> = {
    [P in keyof T]: ComponentManager<T[P]>
}

/**
 * A collection of information about the SVG that's currently being constructed
 */
export interface SvgRoot {
    svg: SvgSelection;
    componentManagers: Array<ComponentManager<any>>
}

export interface UseD3RootSvgParams {
    offset: ViewBox;
    information: SimulationInformation;
    components: DefinitionsObject<any[]>;
}