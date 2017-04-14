export function normalizeSurveys(surveys) {
  const normSurveys = [];
  surveys.forEach((survey) => {
    normSurveys.push({
      id: survey._id,
      title: survey.title
    });
  });

  return normSurveys;
}

export function normalizeSurvey(survey) {
  const converted = {
    questions: {},
    options: {}
  };

  survey.questions.forEach((question) => {
    converted.questions[question._id] = {
      id: question._id,
      kind: question.kind,
      required: question.required,
      title: question.title
    };
    switch (question.kind) {
      case 'Select':
        converted.questions[question._id].maxSelection = question.maxSelection;
        converted.options[question._id] = [];
        question.options.forEach((option) => {
          converted.options[question._id].push({
            id: option._id,
            label: option.label
          });
        });

        break;
      case 'Scale':
        converted.questions[question._id].min = question.min;
        converted.questions[question._id].max = question.max;
        break;
      case 'Text':
        converted.questions[question._id].max = question.max;
        break;
      default:
        break;
    }
  });
  return converted;
}

export function normalizeResponses(responses) {
  const converted = {
    responses: {}
  };

  responses.forEach((response) => {
    converted.responses[response._id] = [];
    response.questions.forEach((question) => {
      converted.responses[response._id].push({
        question: question._id,
        response: question.value
      });
    });
  });
  return converted;
}
