import { browserHistory } from 'react-router';
import { normalize } from './normalize';

export const getSurveys = (props, url) => {
  fetch('/api/surveys', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then((result) => {
    console.log(result);
    const converted = normalize(result);
    // Adding survey to state and changing the view to edit
    props.updateState(converted.surveys, converted.questions, converted.options);
    if (url) {
      browserHistory.push(url);
    }
  })
  .catch((error) => {
    throw error;
  });
};

export default getSurveys;
