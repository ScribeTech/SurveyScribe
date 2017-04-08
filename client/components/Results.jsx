import React from 'react';
import Layout from './Layout';
import ReactHighcharts from 'react-highcharts';


const Results = (props) => {
  const surveyID = props.params.surveyID;

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
            duration: 2000,
            easing: 'easeOutBounce'
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

  return (
    <Layout title="Results">
      <h1>{props.surveys[props.params.surveyID - 1].title}</h1>
      <div>
        {props.questions[surveyID].map((question) => {
          return <ReactHighcharts config={makeConfig(question)} />
        })}
        test
      </div>
    </Layout>
  );
};

Results.propTypes = {}.isRequired;

export default Results;

