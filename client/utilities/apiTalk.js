import { browserHistory } from 'react-router';
import { normalizeSurveys, normalizeSurvey, normalizeResponses } from './normalize';

export const getSurveys = (props, url) => {
  fetch('/api/surveys', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then((result) => {
    const converted = normalizeSurveys(result);
    // Adding survey to state and changing the view to edit
    props.updateSurveys(converted);
    if (url) {
      browserHistory.push(url);
    }
  })
  .catch((error) => {
    throw error;
  });
};

export const getSurvey = (props, url) => {
  fetch(`/api/surveys/${props.params.surveyID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((result) => {
    const converted = normalizeSurvey(result);
    props.updateSurveys(converted.questions, converted.options);
    if (url) {
      browserHistory.push(url);
    }
  })
  .catch((error) => {
    throw error;
  });
};

// make response aggregates for a particular survey
export const makeAggregates = (questions, responses) => {
  const aggregates = {};
  console.log('questions', questions);
  Object.values(questions).forEach((question) => {
    switch (question.kind) {
      case 'Select':
        aggregates[question.id] = {};
        Object.values(responses).forEach((response) => {
          Object.values(response[question.id].response).forEach((optionId) => {
            if (aggregates[question.id][optionId]) {
              aggregates[question.id][optionId] += 1;
            } else {
              aggregates[question.id].pus;
            }
          });
        });
        break;
      case 'Scale':
        aggregates[question.id] = [];
        Object.values(responses).forEach((response) => {
          aggregates[question.id].push((response[question.id].response));
        });
        break;
      case 'Text':
        aggregates[question.id] = [];
        break;
      default:
        break;
    }
  });

  return aggregates;
};

export const getResponses = (props, url) => {
  fetch(`/api/surveys/${props.params.surveyId}/responses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((result) => {
    const responses = normalizeResponses(result);
    props.updateResponses(responses);

    const aggregates = makeAggregates(props.questions, props.options, converted);
    props.updateAggregates(aggregates);
  });
};


// export const updateSurvey = (props, survey, url) => {
//   fetch(`/api/surveys/${props.params.surveyID}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(denormalize(survey, props.questions, props.options))
//   })
//   .then(() => {
//     if (url) {
//       getSurveys(props, url);
//     }
//   });
// };
