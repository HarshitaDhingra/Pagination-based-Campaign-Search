
import { combineReducers } from 'redux';

import AppReducer from "../store/AppReducer";

const reducers = combineReducers({
    appReducer: AppReducer,
});

export default reducers;