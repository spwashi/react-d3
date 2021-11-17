import {useConfiguredSize} from '../config/hooks';
import React, {useMemo} from 'react';
import {Visualization} from '../../../simulation/Visualization';
import {VizConfigState} from '../config/config/types';
import {SimulationElement} from '../../../types/simulation';
import {SimulationData} from '../../../data/types';

interface AppVizParams {
    components: SimulationElement<any>[]
    data: SimulationData;
    config: VizConfigState;
    appName?: string;
}

export function ConfiguredVisualization({data, config, components, appName}: AppVizParams) {
    const {width, height} = useConfiguredSize(config);

    const innerVizWrapperStyle = useMemo(() => ({
        width:  width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
    }), [width, height]);

    return (
        <div className="viz-wrapper">
            <div className="viz-wrapper-inner" style={innerVizWrapperStyle}>
                <Visualization
                    config={config}
                    data={data}
                    components={components}
                    appName={appName}
                />
            </div>
        </div>
    );
}
