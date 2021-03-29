import {RangeVizConfigItem, VizConfigItem} from '../../config/types';
import {RangeInputControl, RangeInputController, RangeInputValue} from './RangeInputWidget';
import React from 'react';
import {InputUpdateHandler} from './types';
import {InputWidgetWrapper} from './Wrapper';

interface InputItemParams<T = any> {
    item: VizConfigItem;
    value: number;
    index: string;
    onChange: InputUpdateHandler<T>;
}

function ToggleInput({value, onChange}: { value: boolean, onChange: (state: boolean) => void }) {
    return <input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)}/>
}
export function InputWidget({item, value, index, onChange}: InputItemParams) {
    const {type} = item;
    let valueComponent: JSX.Element | any;
    let inputComponent: JSX.Element | any;
    switch (type) {
        case 'range': {
            const {step, min, max}               = item as RangeVizConfigItem;
            let controller: RangeInputController = [value || 0, onChange];
            valueComponent                       = <RangeInputValue value={controller[0]} setValue={controller[1]}/>;
            inputComponent                       = <RangeInputControl step={step}
                                                                      min={min}
                                                                      max={max}
                                                                      controller={controller}/>;
            break;
        }
        case 'toggle': {
            valueComponent = value ? 'yes' : 'no';
            inputComponent = <ToggleInput value={!!value} onChange={onChange}/>
            break;
        }
        default:
            return <>{`undefined input type ${type}`}</>;
    }

    return <InputWidgetWrapper title={index} input={inputComponent} value={valueComponent}/>
}