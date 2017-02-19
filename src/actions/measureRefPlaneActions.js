export const MEASURE_POINT_ON_PLANE_REQUEST = 'MEASURE_POINT_ON_PLANE_REQUEST';
export const MEASURE_POINT_ON_PLANE_SUCCESSFUL = 'MEASURE_POINT_ON_PLANE_SUCCESSFUL';
export const MEASURE_POINT_ON_PLANE_FAIL = 'MEASURE_POINT_ON_PLANE_FAIL';

/**
 * request for starting a new single point measurement -> middleware
 *
 * @param
 */
export const measurePointOnPlaneRequest = () => ({
  type: MEASURE_POINT_ON_PLANE_REQUEST,
});

/**
* if measurement was successfull new point will be emitted
*
* @param {Object} Point - resposne from middleware - x y z
*/
export const measurePointOnPlaneSuccessful = point => ({
  type: MEASURE_POINT_ON_PLANE_SUCCESSFUL,
  payload: point,
});

/**
* if measurement was not successfull error will be emitted
*
* @param {string} error
*/
export const measurePointOnPlaneFail = error => ({
  type: MEASURE_POINT_ON_PLANE_FAIL,
  payload: error,
});


/**
* start measurement a point on the flange
*/
export const measurePointOnPlane = () => dispatch => dispatch(measurePointOnPlaneRequest());
