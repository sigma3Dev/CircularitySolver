// @flow

import {
  MEASURE_POINT_ON_PLANE_SUCCESSFUL,
  MEASURE_POINT_ON_PLANE_FAIL,
} from '../actions/measureRefPlaneActions';

import {
  CALC_REF_PLANE_SUCCESSFUL,
} from '../actions/calcRefPlaneActions';

/**
 * Holds the initial reference plane state.
 *
 * @type {{initialRefPlane: {points: array}}}
 */
const initialRefPlane = {
  x: 0.0,
  y: 0.0,
  z: 0.0,
  i: 0.0,
  j: 0.0,
  k: 0.0,
  points: [],
};

/**
 * Calculates the next reference plane state depending on a specific action.
 *
 * @param state
 * @param action
 * @returns {*}
 */
const refPlaneReducer = (state = initialRefPlane, action) => {
  switch (action.type) {
    case MEASURE_POINT_ON_PLANE_SUCCESSFUL: {
      if (state.points.length === 4 || action.payload == null) {
        return state;
      }
      const newPointSet = [...state.points, action.payload];
      return {
        ...state,
        points: newPointSet,
      };
    }
    case CALC_REF_PLANE_SUCCESSFUL: {
      if (action.payload == null) {
        return state;
      }
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.x,
        z: action.payload.x,
        i: action.payload.x,
        j: action.payload.x,
        k: action.payload.x,
      };
    }
    case MEASURE_POINT_ON_PLANE_FAIL:
    default:
      return state;
  }
};

export default refPlaneReducer;
