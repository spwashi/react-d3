import React, {useMemo, useRef} from 'react';
import {NodeDatum} from './data/components/nodes/_types/node.types';
import {useAppConfig} from './app/components/config/hooks';
import {AppWrapper} from './app/wrapper.styled';
import {GlobalStyle} from './app/global.styled';
import {EdgeDatum} from './data/components/edges/_types/edge.types';
import {useExampleNodes} from './util/hooks/useExampleNodes';
import {useExampleEdges} from './useExampleEdges';
import {defaultConfig} from './app/config/config';
import {AppConfig} from './app/components/config/components/AppConfig';
import {ConfiguredVisualization} from './app/components/viz';
import {dataComponents} from './data/components';


export {};

function useApplication() {
    const components                     = dataComponents;
    const [config, setConfig]            = useAppConfig(defaultConfig);
    const dataRef                        = useRef({nodes: [] as NodeDatum[], edges: [] as EdgeDatum[]});
    const {list: nodeData, map: nodeMap} = useExampleNodes(config);
    const {list: edgeData}               = useExampleEdges(config, nodeMap)
    const data                           = useMemo(() => {
        dataRef.current.nodes = nodeData;
        dataRef.current.edges = edgeData;
        return dataRef.current;
    }, [nodeData, edgeData]);
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