import React, {useCallback} from 'react';
import {VizConfigItem, VizConfigState} from '../config/types';
import InputWidgetFactory from './input/InputWidgetFactory';
import {useLocalStorage} from '../../../../hooks/util/useLocalStorage';
import {isConfigWidget} from '../hooks';

type Props = {
    config: VizConfigState,
    updateValues: (i: VizConfigState) => void
};



export function ConfigWidget({config, updateValues}: Props) {
    const [open, setOpen] = useLocalStorage('config is open', true);
    const update          = useCallback((key: keyof VizConfigState, val: any) => {
                                            updateValues({
                                                             ...config,
                                                             [key]:
                                                                 {...config[key] || {}, state: val} as VizConfigItem,
                                                         });
                                        },
                                        [config, updateValues]);
    return (
        <div className="d3app__config-widget" key={'inputs'}>
            <div className={'d3app__config-widget-list'}>
                {
                    open
                    ? Object.entries(config)
                            .map(([index, item]) => {
                                if (!item) return null;
                                if (!isConfigWidget(item)) return null;

                                return <InputWidgetFactory value={item.state ?? item.defaultState}
                                                           index={index}
                                                           key={index}
                                                           item={item}
                                                           onChange={val => update(index as keyof VizConfigState, val)}/>;
                            })
                    : null
                }

            </div>
            <button className="primary" onClick={() => setOpen(!open)}>{open ? 'close' : 'edit'}</button>
        </div>
    )
        ;
}