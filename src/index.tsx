import ReactDOM from 'react-dom';
import {DefaultApplication} from './App';

export {ConfigWidget} from './app/components/config/components/ConfigWidget';
export {Visualization} from './simulation/components/Visualization';

ReactDOM.render(<DefaultApplication/>, document.getElementById('root'));