export type ToggleInput = { type: 'toggle', defaultState: false };
export type RangeVizConfigItem<T = any> = { type: 'range', min: number, max: number, step: number, defaultState: T };
export type EnumVizConfigItem<T = any> = { type: 'enum', options: T[], defaultState: T };
export type VizConfigItem<T = any> =
    { state?: T }
    &
    (
        | ToggleInput
        | EnumVizConfigItem
        | RangeVizConfigItem<T>
        );
type VizConfigDefaults =
    {
        n: VizConfigItem<number>,
        radius: VizConfigItem<number>,
        edgeStrength: VizConfigItem<number>,
        edgeWidth: VizConfigItem<number>,
        nodeStrength: VizConfigItem<number>,
        useNodeStrength: VizConfigItem<number>,
        useEdgeStrength: VizConfigItem<number>,
        height: VizConfigItem<number>,
        width: VizConfigItem<number>,
        svgWidth: VizConfigItem<number>,
        svgHeight: VizConfigItem<number>,
        offsetX: VizConfigItem<number>,
        offsetY: VizConfigItem<number>,
        useBoundingBox: VizConfigItem<number>,
        boundingOption: VizConfigItem<number>,
        useCenteringForce: VizConfigItem<number>,
        collisionForce: VizConfigItem<number>,
        useInternalForce: VizConfigItem<number>,
        open: VizConfigItem,
    };

export type VizConfigState = Partial<VizConfigDefaults>;
