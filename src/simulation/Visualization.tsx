import React, {useEffect, useMemo, useRef} from 'react';
import {ViewBox} from '../types/simulation/visualization';
import {useSimulation} from './hooks/useSimulation';
import {SimulationElement} from '../types/simulation';
import {ForceConfiguration} from './forces/types';
import {SimulationData} from '../data/types';

type VizParams = {
    data: SimulationData,
    components: SimulationElement<any>[]
    className?: string,
    forces?: ForceConfiguration;
    viewBox: ViewBox;
    appName?: string;
};

export const Visualization =
                 ({data, forces, className, components, viewBox, appName='viz'}: VizParams) => {
                     const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

                     const {svg, simulation} = useSimulation({data, forces, components, viewBox});

                     useEffect(() => {
                         const top          = window as any;
                         top[appName]            = top[appName] ?? {};
                         top[appName].simulation = simulation;
                         return () => {
                             top[appName].simulation = undefined;
                         };
                     }, [simulation]);

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