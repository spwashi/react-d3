import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


export {};


const AppWrapper =
          styled.div`
              background: yellow;
          `

function App() {
    return <AppWrapper>
        boon
    </AppWrapper>;
}

ReactDOM.render(<App/>, document.getElementById('root'))