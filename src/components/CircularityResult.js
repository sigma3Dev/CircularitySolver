import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';

const mapStateToProps = state => {
  return {
    circularity: state.circle.circularity,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MeasureCircle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {

    const circularity = parseFloat(this.props.circularity*1000).toFixed(3);
    let isOk = "circularity-result-ok";
    let icon = <i style={{ marginTop: '50px' }} class="fa fa-thumbs-o-up fa-5x" />
    if (this.props.circularity * 1000 > 0.5) {
      isOk = "circularity-result-nok";
      icon = <i style={{ marginTop: '50px' }} class="fa fa-thumbs-o-down fa-5x" />
    }

    return (
      <div class=" circularity-result-justification">
        <div class={isOk}>Circularity: {circularity} mm </div>
        {icon}
      </div>
    );
  }
}
