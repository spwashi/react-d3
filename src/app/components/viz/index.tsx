import {useConfiguredSize, useConfiguredViewBox} from '../config/hooks';
import React, {useMemo} from 'react';
import {Visualization} from '../../../simulation/Visualization';
import {NodeDatum} from '../../../data/components/nodes/types';
import {VizConfigState} from '../config/config/types';
import {useConfiguredForces} from '../config/hooks/useConfiguredForces';
import {SimulationElement} from '../../../types/simulation';

interface AppVizParams {
    components: SimulationElement<any>[]
    data: { nodes: NodeDatum[] };
    config: VizConfigState;
}

export function ConfiguredVisualization({data, config, components}: AppVizParams) {
    const viewBox              = useConfiguredViewBox(config);
    const forces               = useConfiguredForces(config);
    const {width, height}      = useConfiguredSize(config);
    const innerVizWrapperStyle = useMemo(() => ({
        width:  width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
    }), [width, height]);

    return (
        <div className="viz-wrapper">
            <div className="viz-wrapper-inner" style={innerVizWrapperStyle}>
                <Visualization viewBox={viewBox} data={data} components={components} forces={forces}/>
            </div>
        </div>
    );
}
