export function denormalizeSurvey(survey, questions, options) {
  const converted = {};

  converted._id = survey.id;
  converted.title = survey.title;
  converted.questions = [];

  Object.keys(questions).forEach((questionId) => {
    const question = {
      _id: questionId,
      required: questions[questionId].required,
      title: questions[questionId].title,
      kind: questions[questionId].kind,
    };

    switch (question.kind) {
      case 'Select':
        question.maxSelection = questions[questionId].maxSelection;
        question.options = [];

        if (options[questionId] !== undefined) {
          Object.keys(options[questionId]).forEach((optionId) => {
            question.options.push({
              _id: optionId,
              label: options[questionId][optionId].label
            });
          });
        }
        break;
      case 'Scale':
        question.min = questions[questionId].min;
        question.max = questions[questionId].max;
        break;
      case 'Text':
        question.max = questions[questionId].max;
        break;
      default:
        break;
    }

    converted.questions.push(question);
  });

  return converted;
}

export function denormalizeResponse(surveyId, response, questions) {
  const converted = {};
  converted.survey = surveyId;
  converted.answers = [];
  Object.keys(questions).forEach((questionId) => {
    const answer = {
      question: questionId,
      kind: questions[questionId].kind,
    };

    if (answer.kind === 'Select') {
      answer.value = [];
      Object.keys(response[questionId].value).forEach((id) => {
        answer.value.push(id);
      });
    } else {
      answer.value = response[questionId].value;
    }
    converted.answers.push(answer);
  });
  console.log('converted', converted);
  return converted;
}
