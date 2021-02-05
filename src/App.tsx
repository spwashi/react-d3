import React, {useMemo} from 'react';
import './App.css';
import {Viz} from './lib/Viz';
import {useData} from './lib/data';
import {VizInputs} from './lib/VizInputs';

function App() {
    let {
            props:     props,
            Component: InputToggles,
        } = VizInputs();

    const {
              radius,
              radialDecay,
              nodeStrength,
              linkStrength,
              height,
              width,
              offsetX,
              offsetY,
              steps,
              count,
              colorsCount,
              theta,
              centeringForce,
              svgWidth,
              svgHeight,
          } = props;

    const svgSize  = {width: svgWidth, height: svgHeight};
    const nodeInfo = {count, steps, theta, radius, radialDecay};
    const data     = useData('list_1', nodeInfo, svgSize);
    const links    = useMemo(() =>
                                 [
                                     {source: 1, target: 0},
                                 ], [data]);
    return (
        <div className="App">
            <div className="App-wrapper">
                <div style={{width: '50%'}}>
                    <Viz
                        forces={{
                            center: !!centeringForce,
                        }}
                        data={data}
                        links={links}
                        nodeStrength={nodeStrength}
                        linkStrength={linkStrength}
                        radius={radius}
                        radialDecay={radialDecay}
                        colorsCount={colorsCount}
                        svgHeight={svgHeight}
                        svgWidth={svgWidth}
                        offsetX={offsetX}
                        offsetY={offsetY}
                        width={width}
                        height={height}
                    />
                </div>
                {InputToggles}
            </div>
        </div>
    );
}

export default App;
