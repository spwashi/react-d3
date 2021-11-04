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
    viewBox: ViewBox
};

export const Visualization =
                 ({data, forces, className, components, viewBox}: VizParams) => {
                     const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

                     const simulation = useSimulation({data, forces, components, viewBox});

                     useEffect(() => {
                                   const div = ref.current;
                                   if (!div || !simulation) return;

                                   div.appendChild(simulation)
                                   return () => {
                                       div.removeChild(simulation)
                                       simulation.remove();
                                   }
                               },
                               [simulation]);

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