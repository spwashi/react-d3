import {D3EdgeSelection, D3NodeSelection, DataSelector, DataSetter, DatumEdge, SvgSelection} from '../data/data.types';
import {ViewBox} from '../viz.types';
import {Simulation} from 'd3';
import {Datum} from '../data/types/datum';

/**
 * Objects,
 *  information,
 *  and functions to read and modify the nodes of a specific branch of components in this visualization
 */
export interface ComponentManager<SelectionType, ItemData = any> {
    data: any;
    format: (selection: SvgSelection, simulation?: Simulation<any, any>) => void;
    initComponent: (svg: SvgSelection) => void;
    selection: DataSelector<SelectionType>;
    setData: DataSetter<ItemData>;
}

/**
 * SimulationData about the simulation Data represented by the simulation
 */
type SimulationInformation = {
    nodes: Datum[],
    edges: DatumEdge[]
};

/**
 * ComponentManagers accessible by keys
 */
export type SvgComponentManagers = {
    nodes: ComponentManager<any>;
    edges: ComponentManager<any>
};
export type NodeComponentManager = ComponentManager<D3NodeSelection>;
export type EdgeComponentManager = ComponentManager<D3EdgeSelection>;
export type ExpectedComponentManagers = [
    EdgeComponentManager,
    NodeComponentManager
];

/**
 * A collection of information about the SVG that's currently being constructed
 */
export interface SimulationRoot {
    svg: SvgSelection;
    componentManagers: ExpectedComponentManagers
}

export interface UseD3RootSvgParams {
    offset: ViewBox;
    data: SimulationInformation;
    components: ExpectedComponentManagers;
}