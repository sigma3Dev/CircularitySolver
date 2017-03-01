// @flow

import {
  SCAN_CIRCLE_SUCCESSFUL,
  SCAN_CIRCLE_FAIL,
} from '../actions/scanCircleActions';

import { CALC_CIRCULARITY_SUCCESSFUL } from '../actions/calcCircularityActions';

/**
 * Holds the initial circle state.
 *
 * @type {{initialRefPlane: {points: array}}}
 */
const initialCircle = {
  radius: 0,
  circularity: 0,
  measurements: [],
};

/**
 * Calculates the circle state depending on a specific action.
 *
 * @param state
 * @param action
 * @returns {*}
 */
const circleReducer = (state = initialCircle, action) => {
  switch (action.type) {
    case SCAN_CIRCLE_SUCCESSFUL: {
      if (action.payload == null) {
        return state;
      }
      return {
        ...state,
        measurements: action.payload,
      };
    }
    case CALC_CIRCULARITY_SUCCESSFUL: {
      if (action.payload == null) {
        return state;
      }
      return {
        ...state,
        circularity: action.payload.circularity,
        radius: action.payload.radius,
      };
    }
    case SCAN_CIRCLE_FAIL:
    default:
      return state;
  }
};

export default circleReducer;
