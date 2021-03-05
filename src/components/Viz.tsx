import React, {useEffect, useMemo, useRef} from 'react';
import {Height, ViewBox, Width} from '../viz.types';
import {DatumEdge} from '../data/data.types';
import {ForceConfiguration} from '../hooks/useSimulation.types';
import {useSimulation} from '../hooks/simulation/useSimulation';
import {Datum} from '../data/types/datum';

type VizParams = {
    nodes: Datum[],
    links: DatumEdge[],
    forces?: {
        center?: boolean;
        boundingBox?: boolean
        nodeLinkStrength?: number;
        nodeForceStrength?: number;
    };
    svgHeight?: number,
    svgWidth?: number,
    strength?: number,
    radius?: number,
    offsetX?: number,
    offsetY?: number,
    width?: number,
    height?: number,
};

export function Viz(props: VizParams) {
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

    const width: Width       = props.width || 1;
    const height: Height     = props.height || 1;
    const nodes: Datum[]     = props.nodes;
    const edges: DatumEdge[] = props.links;
    const radius: number     = props.radius || 1;
    const nodeStrength       = props.forces?.nodeForceStrength;
    const linkStrength       = props.forces?.nodeLinkStrength;

    const viewBox: ViewBox =
              [
                  props.offsetX || 0,
                  props.offsetY || 0,
                  props.svgWidth || 100,
                  props.svgHeight || 100,
              ];

    const forces           = useMemo(() => {
                                         // return undefined;
                                         return ({
                                             boundingBox:       props.forces?.boundingBox ?? true,
                                             nodeForceStrength: nodeStrength ?? 0,
                                             center:            props.forces?.center,
                                             nodeLinkStrength:  linkStrength,
                                         } as ForceConfiguration)
                                     },
                                     [props.forces],
    );
    const sim              = useSimulation({
                                               offset: viewBox,
                                               data:   {nodes, edges},
                                               style:  {radius},
                                               forces: props.forces ? forces : undefined,
                                           });
    const simSettingSpread = [
        forces?.nodeForceStrength,
        forces?.nodeLinkStrength,
        forces?.center,
    ];

    useEffect(
        () => {
            const div = ref.current;
            if (!div || !sim) return;
            div.appendChild(sim)
            return () => {
                div.removeChild(sim)
            }
        },
        [ref.current, sim, simSettingSpread],
    );

    const style = {
        display:        'flex',
        alignItems:     'center',
        width:          `${width}px`,
        height:         `${height}px`,
        border:         'thin solid tan',
        justifyContent: 'center',
    };
    return (
        <div ref={ref} style={style}/>
    )
}