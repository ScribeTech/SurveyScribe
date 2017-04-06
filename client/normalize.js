import { pretendMongo } from './data/pretendMongoSurveys';

// options needs to be an array of
export function denormalize(surveys, questions, options, i) {
  const mongoData = {};

  mongoData.title = surveys[i].title;
  mongoData.questions = [];

  questions[surveys[i].id].forEach((question) => {
    const mongoQ = {
      _id: question.id,
      label: question.label,
      options: []
    };

    options[question.id].forEach((option) => {
      const mongoOp = {
        label: option.label,
        votes: option.votes
      };
      mongoQ.options.push(mongoOp);
    });

    mongoData.questions.push(mongoQ);
  });

  return mongoData;
}

export function normalize(mongoData) {
  const state = {
    surveys: [],
    questions: {},
    options: {}
  };

  mongoData.forEach((survey) => {
    const surveyId = survey._id.$oid;

    state.surveys.push({
      id: surveyId,
      title: survey.title
    });

    state.questions[surveyId] = [];

    survey.questions.forEach((question) => {
      const questionId = question._id.$oid;

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
