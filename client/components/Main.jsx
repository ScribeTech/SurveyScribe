import React from 'react';

const Main = {
  render() {
    return (
      <div>
        <h1>SurveyScribe</h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
};

export default Main;
