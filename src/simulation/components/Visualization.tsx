import React, {useEffect, useMemo, useRef} from 'react';
import {ViewBox} from '../../viz.types';
import {useSimulation} from '../hooks/useSimulation';
import {SimulationElement} from '../types';
import {NodeDatum} from '../data/types/node';
import {ForceConfiguration} from '../forces/types';

type VizParams = {
    data: { nodes: NodeDatum[] },
    components: SimulationElement<any>[]
    className?: string,
    forces?: ForceConfiguration;
    viewBox: ViewBox
};

export function Visualization({data, forces, className, components,  viewBox}: VizParams) {
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
              [ref.current, simulation]);

    const style = useMemo(() => ({
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '100%',
        height:         '100%',
    }), []);
    return (
        <div ref={ref} style={style} className={className}/>
    )
}