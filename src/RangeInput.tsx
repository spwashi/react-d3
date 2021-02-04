import React, {useEffect, useState} from 'react';

export function RangeInput(
    {step = 1, title, max = 5, min = 0, controller: [value, setValue]}:
        { title?: string, min?: number, max?: number, step?: number, controller: [number, (n: number) => any] },
) {
    const bottom   = '10px';
    const inputRef = React.createRef<HTMLDivElement>();
    useEffect(
        () => {
            const el = inputRef.current;
            if (!el) return;

            let wheel = (e: WheelEvent): void => {
                e.preventDefault();
                const v = value + (step * Math.round(e.deltaY ));
                setValue(Math.max(Math.min(v, max), min));
            };
            el.addEventListener('wheel', wheel);

            return () => el.removeEventListener('wheel', wheel)
        },
        [value, min, max],
    );
    const [o, setO] = useState(false);

    const [width, setWidth] = useState(300);


    let percentage = value / ((max - min) || 1);
    return (
        <div
            ref={inputRef}
            style={{
                borderBottom:  'thin solid rgba(255, 255, 255, .3)',
                paddingBottom: bottom,
                paddingTop:    bottom,
                position:      'relative',
                fontSize:      '10px',
                width:         width + 'px',
            }}>
            <div style={{display: 'flex', flexDirection: 'column', fontSize: '10px', alignItems: 'center'}}>
                <div style={{
                    height:        '100%',
                    width:         (width * Math.abs(percentage)) + 'px',
                    position:      'absolute',
                    top:           0,
                    pointerEvents: 'none',
                    background:    value > 0 ? 'white' : 'red',
                    opacity:       .3,
                }}/>
                <strong onClick={e => setO(!o)}>{title}</strong>
                {
                    !o ? <span style={{position: 'absolute', right: 0}}>{`${value}`}</span>
                       : <span>{`${value}`}</span>
                }
            </div>
            <div style={{display: o ? 'flex' : 'none', position: 'absolute', width: '100%', top: 0, color: 'gray'}}>
                <div className="number">{min}</div>
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value))}
                    type="range"
                    min={min} max={max} value={value} step={step}
                    style={{width: '100%', visibility: 'hidden', height: 0}}/>
                <div className="number">{max}</div>
            </div>
        </div>
    );
}