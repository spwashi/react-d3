import React, {useMemo, useRef} from 'react';
import {NodeDatum} from './data/components/nodes/types';
import {useAppConfig} from './app/components/config/hooks';
import {AppWrapper} from './app/wrapper.styled';
import {GlobalStyle} from './app/global.styled';
import {EdgeDatum} from './data/components/edges/types';
import {useExampleNodes} from './util/hooks/data/nodes/useExampleNodes';
import {useExampleEdges} from './util/hooks/data/edges/useExampleEdges';
import {defaultConfig} from './app/config/config';
import {AppConfig} from './app/components/config/components/AppConfig';
import {ConfiguredVisualization} from './app/components/viz';
import {dataComponents} from './data/components';
import {useExampleClusters} from './util/hooks/data/clusters/useExampleClusters';
import {SimulationData} from './data/types';
import {ClusterDatum} from './data/components/clusters/types';


export {};

function useApplication() {
    const components          = dataComponents;
    const [config, setConfig] = useAppConfig(defaultConfig);
    const dataRef             = useRef({
                                           nodes:    [] as NodeDatum[],
                                           edges:    [] as EdgeDatum[],
                                           clusters: [] as ClusterDatum[],
                                       } as SimulationData);

    const {list: clusterData, map: clusterMap} = useExampleClusters(config)
    const {list: nodeData, map: nodeMap}       = useExampleNodes(config, clusterMap);
    const {list: edgeData}                     = useExampleEdges(config, nodeMap)
    const data                                 = useMemo(() => {
        dataRef.current.nodes    = nodeData;
        dataRef.current.edges    = edgeData;
        dataRef.current.clusters = clusterData;
        return dataRef.current;
    }, [nodeData, edgeData, clusterData]);
    return {components, config, setConfig, data};
}
/**
 *
 * @constructor
 */
export function DefaultApplication() {
    const {components, config, setConfig, data} = useApplication();

    return (
        <AppWrapper className={'d3app-wrapper'}>
            <GlobalStyle/>
            <div className={'d3app-wrapper-inner'}>
                <AppConfig config={config} setConfig={setConfig}/>
                <ConfiguredVisualization data={data} config={config} components={components}/>
            </div>
        </AppWrapper>
    );
}
// DefaultApplication.whyDidYouRender = true;