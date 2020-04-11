import React from 'react';
import './App.css';

//Redux
import { Provider } from 'react-redux'
import store from './store'

import './App.css';

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;