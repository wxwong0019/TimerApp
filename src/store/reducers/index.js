import { combineReducers } from 'redux';
import timersReducer from './timersReducer';

const reduces = combineReducers({
  timersReducer: timersReducer,
});

export default reduces;
