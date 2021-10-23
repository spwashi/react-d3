import {createGlobalStyle} from 'styled-components';

export const GlobalStyle =
                 createGlobalStyle`
                     body, html, #root {
                         padding: 0;
                         margin: 0;
                         height: 100vh;
                     }

                     #root {
                         background: #bce9ff;
                         display: flex;
                         align-items: center;
                     }
                 `;