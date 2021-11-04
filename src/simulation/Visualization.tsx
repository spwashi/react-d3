import React, {useEffect, useMemo, useRef} from 'react';
import {ViewBox} from '../viz.types';
import {useSimulation} from './hooks/useSimulation';
import {SimulationElement} from '../_types/simulation/simulation.types';
import {NodeDatum} from '../data/components/nodes/_types/node.types';
import {ForceConfiguration} from './forces/types';

type VizParams = {
    data: { nodes: NodeDatum[] },
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