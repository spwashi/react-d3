# @spwashi/react-d3

React components meant to manage the lifecycle/events of a data visualization created using [d3](https://d3js.org/).

## Overview

The included sample application in the `./src/app` directory is an example of how I'd organize a d3 project with scaleability in mind.

### Installation

```bash
yarn add @spwashi/react-d3
# or
npm install @spwashi/react-d3
```

### Usage

See [this example usage](https://github.com/spwashi/react-d3/blob/master/src/App.tsx) of this library


### To Do

For some reason, the current example app gets slower after a while. I suspect there's a leak when a data change triggers an update of the force layout