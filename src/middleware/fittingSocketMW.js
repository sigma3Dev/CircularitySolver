import * as fitting from 's3d-fitting-commands';
import { hashHistory } from 'react-router';
import {
  MEASURE_POINT_ON_PLANE_SUCCESSFUL,
} from '../actions/measureRefPlaneActions';

import { calcRefPlaneSuccessful } from '../actions/calcRefPlaneActions';

import { SCAN_CIRCLE_SUCCESSFUL } from '../actions/scanCircleActions';

import { calcCircularitySuccessful } from '../actions/calcCircularityActions';

// script variables
const activeCmd = { id: 0, type: '' };
let websocket;

/**
 * Initialize the connection between webservice(websocket) and
 * app if the html page refreshes
 *
 * @param evt
 */
export const initFittingWebSocket = (store) => {
  /**
  * as soon as the connection between Trackerpad and webservice is open
  * the function OnOpen will be triggered
  * onOpen successful -> you can communicate with the service
  *
  * @param evt
  */
  const onOpen = evt => {};
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
    if (activeCmd.type === 'fittingCircle' && activeCmd.id === response.id) {
      if (response.error == null) {
        store.dispatch(calcCircularitySuccessful(response.result.tschebyDistance, response.result.radius));
        hashHistory.push('/circularityresult')
      }
    } else if (
      activeCmd.type === 'projectPoints' && activeCmd.id === response.id
    ) {
      if (response.error == null) {
        activeCmd.id += 1;
        activeCmd.type = 'fittingCircle';
        websocket.send(
          fitting.fitCircle3DTscheby(response.result.points, activeCmd.id),
        );
      }
    } else if (
      activeCmd.type === 'calcRefPlane' && activeCmd.id === response.id
    ) {
      if (response.error == null) {
        store.dispatch(
          calcRefPlaneSuccessful(
            response.result.x,
            response.result.y,
            response.result.z,
            response.result.i,
            response.result.j,
            response.result.k,
          ),
        );
      }
    }
  };

  /*
  * socket Connection callbacks
  * set local const to functions with the value 'evt'
  */
  websocket = new WebSocket('ws://127.0.0.1:8091');
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
export const fittingSocketMiddleware = store => next => (action) => {
  // init local var
  const result = next(action);

  // react on specific actions. actions descripted in the sensorAction.js
  switch (action.type) {
    case SCAN_CIRCLE_SUCCESSFUL: {
      const state = store.getState();
      activeCmd.id += 1;
      activeCmd.type = 'projectPoints';
      websocket.send(
        fitting.registerPointsInPlane(
          state.refPlane,
          state.circle.measurements,
          activeCmd.id,
        ),
      );
      break;
    }
    case MEASURE_POINT_ON_PLANE_SUCCESSFUL: {
      const state = store.getState();
      if (state.refPlane.points.length === 4) {
        activeCmd.id += 1;
        activeCmd.type = 'calcRefPlane';
        websocket.send(fitting.fitPlaneL2(state.refPlane.points, activeCmd.id));
      }
      break;
    }
    default:
  }
  return result;
};
