import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaneMeasurment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.firstpage === 'faroion'||'vantage')
    return (
      <div>
        <Grid>
          <Row className="show-grid" >
            <Col xs={5} md={5}>
              <h1>This is a Headline</h1>
              <p>Please Measure 4 Points.</p>
            </Col>
            </Row>
          <Row className="show-grid">
            <Col xs={2} md={2}>
              <Image src="/assets/thumbnail.png" rounded />
            </Col>
            <Col xs={10} md={10}>
              <Button bsStyle="default" bsSize="large">connected</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
