import styled from 'styled-components';

export const AppWrapper =
                 styled.div`
                     border: thin solid rgba(255, 255, 255, .2);
                     background: #999;
                     width: 100%;
                     svg {
                         background: rgba(300, 125, 50, .01);
                         box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.05),
                             -8px -8px 12px 0 rgba(200, 200, 200, 0.05);;
                     }

                     .input-container { padding: .5rem; }
                     .input-wrapper {
                         padding-bottom: 1rem;
                         .control-wrapper {
                            display: flex;
                         }
                         input {
                             margin: 0;
                             padding: 0;
                         }
                     }

                     display: flex;
                     .d3app-wrapper-inner {
                         position: relative;
                         display: flex;
                         justify-content: center;
                         height: 100vh;
                         width: 100%;
                         border: thick solid red;
                         .viz-wrapper {
                             min-height: 200px;
                             display: flex;
                             align-items: center;
                             justify-content: center;
                         }
                         .viz-wrapper {
                             display: flex;
                             width: 100%;
                         }
                         .d3app__config-widget-wrapper {
                             position: absolute;
                             flex-direction: row;
                             top: 0;
                             left: 0;
                             color: white;
                             padding: 0 2rem;
                             max-height: 100vh;
                             font-size: 1rem;
                             font-family: "JetBrains Mono", monospace;
                             display: flex;
                             .d3app__config-widget {
                                 .d3app__config-widget-list {
                                     overflow: scroll;
                                     display: grid;
                                     grid-template-columns: 1fr 1fr;
                                 }
                                 display: flex;
                                 resize: both;
                                 flex-direction: column-reverse;
                                 .title {
                                     font-weight: bold;
                                     margin-right: 2rem;
                                 }
                                 .value {
                                     font-size: .7em;
                                 }
                                 .input-wrapper {
                                     background: rgba(0, 0, 0, .7);
                                     padding: .5rem;
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
                             button.primary {
                                 cursor: pointer;
                                 width: 100%;
                                 font-size: 2rem;
                             }
                         }
                     }
                 `;