import React from 'react';
import _ from 'lodash';
import ReactHighcharts from 'react-highcharts';
import Layout from './Layout';

const Results = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const survey = _.filter(props.surveys, { id: surveyID });

  const styles = {
    textTitle: {
      textAlign: 'center',
      fontSize: 18
    },
    textBody: {
      marginLeft: 100
    }
  };

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

  const makeScaleConfig = (data, question) => {
    const graphData = [];
    for (let i = 0; i < data.length; i += 1) {
      graphData.push([data[i]]);
    }
    const config = {
      chart: {
        type: 'column'
      },
      title: {
        text: question.title
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
        pointPlacement: 'between',
        color: '#00bcd4'
      }]
    };

    return config;
  };

  const makeSelectConfig = (data, question) => {
    const graphCategories = [];
    const graphData = [];
    _.forEach(props.options[question.id], (option) => {
      graphCategories.push(option.label);
    });
    _.forEach(data, (oneQuestion) => {
      graphData.push(oneQuestion);
    });

    const config = {
      chart: {
        type: 'bar'
      },
      title: {
        text: question.title
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
        categories: graphCategories
      },
      plotOptions: {
        series: {
          animation: {
            duration: 2000
          }
        }
      },
      series: [{
        data: graphData,
        color: '#00bcd4'
      }]
    };

    return config;
  };

  const makeQuestionGraph = (question) => {
    let config = '';
    const kind = question.kind;
    if (kind === 'Scale') {
      config = makeScaleConfig(props.aggregates[question.id], question);
    } else if (kind === 'Select') {
      config = makeSelectConfig(props.aggregates[question.id], question);
    }
    return config;
  };

  const renderGraphs = (question) => {
    renderGraphs.propTypes = {}.isRequired;

    if (question.kind === 'Scale' || question.kind === 'Select') {
      return (
        <div>
          <ReactHighcharts config={makeQuestionGraph(question)} />
        </div>
      );
    } else {
      const textList = [];
      _.map(props.responses, (user) => {
        textList.push(user[question.id].response);
      });
      return (
        <div>
          <h4 style={styles.textTitle}>{question.title} </h4>
          {_.map(textList, (text, i) => (
            <div style={styles.textBody}>
              {`${i + 1}.   `}{text}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Layout title="Results">
      <h1>{survey.title}</h1>
      <div>
        {_.map(props.questions, question => (
          renderGraphs(question)
        ))}
      </div>
    </Layout>
  );
};

Results.propTypes = {}.isRequired;

export default Results;

