import {VizConfigItem, VizConfigState} from '../config/types';
import {ViewBox} from '../../../../types/simulation/visualization';
import {useEffect, useMemo} from 'react';
import {readConfig} from '../util/read';
import {useLocalStorage} from '../../../../util/hooks/useLocalStorage';
import {merge} from 'lodash';

export function useConfiguredViewBox(config: VizConfigState) {
    const viewBox: ViewBox = useMemo(() =>
                                         [
                                             readConfig(config.offsetX, 0),
                                             readConfig(config.offsetY, 0),
                                             readConfig(config.svgWidth, 100) || 1,
                                             readConfig(config.svgHeight, 100) || 1,
                                         ],
                                     [
                                         config.offsetX,
                                         config.offsetY,
                                         config.svgWidth,
                                         config.svgHeight,
                                     ])
    return viewBox;
}
export function useConfiguredSize(state: VizConfigState) {
    const {width, height} = state;
    return {width: readConfig(width), height: readConfig(height)};
}

export function isConfigWidget(input: any): input is VizConfigItem {
    return input?.hasOwnProperty('type');
}


export function useAppConfig<T extends VizConfigState = any>(model: T): [T, (config: Partial<T>) => void] {
    const [config, setState] = useLocalStorage<Partial<T>>('d3app__config', model)
    useEffect(() => {
                  setState(
                      Object.fromEntries(
                          Object.entries(merge({}, config, model))
                                .map(
                                    ([key, configValue]) => [
                                        key,
                                        !isConfigWidget(configValue)
                                        ? configValue
                                        : {
                                                state: configValue?.defaultState,
                                                ...configValue || {},
                                            },
                                    ],
                                ),
                      ) as T,
                  )
              },
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [model])
    return [config as T, setState];
}