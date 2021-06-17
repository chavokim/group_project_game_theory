import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootStore from "./common/modules/RootStore";

const rootStore = new RootStore();
export const StoresContext = createContext(rootStore);

ReactDOM.render(
    <StoresContext.Provider value={rootStore}>
        <App />
    </StoresContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
