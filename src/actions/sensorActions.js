export const SET_SENSOR_REQUEST = 'SET_SENSOR_REQUEST';
export const SET_SENSOR_SUCCESSFUL = 'SET_SENSOR_SUCCESSFUL';
export const SET_SENSOR_FAIL = 'SET_SENSOR_FAIL';

export const CONNECT_SENSOR_REQUEST = 'CONNECT_SENSOR_REQUEST';
export const CONNECT_SENSOR_SUCCESSFUL = 'CONNECT_SENSOR_SUCCESSFUL';
export const CONNECT_SENSOR_FAIL = 'CONNECT_SENSOR_FAIL';

export const DISCONNECT_SENSOR_REQUEST = 'DISCONNECT_SENSOR_REQUEST';
export const DISCONNECT_SENSOR_SUCCESSFUL = 'DISCONNECT_SENSOR_SUCCESSFUL';
export const DISCONNECT_SENSOR_FAIL = 'DISCONNECT_SENSOR_FAIL';

export const CHOOSE_FAROION_REQUEST = 'CHOOSE_FAROION_REQUEST';
export const CHOOSE_FAROION_SUCCESSFUL = 'CHOOSE_FAROION_SUCCESSFUL';
export const CHOOSE_FAROION_FAIL = 'CHOOSE_FAROION_FAIL';

export const CHOOSE_VANTAGE_REQUEST = 'CHOOSE_VANTAGE_REQUEST';
export const CHOOSE_VANTAGE_SUCCESSFUL = 'CHOOSE_VANTAGE_SUCCESSFUL';
export const CHOOSE_VANTAGE_FAIL = 'CHOOSE_VANTAGE_FAIL';

export function chooseFaroIonRequest() {
  console.log('ich bin hier bei chooseFaroIonRequest');
  return {
    type: CHOOSE_FAROION_REQUEST,
  };
}
export function chooseFaroIonSuccessful(response) {
  console.log('hier bin ich beim faroionsuccesfull');
  return {
    type: CHOOSE_FAROION_SUCCESSFUL,
    response,
  };
}
export function chooseFaroIonFail(error) {
  console.log('hier bin ich beim FAROIONFAIL');
  return {
    type: CHOOSE_FAROION_FAIL,
    error,
  };
}

export function chooseFaroVantageRequest() {
  console.log('ich bin hier bei chooseFaroVantageRequest');
  return {
    type: CHOOSE_VANTAGE_REQUEST,
  };
}
export function chooseFaroVantageSuccessful(response) {
  console.log('hier bin cih beim chooseFaroVantageSuccessful');
  return {
    type: CHOOSE_VANTAGE_SUCCESSFUL,
    response,
  };
}
export function chooseFaroVantageFail(error) {
  console.log('hier bin cih beim FAROIONFAIL');
  return {
    type: CHOOSE_VANTAGE_FAIL,
    error,
  };
}

export function setSensorFail(error) {
  console.log('ich bin hier bei setSensorFail Failure');
  return {
    type: SET_SENSOR_FAIL,
    error,
  };
}

export function setSensor(sensor) {
  if (sensor === 'FaroIon') {
    return (dispatch) => {
      dispatch(chooseFaroIonRequest());
    };
  } else if (sensor === 'FaroVantage') {
    return (dispatch) => {
      dispatch(chooseFaroVantageRequest());
    };
  }
  const error = 'There´s something wrong ';
  return (dispatch) => {
    dispatch(setSensorFail(error));
  };
}

/**
 *actioncreator for the connectSensor() method
 *action will be fired as request
 * @param
 */
export function connectSensorRequest() {
  return {
    type: CONNECT_SENSOR_REQUEST,
  };
}

/**
*actioncreator for the connectSensor() method
*action will be fired as response
* @param {string} response - might be the response from the middleware
*/
export function connectSensorSuccessful(response) {
  return {
    type: CONNECT_SENSOR_SUCCESSFUL,
    response,
  };
}

/**
*actioncreator for the connectSensor() method.
*action will be fired if the connection fails.
* @param {string} error
*/
export function connectSensorFail(error) {
  return {
    type: CONNECT_SENSOR_FAIL,
    error,
  };
}

/**
* Checks if a sensor(Tracker) is already choosen,
* then dispatches an action from above
* @param {string} sensor
* @param {string} error
* @param {string} response
*/
export function connectSensor(activeSensor) {
  if (activeSensor === 'none') {
    const error = 'Puh, that shouldnt happened';
    return (dispatch) => {
      dispatch(connectSensorFail(error));
    };
  }
  return (dispatch) => {
    dispatch(connectSensorRequest());
  };
}

/**
 *actioncreator for the disConnectSensor() method
 *action will be fired as request
 * @param
 */
export function disConnectSensorRequest() {
  return {
    type: DISCONNECT_SENSOR_REQUEST,
  };
}

/**
*actioncreator for the disConnectSensor() method
*action will be fired as response
* @param {string} response - might be the response from the middleware
*/
export function disConnectSensorSuccessful(response) {
  return {
    type: DISCONNECT_SENSOR_SUCCESSFUL,
    response,
  };
}

/**
*actioncreator for the disConnectSensor() method.
*action will be fired if the disconnect fails(which is...strange).
* @param {string} error
*/
export function disConnectSensorFail(error) {
  return {
    type: DISCONNECT_SENSOR_FAIL,
    error,
  };
}

/**
* Checks if a sensor(Tracker) is already choosen,
* then dispatches an action from above
* @param {string} sensor
* @param {string} error
* @param {string} response
*/
export function disConnectSensor(activeSensor) {
  if (activeSensor === 'none') {
    const error = 'no Sensor chosen';
    return (dispatch) => {
      dispatch(disConnectSensorFail(error));
    };
  }
  return (dispatch) => {
    dispatch(disConnectSensorRequest());
  };
}
