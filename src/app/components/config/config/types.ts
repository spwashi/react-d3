export type ToggleInput = { type: 'toggle', defaultState: false };
export type RangeVizConfigItem<T = any> = { type: 'range', min: number, max: number, step: number, defaultState: T };
export type VizConfigItem<T = any> =
    { state?: T }
    & (ToggleInput | RangeVizConfigItem<T>);
type VizConfigDefaults =
    {
        n: VizConfigItem<number>,
        radius: VizConfigItem<number>,
        edgeStrength: VizConfigItem<number>,
        edgeWidth: VizConfigItem<number>,
        nodeStrength: VizConfigItem<number>,
        height: VizConfigItem<number>,
        width: VizConfigItem<number>,
        svgWidth: VizConfigItem<number>,
        svgHeight: VizConfigItem<number>,
        offsetX: VizConfigItem<number>,
        offsetY: VizConfigItem<number>,
        boundingBox: VizConfigItem<number>,
        boundingOption: VizConfigItem<number>,
        centeringForce: VizConfigItem<number>,
        collisionForce: VizConfigItem<number>,
        internalForce: VizConfigItem<number>,
        open: VizConfigItem,
    };

export type VizConfigState = Partial<VizConfigDefaults>;
