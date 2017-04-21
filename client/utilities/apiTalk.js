import { browserHistory } from 'react-router';
import _ from 'lodash';
import { normalizeSurveys, normalizeSurvey, normalizeResponses } from './normalize';
import { denormalizeSurvey, denormalizeResponse } from './denormalize';

export const getSurveys = (props, url) => {
  fetch('/api/surveys', {
    method: 'GET',
    credentials: 'same-origin',
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

export const getSurvey = (props, id, url) => {
  fetch(`/api/surveys/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
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

export const putSurvey = (props, url) => {
  fetch(`/api/surveys/${props.params.surveyID}`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(denormalizeSurvey(
      props.surveys[props.params.surveyID],
      props.questions,
      props.options))
  })
  .then(() => {
    if (url) {
      browserHistory.push(url);
    }
    props.showSnackbar();
  })
  .catch((error) => {
    throw error;
  });
};

// make response aggregates for a particular survey
export const makeAggregates = (questions, responses) => {
  const aggregates = {};
  Object.keys(questions).forEach((qId) => {
    const question = questions[qId];
    switch (question.kind) {
      case 'Select':
        aggregates[qId] = {};
        Object.keys(responses).forEach((responseId) => {
          const response = responses[responseId];
          if (response[qId]) {
            response[qId].value.forEach((optionId) => {
              if (aggregates[qId][optionId]) {
                aggregates[qId][optionId] += 1;
              } else {
                aggregates[qId][optionId] = 1;
              }
            });
          }
        });
        break;
      case 'Scale':
        aggregates[question.id] = [];
        Object.keys(responses).forEach((responseId) => {
          const response = responses[responseId];
          if (response[question.id]) {
            aggregates[question.id].push((response[question.id].value));
          }
        });
        break;
      case 'Text':
        aggregates[question.id] = [];
        Object.keys(responses).forEach((responseId) => {
          const response = responses[responseId];
          if (response[question.id]) {
            aggregates[question.id].push((response[question.id].value));
          }
        });
        break;
      default:
        break;
    }
  });
  return aggregates;
};

export const getResponses = (props, id, url) => {
  fetch(`/api/surveys/${id}/responses`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then((result) => {
    const responses = normalizeResponses(result);
    props.updateResponses(responses);
    const aggregates = makeAggregates(props.questions, responses);
    props.updateAggregates(aggregates);

    if (url) {
      browserHistory.push(url);
    }
  })
  .catch((error) => {
    throw error;
  });
};

export const postResponse = (props, url) => {
  _.forEach(props.questions, (question) => {
    if (question.required === true) {
      if (props.response[question.id] === undefined) {
        props.showWarning();
      } else if (Object.keys(props.response[question.id].value).length === 0) {
        props.showWarning();
      } else {
        props.hideWarning();
      }
    }
  });

  if (props.warning === false) {
    fetch('/api/responses', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        denormalizeResponse(props.params.surveyID, props.response, props.questions))
    })
    .then(() => {
      if (url) {
        browserHistory.push(url);
      }
    })
    .catch((error) => {
      throw error;
    });
  }
};
