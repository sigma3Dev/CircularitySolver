// @flow

import {
  MEASURE_POINT_ON_PLANE_SUCCESSFUL,
  MEASURE_POINT_ON_PLANE_FAIL,
} from '../actions/measureRefPlaneActions';

/**
 * Holds the initial reference plane state.
 *
 * @type {{initialRefPlane: {points: array}}}
 */
const initialRefPlane = {
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
    case MEASURE_POINT_ON_PLANE_FAIL:
    default:
      return state;
  }
};

export default refPlaneReducer;
