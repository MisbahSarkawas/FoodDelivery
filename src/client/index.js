import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/fonts.css';
import './css/icons.css';
import AppContainer from './modules/app/components/AppContainer';
//import './scss/styles.scss';
import ReduxStore from './store/ReduxStore';
import { setAppStore } from './utils/AppUtil';

setAppStore(ReduxStore);

ReactDOM.render(<Provider store={ ReduxStore }>
    <AppContainer />
</Provider>, document.getElementById('root'));