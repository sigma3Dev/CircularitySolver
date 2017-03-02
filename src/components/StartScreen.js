import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { Grid, Row, Col, Thumbnail, Button, Modal } from 'react-bootstrap';
import {
  setSensor,
  connectSensor,
  disConnectSensor
} from '../actions/sensorActions';

const mapStateToProps = state => {
  return {
    isConnected: state.sensor.isConnected,
    isConnecting: state.sensor.isConnecting
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSetSensor: name => dispatch(setSensor(name))
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };

    this.onClickModal = this.onClickModal.bind(this);
  }

  componentDidMount() {}

  onClickModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    if (this.props.isConnected) {
      hashHistory.push('/measurerefplane');
    }

    const modalInstance = (
      <Modal.Dialog>
        <Modal.Header style={{backgroundColor: '#78a4ed'}}>
          <Modal.Title>Connecting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tracker is connecting...
        </Modal.Body>
      </Modal.Dialog>
    );

    return (
      <div>
        {this.props.isConnecting ? modalInstance : null}
        <Grid style={{ marginTop: '74px' }}>
          <Row>
            <Col xs={4} md={4} lg={4}>
              <Button
                style={{ height: '300px', width: '300px' }}
                onClick={() => this.props.onSetSensor('FaroIon')}
              >
                <img
                  style={{ height: '80%' }}
                  alt="Faro Ion"
                  src="./assets/ion.png"
                />
                <p style={{ fontSize: '24px' }}>Faro Ion</p>
              </Button>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Button
                style={{ height: '300px', width: '300px' }}
                onClick={() => this.props.onSetSensor('FaroVantage')}
              >
                <img
                  style={{ height: '80%' }}
                  alt="Faro Vantage"
                  src="./assets/vantage.png"
                />
                <p style={{ fontSize: '24px' }}>Faro Vantage</p>
              </Button>
            </Col>
            <Col xs={4} md={4} lg={4}>
              <Button style={{ height: '300px', width: '300px' }}>
                <img
                  style={{ height: '80%' }}
                  alt="Simulated Laser Tracker"
                  src="./assets/simulatedTracker.png"
                />
                <p style={{ fontSize: '24px' }}>Simulated Laser Tracker</p>
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
