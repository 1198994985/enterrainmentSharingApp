import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import createLogger from 'redux-logger' // 利用redux-logger打印日志
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./reducers";


//创建store
const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
