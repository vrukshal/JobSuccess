import { React } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './app/store';


ReactDOM.render(
    <Provider store={store}> {/* Wrap your App component with Provider */}
      <App />
    </Provider>,
    document.getElementById('root')
  );
