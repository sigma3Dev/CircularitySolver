export const CALC_CIRCULARITY_SUCCESSFUL = 'CALC_CIRCULARITY_SUCCESSFUL';
export const CALC_CIRCULARITY_FAIL = 'CALC_CIRCULARITY_FAIL';

/**
* if circularity calculation was successfull result will be emitted
*
* @param {number} circularity - response from middleware
*/
export const calcCircularitySuccessful = (circularity, radius) => ({
  type: CALC_CIRCULARITY_SUCCESSFUL,
  payload: { circularity, radius },
});

/**
* if scan measurement was not successfull error will be emitted
*
* @param {string} error
*/
export const calcCircularityFail = error => ({
  type: CALC_CIRCULARITY_FAIL,
  payload: error,
});
