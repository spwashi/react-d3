import React, {useEffect, useMemo, useRef} from 'react';
import {useSimulation} from './hooks/useSimulation';
import {SimulationElement} from '../types/simulation';
import {SimulationData} from '../data/types';
import {useConfiguredViewBox} from '../app/components/config/hooks';
import {useForceInitialization} from '../app/components/config/hooks/useForceInitialization';
import {VizConfigState} from '../app/components/config/config/types';

type VizParams = {
    data: SimulationData,
    components: SimulationElement<any>[]
    className?: string,
    config: VizConfigState;
    appName?: string;
};

function useMountSvg(svg: SVGElement | null) {
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    useEffect(() => {
                  const div = ref.current;
                  if (!div || !svg) return;

                  div.appendChild(svg);
                  return () => {
                      div.removeChild(svg)
                      svg.remove();
                  }
              },
              [svg]);
    return ref;
}
export const Visualization =
                 ({data, config, className, components, appName = 'viz'}: VizParams) => {
                     const viewBox           = useConfiguredViewBox(config);
                     const forceConfig       = useForceInitialization(config);
                     const {svg, simulation} = useSimulation({data, forceConfig: forceConfig, components, viewBox});

                     useEffect(() => {
                         const top               = window as any;
                         top[appName]            = top[appName] ?? {};
                         top[appName].simulation = simulation;
                         return () => {
                             top[appName].simulation = undefined;
                         };
                     }, [simulation]);

                     const ref   = useMountSvg(svg);
                     const style = useMemo(() => ({
                         display:        'flex',
                         alignItems:     'center',
                         justifyContent: 'center',
                         width:          '100%',
                         border:         'thin solid orange',
                         height:         '100%',
                     }), []);
                     return (
                         <div ref={ref} style={style} className={className}/>
                     )
                 };