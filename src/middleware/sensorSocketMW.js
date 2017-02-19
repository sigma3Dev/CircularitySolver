import * as sensorActions from '../actions/sensorActions';

import {
  TWO_SIDE_MEASCONFIG_REQUEST,
  twoSideMeasConfigSuccessful,
} from '../actions/trackerUtilActions';

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

    if (response.hasOwnProperty('error')) {
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
    } else if (activeCmd.type === 'measure' && activeCmd.id === response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.singleMeasureActionSuccessful(response));
      } else {
        store.dispatch(sensorActions.singleMeasureActionFail(response));
      }
      // Block which handle´s the Toggle Sight Button Response
    } else if (activeCmd.type === 'toggle' && activeCmd.id === response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.toggleSensorSuccessful(response));
      } else {
        store.dispatch(sensorActions.toggleSensorFail(response));
      }
      // Block wich handle´s the Home Button Response
    } else if (activeCmd.type === 'home' && activeCmd.id === response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.homeActionSuccessful(response));
      } else {
        store.dispatch(sensorActions.homeActionFail(response));
      }
      // Block wich handle´s the CompIt Button Response
    } else if (activeCmd.type === 'compIt' && activeCmd.id === response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.compItActionSuccessful(response));
      } else {
        store.dispatch(sensorActions.compItActionFail(response));
      }
      // Block wich handle´s the Init (Leica Only )Button Response
    } else if (activeCmd.type === 'init' && activeCmd.id === response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.initActionSuccessful(response));
      } else {
        store.dispatch(sensorActions.initActionFail(response));
      }
      // Block wich handle´s the ChooseFaroIOn  Response
    } else if (
      activeCmd.type === 'chooseFaroIon' && activeCmd.id === response.id
    ) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.chooseFaroIonSuccessful(response));
        store.dispatch(sensorActions.connectSensor());
      } else {
        store.dispatch(sensorActions.chooseFaroIonFail(response));
      }
      //Block wich handle´s the ChoosefaroVantage Response
    } else if (
      activeCmd.type === 'chooseFaroVantage' && activeCmd.id === response.id
    ) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.chooseFaroVantageSuccessful(response));
      } else {
        store.dispatch(sensorActions.chooseFaroVantageFail(response));
      }
      // Block wich handle´s the chooseLeica Response
    } else if (activeCmd.type == 'chooseLeica' && activeCmd.id == response.id) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(sensorActions.chooseLeicaSuccessful(response));
      } else {
        store.dispatch(sensorActions.chooseLeicaFail(response));
      }
      // Block wich handle´s the BS Check Response
    } else if (
      activeCmd.type === 'twoSideMeasurement' && activeCmd.id === response.id
    ) {
      if (!response.hasOwnProperty('error')) {
        store.dispatch(twoSideMeasConfigSuccessful(response));
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
      connect();
      break;
    }
    case sensorActions.DISCONNECT_SENSOR_REQUEST: {
      console.log('jetzt bin ich beim middleware gedöns disconnect MW');
      disconnect();
      break;
    }
    case sensorActions.CHOOSE_FAROION_REQUEST: {
      console.log('MW CHOOSE_FAROION_REQUEST');
      chooseFaroIon();
      break;
    }
    case sensorActions.CHOOSE_VANTAGE_REQUEST: {
      console.log('MW CHOOSE_VANTAGE_REQUEST');
      chooseFaroVantage();
      break;
    }
    case sensorActions.CHOOSE_LEICA_REQUEST: {
      console.log('MW CHOOSE_LEICA_REQUEST');
      chooseLeica();
      break;
    }
    case sensorActions.SINGLE_MEASURE_ACTION_REQUEST: {
      console.log('MW MEASURE_ACTION_REQUEST');
      measure();
      break;
    }
    case sensorActions.TOGGLE_SENSOR_REQUEST: {
      console.log('MW TOGGLE_SENSOR_REQUEST');
      toggle();
      break;
    }
    case sensorActions.HOME_ACTION_REQUEST: {
      console.log('MW HOME_ACTION_REQUEST');
      home();
      break;
    }
    case sensorActions.COMPIT_ACTION_REQUEST: {
      console.log('MW COMPIT_ACTION_REQUEST');
      compIt();
      break;
    }
    case sensorActions.INIT_ACTION_REQUEST: {
      console.log('MW INIT_ACTION_REQUEST');
      initializeLeica();
      break;
    }
    case TWO_SIDE_MEASURE_ACTION_REQUEST: {
      console.log('MW TWO_SIDE_MEASURE_ACTION_REQUEST');
      measure();
      break;
    }
    case TWO_SIDE_MEASCONFIG_REQUEST: {
      console.log('MW TWO_SIDE_MEASCONFIG_REQUEST');
      twoSideMeasurementConfig();
      break;
    }
    return result;
  }
};
/**
 * Sends parameters(a RequestObject) to the webservice which
 *  establish/enable a connection between trackerpad and tracker
 * @param
 */
