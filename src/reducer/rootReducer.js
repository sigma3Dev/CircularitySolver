import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';
import circleReducer from './circleReducer';
import refPlaneReducer from './refPlaneReducer';

/**
 * Combines the reducers to one root reducer.
 */
const rootReducer = combineReducers({
  sensor: sensorReducer,
  circle: circleReducer,
  refPlane: refPlaneReducer,
});

export default rootReducer;
