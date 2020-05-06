import React from 'react';
import App from './App';

//Redux
import { Provider } from 'react-redux';
import store from './store';

const AppProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
export default AppProvider;