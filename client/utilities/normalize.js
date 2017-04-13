// options needs to be an array of

// TODO: write normalizeSurveys
export function normalizeSurveys() {

  questions[survey.id].forEach((question) => {
    const mongoQ = {
      _id: question.id,
      label: question.label,
      options: []
    };

    if (options[question.id]) {
      options[question.id].forEach((option) => {
        const mongoOp = {
          label: option.label,
          votes: option.votes
        };
        mongoQ.options.push(mongoOp);
      });
    }

    mongoData.questions.push(mongoQ);
  });

  return mongoData;
}

export function normalize(mongoData) {
  const state = {
    surveys: [],
    questions: {},
    options: {},
    signin: { error: false }
  };

  mongoData.forEach((survey) => {
    const surveyId = survey._id;

    state.surveys.push({
      id: surveyId,
      title: survey.title
    });

    state.questions[surveyId] = [];

    survey.questions.forEach((question) => {
      const questionId = question._id;

      state.questions[surveyId].push({
        id: questionId,
        label: question.label
      });

      state.options[questionId] = [];

      question.options.forEach((option) => {
        state.options[questionId].push({
          label: option.label,
          votes: option.votes
        });
      });
    });
  });

  return state;
}
