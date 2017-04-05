import React from 'react';

const SurveySingle = React.createClass({

  componentDidMount() {
    console.log("props", this.props.surveysingle);
  },

  render() {
    return (
      <div>
        test
      </div>
    );
  }
});

export default SurveySingle;
