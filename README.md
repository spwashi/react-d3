# @spwashi/react-d3

React components for managing the lifecycle/events of data visualizations, built on top of [d3](https://d3js.org/).

## Overview

Check out the sample application in  `./src/app`; it has a configurable interface for tweaking graphs and/or force simulations live

### Installation

```bash
yarn add @spwashi/react-d3
# or
npm install @spwashi/react-d3
```

### Usage

See [this example](https://github.com/spwashi/react-d3/blob/master/src/App.tsx)


### To Do

For some reason, the current example app gets slower after a while. I suspect there's a leak when a data change triggers an update of the force layout