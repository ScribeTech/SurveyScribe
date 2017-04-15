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
    props.updateSurvey(converted.questions, converted.options);
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
  for (const questionId in questions) {
    const question = questions[questionId];
    switch (question.kind) {
      case 'Select':
        aggregates[question.id] = {};
        for (const responseId in responses) {
          const response = responses[responseId];
          for (const i in response[question.id].response) {
            const optionId = response[question.id].response[i];
            if (aggregates[question.id][optionId]) {
              aggregates[question.id][optionId] += 1;
            } else {
              aggregates[question.id][optionId] = 1;
            }
          }
        }
        break;
      case 'Scale':
        aggregates[question.id] = [];
        for (const responseId in responses) {
          const response = responses[responseId];
          aggregates[question.id].push((response[question.id].response));
        }
        break;
      case 'Text':
        aggregates[question.id] = [];
        for (const responseId in responses) {
          const response = responses[responseId];
          aggregates[question.id].push((response[question.id].response));
        }
        break;
      default:
        break;
    }
  }
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

    const aggregates = makeAggregates(props.questions, props.options, responses);
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
