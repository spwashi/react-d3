import React, {useEffect, useMemo, useRef} from 'react';
import {SimSettings, useSimulation} from './useSimulation';
import {Height, ViewBox, Width} from './viz.types';
import {Datum, LinkDefinition} from './data.types';

type VizParams = {
    data: Datum[],
    links: LinkDefinition[],
    forces?: { center?: boolean };
    svgHeight?: number,
    svgWidth?: number,
    strength?: number,
    radius?: number,
    radialDecay?: number,
    offsetX?: number,
    offsetY?: number,
    width?: number,
    height?: number,
    colorsCount?: number,
    linkStrength?: number,
    nodeStrength?: number,
};

export function Viz(props: VizParams) {
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

    const width: Width            = props.width || 1;
    const height: Height          = props.height || 1;
    const data: Datum[]           = props.data;
    const links: LinkDefinition[] = props.links;
    const radius: number          = props.radius || 1;
    const radialDecay: number     = props.radialDecay || 1;
    const colors                  = props.colorsCount || 360;
    const linkStrength            = props.linkStrength || 0;
    const nodeStrength            = props.nodeStrength || 0;

    const viewBox: ViewBox =
              [
                  props.offsetX || 0,
                  props.offsetY || 0,
                  props.svgWidth || 100,
                  props.svgHeight || 100,
              ];

    let simSettings        = useMemo(() => {
                                         // return undefined;
                                         return ({
                                             nodeForceStrength: nodeStrength,
                                             center:            (props.forces?.center ?? true) ? [width / 2, height / 2] : undefined,
                                             nodeLinkStrength:  linkStrength,
                                         } as SimSettings)
                                     },
                                     [nodeStrength, width, height, linkStrength],
    );
    const sim              =
              useSimulation(
                  viewBox,
                  {data, links},
                  {radius, radialDecay, colors, animation: 'random'},
                  props.forces ? simSettings : undefined,
              );
    const simSettingSpread = [
        simSettings?.nodeForceStrength,
        simSettings?.nodeLinkStrength,
        simSettings?.center,
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

    return (
        <div ref={ref} style={{width: `${width}px`, height: `${height}px`, border: 'thin solid tan'}}/>
    )
}