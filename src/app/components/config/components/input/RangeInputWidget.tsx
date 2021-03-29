import React, {useEffect, useState} from 'react';
import {InputUpdateHandler} from './types';


export function RangeInputValue({value, setValue}: { value: number, setValue: (v: number) => void }) {
    const [mode, setMode]             = useState('view');
    const [inputValue, setInputValue] = useState<number | null>(null);

    function toggle() {
        setMode(mode === 'view' ? 'edit' : 'view');
    }
    const onSubmit = () => {
        setMode('view')
        if (!inputValue) return;
        setValue(inputValue);
        setInputValue(null);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!isNaN(Number(e.key)) && mode !== 'edit') {
            e.preventDefault();
            setInputValue(+e.key)
            setMode('edit');
        }
        [' ', 'Enter'].includes(e.key) && toggle();
    }
    return (
        <span tabIndex={0} onClick={toggle} onKeyDown={onKeyDown}>{
            mode === 'view'
            ? <span>{Math.trunc(value)}</span>
            : (
                <input style={{
                    background: 'white',
                    textAlign:  'right',
                    display:    'inline',
                    border:     'red',
                    padding:    'none',
                    color:      'inherit',
                }}
                       autoFocus
                       onFocus={e => setTimeout(() => value === inputValue && e.target.select(), 50)}
                       type="text"
                       value={inputValue ?? value}
                       onChange={e => {
                           const number = parseInt(e.target.value);
                           if (isNaN(number)) return;
                           setInputValue(number)
                       }}
                       onBlur={onSubmit}/>
            )
        }</span>
    );
}


export type RangeInputController = [number, InputUpdateHandler<number>];
export function RangeInputControl(props: { title?: string; min?: number; max?: number; step?: number; controller: RangeInputController }, inputRef: React.RefObject<HTMLDivElement>) {
    const step = props.step === undefined ? 1 : props.step;
    const max  = props.max === undefined ? 5 : props.max;
    const min  = props.min === undefined ? 0 : props.min;
    useEffect(
        () => {
            const el = inputRef.current;
            if (!el) return;

            let wheel = (e: WheelEvent): void => {
                e.preventDefault();
                const v = props.controller[0] + (step * Math.round(e.deltaY));
                props.controller[1](Math.max(Math.min(v, max), min));
            };
            el.addEventListener('wheel', wheel);

            return () => el.removeEventListener('wheel', wheel)
        },
        [props.controller[0], min, max, props.controller[1], step, inputRef],
    );
    let input = <input style={{display: 'block', width: '100%'}}
                       type="range"
                       min={min}
                       max={max}
                       step={step}
                       value={props.controller[0] || ''}
                       onChange={e => props.controller[1](+e.target.value)}/>;
    return input
}
