import React from 'react';
import Layout from './Layout';
import ReactHighcharts from 'react-highcharts';
import { render } from 'react-dom';

const config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};


const Results = props => (
  <Layout title="Results">
    <h1>{props.surveys[props.params.surveyID].title}</h1>
    <ReactHighcharts config={config} />
  </Layout>
);

Results.propTypes = {}.isRequired;

//render(React.createElement(ReactHighcharts, { config }), document.getElementById('graph'));

export default Results;

