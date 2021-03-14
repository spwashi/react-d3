import React, {useEffect, useState} from 'react';

function RangeInputValue({value, setValue}: { value: number, setValue: (v: number) => void }) {
    const [mode, setMode]             = useState('view');
    const [inputValue, setInputValue] = useState<number | null>(null);

    function toggle() {
        setMode(mode === 'view' ? 'edit' : 'view');
    }
    const onSubmit = () => inputValue && (setValue(inputValue), setInputValue(null), toggle());

    return (
        <span style={{position: 'absolute', right: 0}}>{
            mode === 'view'
            ? <span onClick={() => { toggle(); }}>{Math.trunc(value)}</span>
            : (
                <input
                    style={{
                        background: 'inherit',
                        textAlign:  'right',
                        border:     'rgba(255,255,255, .3)',
                        padding:    'none',
                        display:    'none',
                        color:      'inherit',
                    }}
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
export function RangeInput(
    {step = 1, title, max = 5, min = 0, controller: [value, setValue]}:
        { title?: string, min?: number, max?: number, step?: number, controller: [number, (n: number) => any] },
) {
    const bottom   = '5px';
    const inputRef = React.createRef<HTMLDivElement>();
    useEffect(
        () => {
            const el = inputRef.current;
            if (!el) return;

            let wheel = (e: WheelEvent): void => {
                e.preventDefault();
                const v = value + (step * Math.round(e.deltaY));
                setValue(Math.max(Math.min(v, max), min));
            };
            el.addEventListener('wheel', wheel);

            return () => el.removeEventListener('wheel', wheel)
        },
        [value, min, max],
    );

    const [width, setWidth] = useState(300);


    let percentage = value / ((max - min) || 1);
    const negative = percentage < 0;
    return (
        <div
            ref={inputRef}
            style={{
                borderBottom:  'thin solid rgba(255, 255, 255, .1)',
                paddingBottom: bottom,
                paddingTop:    bottom,
                position:      'relative',
                fontSize:      '10px',
                width:         width + 'px',
            }}>
            <div style={{display: 'flex', flexDirection: 'column', fontSize: '10px', alignItems: 'flex-start'}}>
                <div style={{
                    height:        '100%',
                    width:         (width * Math.abs(percentage)) + 'px',
                    position:      'absolute',
                    top:           0,
                    pointerEvents: 'none',
                    background:    value > 0 ? 'white' : 'red',

                    left:    negative ? 'auto' : 0,
                    right:   negative ? '100%' : 'auto',
                    opacity: negative ? .3 : .1,
                }}/>
                <strong>{title}</strong>
                {<RangeInputValue value={value} setValue={setValue}/>}
            </div>
        </div>
    );
}