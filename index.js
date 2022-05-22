import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name} from './app.json';
import {i18n} from '@services'; // need for React i18n initialization
import OtherApp from './src/screens/RNRExamples/src/App';
import Test from './Test';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(name, () => App);
