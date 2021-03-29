import React, {useCallback, useState} from 'react';
import {VizConfigItem, VizConfigState} from '../config/types';
import {InputWidget} from './input/factory';

type Props = {
    config: VizConfigState,
    updateValues: (i: VizConfigState) => void
};

export function ConfigWidget({config, updateValues}: Props) {
    const [open, setOpen] = useState(false);
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
            <button onClick={e => setOpen(!open)}>{open ? 'close' : 'edit'}</button>
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