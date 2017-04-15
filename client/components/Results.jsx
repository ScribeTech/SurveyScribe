import React from 'react';
import ReactHighcharts from 'react-highcharts';
import Layout from './Layout';

const Results = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);

  const makeConfig = (question) => {
    const votes = [];
    const options = [];
    props.options[question.id].forEach((option) => {
      votes.push(option.votes);
      options.push(option.label);
    });
    const config = {
      chart: {
        type: 'bar'
      },
      title: {
        text: question.label
      },
      legend: {
        enabled: false
      },
      tooltip: {
        valueSuffix: ' Votes',
        followPointer: 'true',
        pointFormat: '<b>{point.y}</b><br/>',
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: options
      },
      plotOptions: {
        series: {
          animation: {
            duration: 2000
          }
        }
      },
      series: [{
        data: votes,
        color: '#00bcd4'
      }]
    };

    return config;
  };

  const graphData = [
    [6.2], [6.5], [5.5], [5.0], [5.8],
    [7.0], [5.1], [6.0], [7.2], [6.2],
    [7.5], [7.9], [7.9], [5.4], [6.0],
    [4.2], [6.2], [7.0], [5.0], [6.6],
    [5.5], [7.0], [6.8], [7.5], [7.2],
    [7.0], [7.0], [7.9], [7.5], [6.0],
    [5.4], [6.0], [7.5], [6.0], [5.0]
  ];

  const histogram = (data, step) => {
    const histo = {};
    let x;
    let i;
    const arr = [];
    // Group down
    for (i = 0; i < data.length; i += 1) {
      x = Math.floor(data[i][0] / step) * step;
      if (!histo[x]) {
        histo[x] = 0;
      }
      histo[x] += 1;
    }

    // Make the histo group into an array
    for (x in histo) {
      if (histo.hasOwnProperty((x))) {
        arr.push([parseFloat(x), histo[x]]);
      }
    }

    // Finally, sort the array
    arr.sort((a, b) => a[0] - b[0]);

    return arr;
  };

  const makeSliderConfig = (Data) => {
    // const votes = [];
    // const options = [];
    // props.options[data.id].forEach((option) => {
    //   votes.push(option.votes);
    //   options.push(option.label);
    // });
    const config = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Highcharts Histogram'
      },
      xAxis: {
        gridLineWidth: 1
      },
      yAxis: [{
        title: {
          text: 'Histogram Count'
        }
      }, {
        opposite: true,
        title: {
          text: 'Y value'
        }
      }],
      series: [{
        name: 'Histogram',
        type: 'column',
        data: histogram(graphData, 1),
        pointPadding: 0,
        groupPadding: 0,
        pointPlacement: 'between'
      }]
    };

    return config;
  };


  props.socket.on('change result', (data) => {
    console.log("results data", data);
    props.updateState(data.survey, data.questions, data.options);
  });

  return (
    <Layout title="Results">
      <h1>{survey.title}</h1>
      <div>
        {props.questions[surveyID].map(question => (
          <ReactHighcharts config={makeConfig(question)} />
        ))}
      </div>
      <ReactHighcharts config={makeSliderConfig('data')} />
    </Layout>
  );
};

Results.propTypes = {}.isRequired;

export default Results;

