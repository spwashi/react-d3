import React from 'react';
import {Height, PixelMeasurement, Width} from './viz.types';
import {RangeInput} from './RangeInput';
import {useLocalStorage} from './util/useLocalStorage';

export function VizInputs() {
    const [radius, setRadius]                 = useLocalStorage('viz::radius',
                                                                50);
    const [radialDecay, setRadialDecay]       = useLocalStorage('viz::radialDecay',
                                                                1);
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
    const [steps, setSteps]                   = useLocalStorage('viz::steps',
                                                                12);
    const [count, setCount]                   = useLocalStorage('viz::count',
                                                                15);
    const [colorsCount, setColorsCount]       = useLocalStorage('viz::colorsCount',
                                                                400);
    const [theta, setTheta]                   = useLocalStorage('viz::theta',
                                                                2.99);
    const [centeringForce, setCenteringForce] = useLocalStorage('viz::center',
                                                                0);
    let InputToggles                          =
            <div className="input-wrapper" key={'inputs'}
                 style={{
                     maxHeight:     '90vh',
                     display:       'flex',
                     flexDirection: 'column',
                     alignItems:    'center',
                     position:      'fixed',
                     left:          0,
                     top:           0,
                 }}>
                <RangeInput title={'Radius'}
                            controller={[radius, setRadius]}
                            step={1}
                            min={1}
                            max={2000}/>
                <RangeInput title={'Link Strength'}
                            controller={[linkStrength, setLinkStrength]}
                            step={1}
                            min={-10000}
                            max={10000}/>
                <RangeInput title={'Node Strength'}
                            controller={[nodeStrength, setNodeStrength]}
                            step={1}
                            min={-1000}
                            max={1000}/>
                <RangeInput title={'Radial Decay'}
                            controller={[radialDecay, setRadialDecay]}
                            step={1}
                            min={-1000}
                            max={1000}
                />
                <RangeInput title={'Height'}
                            controller={[height, setHeight]}
                            step={.1}
                            max={5000}
                />
                <RangeInput title={'Width'}
                            controller={[width, setWidth]}
                            step={.1}
                            max={5000}
                />
                <RangeInput title={'Svg Width'} controller={[svgWidth, setSvgWidth]}
                            step={.1}
                            min={0}
                            max={10000}
                />
                <RangeInput title={'Svg Height'}
                            controller={[svgHeight, setSvgHeight]}
                            step={.1}
                            min={0}
                            max={10000}
                />
                <RangeInput title={'OffsetX'}
                            controller={[offsetX, setOffsetX]}
                            step={.1}
                            min={-10000}
                            max={1000}
                />
                <RangeInput title={'OffsetY'}
                            controller={[offsetY, setOffsetY]}
                            step={.1}
                            min={-10000}
                            max={10000}
                />
                <RangeInput title={'Steps'}
                            controller={[steps, setSteps]}
                            step={1}
                            min={0}
                            max={100000}
                />
                <RangeInput title={'Count'}
                            controller={[count, setCount]}
                            step={1}
                            min={3}
                            max={5000}
                />
                <RangeInput title={'Colors Count'}
                            controller={[colorsCount, setColorsCount]}
                            step={1}
                            min={1}
                            max={Math.max(count * 12, 1000)}
                />
                <RangeInput title={'Theta'}
                            controller={[theta, setTheta]}
                            step={.1}
                            min={-1000}
                            max={1000}
                />
                <RangeInput title={'Centering Force'}
                            controller={[centeringForce, setCenteringForce]}
                            step={1}
                            min={0}
                            max={1}
                />
            </div>;
    return {
        props:     {
            linkStrength: linkStrength / 10000,
            nodeStrength: nodeStrength / 10,
            radius:       radius / 10,
            radialDecay:  radialDecay,
            centeringForce,
            height,
            width,
            svgHeight,
            svgWidth,
            offsetX,
            offsetY,
            steps:        steps / 1000,
            count,
            colorsCount,
            theta,
        },
        Component: InputToggles,
    };
}