import React, {useCallback} from 'react';
import {VizConfigItem, VizConfigState} from '../config/types';
import {InputWidget} from './input/factory';
import {useLocalStorage} from '../../../../util/hooks/useLocalStorage';

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
            <button onClick={() => setOpen(!open)}>{open ? 'close' : 'edit'}</button>
            <div className={'app--config-widget-list'}>
                {
                    open
                    ? Object.entries(config)
                            .map(([index, item]) => {
                                if (!item) return;
                                return <InputWidget value={item.state ?? item.defaultState}
                                                    index={index}
                                                    item={item}
                                                    onChange={val => update(index as keyof VizConfigState, val)}/>;
                            })
                    : null
                }

            </div>
        </div>
    )
        ;
}