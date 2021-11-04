import React, {useEffect, useRef, useState} from 'react';
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
export function RangeInputControl(props: { title?: string; min?: number; max?: number; step?: number; controller: RangeInputController }) {
    const [step, setStep]         = useState(props.step === undefined ? 1 : props.step);
    const [max, setMax]           = useState(props.max === undefined ? 1 : props.max);
    const [min, setMin]           = useState(props.min === undefined ? 1 : props.min);
    const [expanded, setExpanded] = useState(false);
    const value                   = props.controller[0];
    const inputRef                = useRef<HTMLInputElement>(null);
    useEffect(
        () => {
            const el = inputRef.current;
            if (!el) return;

            let wheel = (e: WheelEvent): void => {
                e.preventDefault();
                const v = value + (step * Math.round(e.deltaY));
                props.controller[1](Math.max(Math.min(v, max), min));
            };
            el.addEventListener('wheel', wheel);

            return () => el.removeEventListener('wheel', wheel)
        },
        [value, min, max, step, inputRef, props.controller],
    );
    const setValue = props.controller[1];
    return (
        <div className="input-wrapper">
            <div className="control-wrapper">
                <input style={{display: 'block', width: '100%'}}
                       type="range"
                       ref={inputRef}
                       min={min}
                       max={max}
                       step={step}
                       value={value || ''}
                       onChange={e => setValue(+e.target.value)}/>
                <button onClick={() => setExpanded(!expanded)}>{expanded ? '-' : '+'}</button>
            </div>
            <div className="expanded-controls" style={{display: expanded ? 'block' : 'none'}}>
                <div>
                    <div className="label">Value</div>
                    <input type="number" value={value} onChange={e => setValue(+e.target.value)}/>
                </div>
                <div>
                    <div className="label">Step</div>
                    <input type="number" value={step} onChange={e => setStep(+e.target.value)}/>
                </div>
                <div>
                    <div className="label">Min</div>
                    <input type="number" value={min} onChange={e => setMin(+e.target.value)}/>
                </div>
                <div>
                    <div className="label">Max</div>
                    <input type="number" value={max} onChange={e => setMax(+e.target.value)}/>
                </div>

            </div>
        </div>
    )
}
