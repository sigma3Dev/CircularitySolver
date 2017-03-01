import {
  CONNECT_SENSOR_REQUEST,
  CHOOSE_FAROION_SUCCESSFUL,
  CHOOSE_FAROION_FAIL,
  CHOOSE_VANTAGE_SUCCESSFUL,
  CHOOSE_VANTAGE_FAIL,
  CHOOSE_LEICA_SUCCESSFUL,
  CHOOSE_LEICA_FAIL,
  CONNECT_SENSOR_SUCCESSFUL,
  CONNECT_SENSOR_FAIL,
  DISCONNECT_SENSOR_SUCCESSFUL,
  DISCONNECT_SENSOR_FAIL,
} from '../actions/sensorActions';

// initial state for the sensor object
const initialSensor = {
  activeSensor: 'none', // name as string of the sensor
  sensorTypes: ['none', 'FaroIon', 'FaroVantage', 'LeicaAt40x'], // all available sensor types
  isConnected: false, // check if sensor is connected
  isConnecting: false,
};

/**
 * reducer for sensor actions
 * manage actions from middleware
 * switches the value of the states on top
 * I think the ActionNames speaks for itself
 * @param
 */
const sensorReducer = (state = initialSensor, action) => {
  switch (action.type) {
    // set new sensor
    case CHOOSE_FAROION_SUCCESSFUL: {
      return Object.assign({}, state, {
        activeSensor: 'FaroIon',
      });
    }
    case CHOOSE_FAROION_FAIL: {
      return Object.assign({}, state, {
        activeSensor: 'none',
      });
    }
    case CHOOSE_VANTAGE_SUCCESSFUL: {
      return Object.assign({}, state, {
        activeSensor: 'FaroVantage',
      });
    }
    case CHOOSE_VANTAGE_FAIL: {
      return Object.assign({}, state, {
        activeSensor: 'none',
      });
    }
    case CHOOSE_LEICA_SUCCESSFUL: {
      return Object.assign({}, state, {
        activeSensor: 'LeicaAt40x',
      });
    }
    case CHOOSE_LEICA_FAIL: {
      return Object.assign({}, state, {
        activeSensor: 'none',
      });
    }
    case CONNECT_SENSOR_REQUEST: {
      return Object.assign({}, state, {
        isConnecting: true,
      });
    }
    case CONNECT_SENSOR_SUCCESSFUL: {
      return Object.assign({}, state, {
        isConnected: action.response.result.successful,
        isConnecting: false,
      });
    }
    case CONNECT_SENSOR_FAIL: {
      return Object.assign({}, state, {
        isConnected: action.error.result.successful,
        isConnecting: false,
      });
    }
    case DISCONNECT_SENSOR_SUCCESSFUL: {
      return Object.assign({}, state, {
        isConnected: false,
      });
    }
    case DISCONNECT_SENSOR_FAIL: {
      return Object.assign({}, state, {
        isConnected: action.error.result.successful,
      });
    }
    default:
  }
  return state;
};

export default sensorReducer;
