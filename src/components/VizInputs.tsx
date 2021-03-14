import React, {useState} from 'react';
import {Height, PixelMeasurement, Width} from '../viz.types';
import {RangeInput} from './RangeInput';
import {useLocalStorage} from '../hooks/useLocalStorage';

export function VizInputs() {
    const [radius, setRadius]                 = useLocalStorage('viz::radius',
                                                                50);
    const [linkStrength, setLinkStrength]     = useLocalStorage('viz::linkStrength',
                                                                1);
    const [nodeStrength, setNodeStrength]     = useLocalStorage('viz::nodeStrength',
                                                                -0);
    const [height, setHeight]                 = useLocalStorage('viz::height',
                                                                500 as Height);
    const [width, setWidth]                   = useLocalStorage('viz::width',
                                                                500 as Width);
    const [svgHeight, setSvgHeight]           = useLocalStorage('viz::svgHeight',
                                                                (1 / 2) * height as Height);
    const [svgWidth, setSvgWidth]             = useLocalStorage('viz::svgWidth',
                                                                (1 / 2) * width as Width);
    const [offsetX, setOffsetX]               = useLocalStorage('viz::offsetX',
                                                                (1 / 2) * svgWidth as PixelMeasurement);
    const [offsetY, setOffsetY]               = useLocalStorage('viz::offsetY',
                                                                (1 / 2) * svgHeight as PixelMeasurement);
    const [boundingBox, setBoundingBox]       = useLocalStorage('viz::boundingBox',
                                                                0);
    const [centeringForce, setCenteringForce] = useLocalStorage('viz::center',
                                                                0);
    const [open, setOpen]                     = useState(false)
    let InputToggles                          =
            <div className="input-wrapper" key={'inputs'}
                 style={{
                     maxHeight:     '90vh',
                     display:       'flex',
                     flexDirection: 'column',
                     alignItems:    'center',
                     top:           0,
                     left:          0,
                 }}>
                <button onClick={e => setOpen(!open)}>{open ? 'close' : 'edit'}</button>
                {
                    open ? (<>
                            <RangeInput title={'Radius'}
                                        controller={[radius, setRadius]}
                                        step={.5}
                                        min={1}
                                        max={1000}/>
                            <RangeInput title={'Link Strength'}
                                        controller={[linkStrength, setLinkStrength]}
                                        step={1}
                                        min={-10000}
                                        max={10000}/>
                            <RangeInput title={'Node Strength'}
                                        controller={[nodeStrength, setNodeStrength]}
                                        step={.5}
                                        min={-10000}
                                        max={10000}/>
                            <RangeInput title={'Centering Force'}
                                        controller={[centeringForce, setCenteringForce]}
                                        step={.1}
                                        min={-10000}
                                        max={10000}/>
                            <RangeInput title={'Bounding Box'}
                                        controller={[boundingBox, setBoundingBox]}
                                        step={1}
                                        min={0}
                                        max={1}/>
                            <br/>
                            <RangeInput title={'Height'}
                                        controller={[height, setHeight]}
                                        step={.1}
                                        max={5000}/>
                            <RangeInput title={'Width'}
                                        controller={[width, setWidth]}
                                        step={.1}
                                        max={5000}/>
                            <RangeInput title={'Svg Width'} controller={[svgWidth, setSvgWidth]}
                                        step={.1}
                                        min={0}
                                        max={10000}/>
                            <RangeInput title={'Svg Height'}
                                        controller={[svgHeight, setSvgHeight]}
                                        step={.1}
                                        min={0}
                                        max={10000}/>
                            <RangeInput title={'OffsetX'}
                                        controller={[offsetX, setOffsetX]}
                                        step={.1}
                                        min={-10000}
                                        max={1000}/>
                            <RangeInput title={'OffsetY'}
                                        controller={[offsetY, setOffsetY]}
                                        step={.1}
                                        min={-10000}
                                        max={10000}/>

                        </>
                    ) : null
                }
            </div>
    return {
        props:     {
            linkStrength: linkStrength / 10000,
            nodeStrength: nodeStrength / 10,
            radius:       radius / 10,
            centeringForce,
            height,
            width,
            svgHeight,
            svgWidth,
            offsetX,
            offsetY,
            boundingBox,
        },
        Component: InputToggles,
    };
}