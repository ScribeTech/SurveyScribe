import React from 'react';
import Layout from './Layout';
import ReactHighcharts from 'react-highcharts';


const Results = (props) => {
  const surveyID = props.params.surveyID;
  //const questions = [];
  // const votes = [];
  // props.questions[surveyID].forEach((question) => {
  //   questions.push(question.label);
  //   props.options[question.id].forEach(option => votes.push(option.votes));
  // });
  // console.log("votes", votes)
  // const config = {
  //   chart: {
  //     type: 'bar'
  //   },
  //   xAxis: {
  //     categories: questions
  //   },
  //   series: [{
  //     data: votes
  //   }]
  // };

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
      xAxis: {
        categories: options
      },
      series: [{
        data: votes
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

