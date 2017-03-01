export const CALC_REF_PLANE_SUCCESSFUL = 'CALC_REF_PLANE_SUCCESSFUL';
export const CALC_REF_PLANE_FAIL = 'CALC_REF_PLANE_FAIL';

/**
* if plane fit was successfull result will be emitted
*
* @param {number} x, y, z, i, j, k - response from middleware
*/
export const calcRefPlaneSuccessful = (x, y, z, i, j, k) => ({
  type: CALC_REF_PLANE_SUCCESSFUL,
  payload: { x, y, z, i, j, k },
});

/**
* if plane fit was not successfull error will be emitted
*
* @param {string} error
*/
export const calcRefPlaneFail = error => ({
  type: CALC_REF_PLANE_FAIL,
  payload: error,
});
