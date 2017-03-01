export const SCAN_CIRCLE_REQUEST = 'SCAN_CIRCLE_REQUEST';
export const SCAN_CIRCLE_SUCCESSFUL = 'SCAN_CIRCLE_SUCCESSFUL';
export const SCAN_CIRCLE_FAIL = 'SCAN_CIRCLE_FAIL';

/**
 * request for starting a scan measurement -> middleware
 *
 * @param
 */
export const scanCircleRequest = () => ({
  type: SCAN_CIRCLE_REQUEST,
});

/**
* if scan measurement was successfull new points will be emitted
*
* @param {Object} points - response from middleware
*/
export const scanCircleSuccessful = points => ({
  type: SCAN_CIRCLE_SUCCESSFUL,
  payload: points,
});

/**
* if scan measurement was not successfull error will be emitted
*
* @param {string} error
*/
export const scanCircleFail = error => ({
  type: SCAN_CIRCLE_FAIL,
  payload: error,
});

/**
* start scan measurement of circle element
*/
export const scanCircle = () => dispatch => dispatch(scanCircleRequest());
