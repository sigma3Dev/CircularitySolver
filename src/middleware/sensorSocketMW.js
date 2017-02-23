import * as sensorCmd from 's3d-sensor-commands';
import * as sensorActions from '../actions/sensorActions';

import {
  MEASURE_POINT_ON_PLANE_REQUEST,
  measurePointOnPlaneSuccessful,
  measurePointOnPlaneFail,
} from '../actions/measureRefPlaneActions';

import {
  SCAN_CIRCLE_REQUEST,
  scanCircleSuccessful,
  scanCircleFail,
} from '../actions/scanCircleActions';

// script variables
const activeCmd = { id: 0, type: '' };
let websocket;

/**
 * Initialize the connection between webservice(websocket) and
 * app if the html page refreshes
 *
 * @param evt
 */
export const initWebSocket = (store) => {
  /**
  * as soon as the connection between Trackerpad and webservice is open
  * the function OnOpen will be triggered
  * onOpen successful -> you can communicate with the service
  *
  * @param evt
  */
  const onOpen = (evt) => {};
  // if the onOpen not successful -> onClose will be  triggered
  const onClose = (evt) => {};

  // if there is an error during the connection -> onErro will be triggered
  const onError = (evt) => {
    console.log(evt.data);
  };

  // dispatch specific action to trigger update
  const onMessage = (evt) => {
    const response = JSON.parse(evt.data);

    if (response == null) {
      // dispatch sensorErrorAction('sensor response is null')
      console.log('sensor response is null');
      return;
    }

    if (response.error != null) {
      // dispatch sensorErrorAction(response.error.errorMsg)
      console.log(response.error.errorMsg);
      return;
    }

    // checks if activeCmd.Type is right and if evt.data.id matchs with activeCmd.id
    if (activeCmd.type === 'connect' && activeCmd.id === response.id) {
      if (response.result.successful) {
        store.dispatch(sensorActions.connectSensorSuccessful(response));
        return;
      }
      store.dispatch(sensorActions.connectSensorFail(response));
    } else if (
      activeCmd.type === 'disconnect' && activeCmd.id === response.id
    ) {
      if (response.result.successful) {
        store.dispatch(sensorActions.disConnectSensorSuccessful(response));
      } else {
        store.dispatch(sensorActions.disConnectSensorFail(response));
      }
    } else if (
      activeCmd.type === 'chooseFaroIon' && activeCmd.id === response.id
    ) {
      if (response.error == null) {
        store.dispatch(sensorActions.chooseFaroIonSuccessful(response));
        store.dispatch(sensorActions.connectSensor());
      } else {
        store.dispatch(sensorActions.chooseFaroIonFail(response));
      }
    } else if (
      activeCmd.type === 'chooseFaroVantage' && activeCmd.id === response.id
    ) {
      if (response.error == null) {
        store.dispatch(sensorActions.chooseFaroVantageSuccessful(response));
        store.dispatch(sensorActions.connectSensor());
      } else {
        store.dispatch(sensorActions.chooseFaroVantageFail(response));
      }
    } else if (
      activeCmd.type === 'measureRefPlane' && activeCmd.id === response.id
    ) {
      console.log(response)
      if (response.error == null && response.result.observationCount !== 0) {
        const singlePointMeasurement = {
          coords: {
            x: response.result.observations[0].values[0],
            y: response.result.observations[0].values[1],
            z: response.result.observations[0].values[2],
          },
        };
        store.dispatch(measurePointOnPlaneSuccessful(singlePointMeasurement));
      } else {
        store.dispatch(measurePointOnPlaneFail(response));
      }
    } else if (
      activeCmd.type === 'scanCircleRequest' && activeCmd.id === response.id
    ) {
      console.log('scanning request');
      console.log(response)
      if (response.error == null) {
        activeCmd.id += 1;
        activeCmd.type = 'scanCircleMeasurement';
        websocket.send(sensorCmd.measure(activeCmd.id));
      } else {
        store.dispatch(scanCircleFail(response));
      }
    } else if (
      activeCmd.type === 'scanCircleMeasurement' && activeCmd.id === response.id
    ) {
      console.log('scan result')
      console.log(response);
      if (response.error == null && response.result.observationCount !== 0) {
        store.dispatch(scanCircleSuccessful(response.result.observations));
      } else {
        store.dispatch(scanCircleFail(response));
      }
    } else {
      console.log('no valid response from sensor service');
    }
  };

  /*
  * socket Connection callbacks
  * set local const to functions with the value 'evt'
  */
  websocket = new WebSocket('ws://127.0.0.1:8090');
  websocket.onopen = (evt) => {
    onOpen(evt);
  };
  websocket.onclose = (evt) => {
    onClose(evt);
  };
  websocket.onmessage = (evt) => {
    onMessage(evt);
  };
  websocket.onerror = (evt) => {
    onError(evt);
  };
};

/**
 * Middleware that reacts on specific actions and sends sensor tasks to the
 * backend via websocket connection.
 * @param store
 */
export const sensorSocketMiddleware = store => next => (action) => {
  // init local var
  const result = next(action);

  // react on specific actions. actions descripted in the sensorAction.js
  switch (action.type) {
    case sensorActions.CONNECT_SENSOR_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'connect';
      websocket.send(sensorCmd.connect(activeCmd.id));
      break;
    }
    case sensorActions.DISCONNECT_SENSOR_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'disconnect';
      websocket.send(sensorCmd.disconnect(activeCmd.id));
      break;
    }
    case sensorActions.CHOOSE_FAROION_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'chooseFaroIon';
      websocket.send(sensorCmd.chooseFaroIon(activeCmd.id, '128.128.128.100'));
      break;
    }
    case sensorActions.CHOOSE_VANTAGE_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'chooseFaroVantage';
      websocket.send(sensorCmd.chooseFaroVantage(activeCmd.id, '128.128.128.100'));
      break;
    }
    case MEASURE_POINT_ON_PLANE_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'measureRefPlane';
      websocket.send(sensorCmd.measure(activeCmd.id));
      break;
    }
    case SCAN_CIRCLE_REQUEST: {
      activeCmd.id += 1;
      activeCmd.type = 'scanCircleRequest';
      websocket.send(sensorCmd.setScanByDistanceConfig(activeCmd.id, 1, 1300, 0.001));
      break;
    }
    default:
  }
  return result;
};