function connect() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'connect'; //set the active Command Type (activeCmd.type) to connect
  //build up request object
  let message = JSON.stringify(
    {
      jsonrpc: '2.0',
      id: activeCmd.id,
      method: 'connectSensor',
      params: {},
    },
    undefined,
    4,
  );

  //fire methods and websocket
  websocket.send(message);
}

/**
 *Sends Parameters(a RequestObject) to the webservice and middleware
 *which disabale the connection between trackerpad and tracker
 * @param
 */
function disconnect() {
  console.log('disconnect aufgerufen');
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'disconnect'; //set the active Command Type (activeCmd.type) to connect

  //build up request object
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'disconnectSensor',
    params: {},
  });
  //fire methods and websocket
  websocket.send(message);
}

/**
 *Sends Request(Object) to the webservice which tell the "backend" the Tracker
 * shall measure(Azimuth,Zenith,Distance)
 * @param
 */
function measure() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'measure'; //set the active Command Type (activeCmd.type)
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'measure',
    params: {},
  });

  //fire methods and websocket
  websocket.send(message);
}
/**
 *Sends Request(Object) to the webservice which tell the "backend" the Tracker
 * shall toggle from frontside to backside
 * @param
 */
function toggle() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'toggle'; //set the active Command Type (activeCmd.type)
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'doSensorAction',
    params: { name: 'toggleSightOrientation', params: [] },
  });
  websocket.send(message);
}

/**
 *Sends Request(Object) to the webservice which tell the "backend" the Tracker
 * shall go to home position (Faro only)
 * @param
 */
function home() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'home'; //set the active Command Type (activeCmd.type)
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'doSensorAction',
    params: { name: 'home', params: [] },
  });
  websocket.send(message);
}

/**
  *Sends Request(Object) to the webservice which tell the "backend" the Tracker
  * shall make a compensation position (Faro only)
  * @param
  */
function compIt() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'compIt'; //set the active Command Type (activeCmd.type)
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'doSensorAction',
    params: { name: 'compIt', params: [] },
  });
  websocket.send(message);
}
/**
   *Sends Request(Object) to the webservice which tell the "backend" the Tracker
   * shall make a initialize Leica (Leica only)
   * @param
   */
function initializeLeica() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'init'; //set the active Command Type (activeCmd.type)
  let message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'doSensorAction',
    params: { name: 'initialize', params: [] },
  });

  var messageFormatted = JSON.stringify(JSON.parse(message), null, 2);
  websocket.send(message);
}
/**
   *Sends Request(Object) to the webservice which tell the "backend" the Tracker
   * the Tracker you choose is FaroIOn
   * @param
   */
function chooseFaroIon() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'chooseFaroIon'; //set the active Command Type (activeCmd.type)
  const message = JSON.stringify(
    {
      jsonrpc: '2.0',
      id: activeCmd.id,
      method: 'getSensor',
      params: {
        name: 'FaroLaserTracker',
        parameter: {
          sensorParameter: [
            {
              name: 'connection',
              properties: {
                trackerType: 'ion',
                ip: '192.168.168.241',
              },
              trackerTypes: ['ion', 'vantage'],
            },
            {
              name: 'probe',
              properties: {
                activeProbe: '1.5',
                probes: ['0.5', '7/8', '1.5'],
              },
            },
            {
              name: 'distanceMode',
              properties: {
                activeDistanceMode: 'ADMOnly',
                distanceModes: [
                  'ADMOnly',
                  'InterferometerOnly',
                  'InterferometerSetByADM',
                ],
              },
            },
          ],
        },
      },
    },
    undefined,
    4,
  );
  console.log(message);
  websocket.send(message);
}
/**
   *Sends Request(Object) to the webservice which tell the "backend" the Tracker
   * the Tracker you choose is FaroVantage
   * @param
   */
