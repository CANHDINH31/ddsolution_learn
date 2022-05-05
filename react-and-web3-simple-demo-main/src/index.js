import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from'redux-thunk'
import 'antd/dist/antd.css';


const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById("root"));
