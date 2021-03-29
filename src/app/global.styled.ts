import {createGlobalStyle} from 'styled-components';

export const GlobalStyle =
                 createGlobalStyle`
                     body, html, #root {
                         padding: 0;
                         margin: 0;
                         height: 100vh;
                     }

                     #root {
                         background: #a991c4;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                     }
                 `;