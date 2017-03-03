import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import CircleSvg from './CircleSvg';
import { hashHistory } from 'react-router';
import { measurePointOnPlane } from '../actions/measureRefPlaneActions';

const mapStateToProps = state => {
  return {
    pointCount: state.refPlane.points.length,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSingleMeasureAction: () => dispatch(measurePointOnPlane()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MeasureRefPlane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointOne: { status: 'active' },
      pointTwo: { status: 'deactive' },
      pointThree: { status: 'deactive' },
      pointFour: { status: 'deactive' },
    };
    this.onMeasure = this.onMeasure.bind(this);
  }
  componentDidMount() {
  }
  onMeasure() {
    this.props.onSingleMeasureAction();
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.pointCount === 1 /* this.state.pointOne.status === 'active' */) {
      this.setState({
        ...this.state,
        pointOne: { status: 'measured' },
        pointTwo: { status: 'active' },
      });
    } else if (nextProps.pointCount === 2 /* this.state.pointTwo.status === 'active'*/) {
      this.setState({
        ...this.state,
        pointTwo: { status: 'measured' },
        pointThree: { status: 'active' },
      });
    } else if (nextProps.pointCount === 3 /* this.state.pointThree.status === 'active'*/) {
      this.setState({
        ...this.state,
        pointThree: { status: 'measured' },
        pointFour: { status: 'active' },
      });
    } else if (nextProps.pointCount === 4 /* this.state.pointFour.status === 'active'*/) {
      this.setState({
        ...this.state,
        pointFour: { status: 'measured' },
      });
      hashHistory.push('/measurecircle');
    } else {
    }
  }
  render() {

    const first = [
      'The blue circle shows, where you can place the reflektor.',
      <br />,
      'Press "Measure" to record a point.',
    ];
    const second = [
      'The green circle shows,if your record was successful.',
      <br />,
      'You need 4 points to complete this task.',
    ];
    return (
      <div style={{ marginTop: '44px' }}>
        <h2>Please measure 4 points on the flange</h2>
        <CircleSvg
          pointOne={this.state.pointOne}
          pointTwo={this.state.pointTwo}
          pointThree={this.state.pointThree}
          pointFour={this.state.pointFour}
          showFlangePoints={true}
          showInnerSmr={false}
        />
        <Grid>
          <Row className="show-grid">
            <Col sm={6} md={4} mdOffset={4}><br />{first} </Col>
            <Col sm={6} md={4} mdOffset={4}>{second} </Col>
          </Row>
        </Grid>
        <Button
          class="btn btn-default central-button"
          onClick={this.onMeasure}
          autoFocus
        //  tabIndex = 1
        >
          MEASURE
        </Button>
      </div>
    );
  }
}