function chooseFaroVantage() {
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'chooseFaroVantage'; //set the active Command Type (activeCmd.type)
  const message = JSON.stringify(
    {
      jsonrpc: '2.0',
      id: activeCmd.id,
      method: 'getSensor',
      params: {
        name: 'FaroLaserTracker',
        parameter: {
          sensorParameter: [
            {
              name: 'connection',
              properties: {
                trackerType: 'vantage',
                ip: '128.128.128.100',
              },
              trackerTypes: ['ion', 'vantage'],
            },
            {
              name: 'probe',
              properties: {
                activeProbe: '1.5',
                probes: ['0.5', '7/8', '1.5'],
              },
            },
            {
              name: 'distanceMode',
              properties: {
                activeDistanceMode: 'ADMOnly',
                distanceModes: [
                  'ADMOnly',
                  'InterferometerOnly',
                  'InterferometerSetByADM',
                ],
              },
            },
          ],
        },
      },
    },
    undefined,
    4,
  );
  websocket.send(message);
}
/**
 *Sends Request(Object) to the webservice which tell the "backend" the Tracker
 * the Tracker you choose is The leica Tracker
 * @param
 */
function chooseLeica() {
  console.log('ich bin hier bei choose leica');
  //set up script variables
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'chooseLeica'; //set the active Command Type (activeCmd.type)
  const message = JSON.stringify({
    jsonrpc: '2.0',
    id: activeCmd.id,
    method: 'getSensor',
    params: {
      name: 'LeicaLaserTracker',
      parameter: {
        sensorParameter: [
          {
            name: 'connection',
            properties: {
              ip: '192.168.0.1',
              port: 700,
            },
          },
          {
            name: 'probe',
            properties: {
              activeProbe: 'RRR15',
              probes: ['RRR15', 'RRR05', 'RRR0875', 'glass prism'],
            },
          },
          {
            name: 'measureMode',
            properties: {
              activeMeasureMode: 'fast',
              MeasureModes: ['fast', 'standard', 'precise', 'stationary'],
            },
          },
        ],
      },
    },
  });
  websocket.send(message);
}

/**
 * function which changes the measurementConfig from 'default' to
 * 2sightcheck (measure Frontside -> toggle sight -> measure backsight)
 * @param
 */
function twoSideMeasurementConfig() {
  console.log(
    'twoSideMeasurementConfig funktion ganz weit unten in der middleware',
  );
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'twoSideMeasurementConfig'; //set the active Command Type (activeCmd.type) to connect
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'setMeasurementConfig',
    id: activeCmd.id,
    params: {
      // polar or cartesian
      readingType: 'cartesian',
      measureType: 'singlePoint',
      measurementConfig: [
        {
          name: 'singlePoint',
          properties: {
            frequency: 1000,
            iteration: 1,
            measureTwoSides: true,
          },
        },
        {
          name: 'scan',
          properties: {
            scanMethod: 'distance',
            frequency: 1,
            count: 1000,
            delta: 0.001,
            scanMethods: ['distance', 'time'],
          },
        },
      ],
    },
  });
  websocket.send(message);
}
function singleMeasurementConfig() {
  console.log('singleMeasurement funktion ganz weit unten in der middleware');
  activeCmd.id = activeCmd.id + 1; //sum up 1 to the local variable idCount
  activeCmd.type = 'singleMeasurement'; //set the active Command Type (activeCmd.type) to connect
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'setMeasurementConfig',
    id: activeCmd.id,
    params: {
      // polar or cartesian
      readingType: 'cartesian',
      measureType: 'singlePoint',
      measurementConfig: [
        {
          name: 'singlePoint',
          properties: {
            frequency: 1000,
            iteration: 1,
            measureTwoSides: false,
          },
        },
        {
          name: 'scan',
          properties: {
            scanMethod: 'distance',
            frequency: 1,
            count: 1000,
            delta: 0.001,
            scanMethods: ['distance', 'time'],
          },
        },
      ],
    },
  });
  websocket.send(message);
}
