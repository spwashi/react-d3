import React, {useEffect} from 'react';
import {useAppConfig} from './app/components/config/hooks';
import {AppWrapper} from './app/wrapper.styled';
import {GlobalStyle} from './app/global.styled';
import {defaultConfig} from './app/config/config';
import {AppConfig} from './app/components/config/components/AppConfig';
import {ConfiguredVisualization} from './app/components/viz/ConfiguredVisualization';
import {useData} from './useData';


export {};

/**
 *
 * @constructor
 */
export function DefaultApplication() {
    const appName             = 'viz';
    const [config, setConfig] = useAppConfig(defaultConfig);
    const {components, data}  = useData(config);

    useEffect(() => {
        const top    = window as any;
        top[appName] = top[appName] ?? {};
        Object.assign(top[appName], {
            setConfig,

            set: (name: Partial<typeof config> | keyof Partial<typeof config>, val: any) => {
                if (typeof name === 'object') {
                    let next = {} as Partial<typeof config> | any;
                    Object.assign(next, config);
                    Object.entries(name)
                          .forEach(([name, val]) => {
                              // @ts-ignore
                              const vv   = config[name];
                              next[name] = typeof vv === 'object' && vv ? {...vv, state: val} : val;
                          })
                    setConfig(next);
                    return;
                }

                const vv = config[name];
                setConfig({
                              ...config,
                              [name]: typeof vv === 'object' && vv ? {...vv, state: val} : val,
                          })
            },
            config,
            data,
            components,
        });
    }, [config, data, components]);

    return (
        <AppWrapper className={'d3app-wrapper'}>
            <GlobalStyle/>
            <div className={'d3app-wrapper-inner'}>
                <AppConfig config={config} setConfig={setConfig}/>
                <ConfiguredVisualization data={data} config={config} components={components} appName={appName}/>
            </div>
        </AppWrapper>
    );
}
// DefaultApplication.whyDidYouRender = true;