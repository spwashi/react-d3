import {useConfiguredSize, useConfiguredViewBox} from '../config/hooks';
import React, {useMemo} from 'react';
import {nodes} from '../../data/elements/nodes/nodes';
import {Visualization} from '../../../simulation/components/Visualization';
import {NodeDatum} from '../../../root/data/components/node.types';
import {VizConfigState} from '../config/config/types';
import {edges} from '../../data/elements/edges/edges';
import {useConfiguredForces} from '../config/hooks/useConfiguredForces';

interface AppVizParams {
    data: { nodes: NodeDatum[] };
    config: VizConfigState;
}

export function ConfiguredVisualization({data, config}: AppVizParams) {
    const viewBox              = useConfiguredViewBox(config);
    const forces               = useConfiguredForces(config);
    const {width, height}      = useConfiguredSize(config);
    const components           = useMemo(() => [nodes(), edges()], []);
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