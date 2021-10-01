import styled from 'styled-components';

export const AppWrapper =
                 styled.div`
                     border: thin solid #666;
                     svg { border: thick solid black; }

                     .input-container { padding: 1rem; }
                     .input-wrapper {
                         padding-bottom: 1rem;
                         input {
                             margin: 0;
                             padding: 0;
                         }
                     }

                     display: flex;
                     .d3app-wrapper-inner {
                         position: relative;
                         display: inline-flex;
                         align-items: center;
                         justify-content: center;
                         .viz-wrapper {
                             min-height: 200px;
                             display: flex;
                             align-items: center;
                         }
                         .viz-wrapper {
                             display: flex;
                             width: 100%;
                         }
                         .d3app__config-widget-wrapper {
                             position: fixed;
                             align-content: stretch;
                             flex-direction: row;
                             bottom: 1rem;
                             left: 1rem;
                             color: white;
                             background: rgba(0, 0, 0, .7);
                             padding: .5rem;
                             font-family: "JetBrains Mono", monospace;
                             display: block;
                             .d3app__config-widget {
                                 display: flex;
                                 flex-direction: column-reverse;
                                 .title {
                                     font-weight: bold;
                                     margin-right: 2rem;
                                 }
                                 .value {
                                     font-size: .7em;
                                 }
                                 .input-wrapper {
                                     padding: .2rem;
                                     margin: .2rem;
                                     border-bottom: thin solid rgba(255, 255, 255, .3);
                                     &:focus-within, &:hover {
                                         background: rgba(108, 133, 164, .3);
                                     }
                                 }
                             }
                             input[type=range] {
                                 cursor: ew-resize;
                             }
                             button {
                                 cursor: pointer;
                                 width: 100%;
                             }
                         }
                     }
                 `;