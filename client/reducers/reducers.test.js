import chai from 'chai';
import deepFreeze from 'deep-freeze';
import reducer from './index';

import surveys from '../data/surveys';
import { questions } from '../data/questions';
import { options } from '../data/options';
import { responses } from '../data/responses';
import { aggregates } from '../data/aggregates';
import { mongoSurveys } from '../data/mongoSurveys';
import { mongoSurvey } from '../data/mongoSurvey';
import { mongoResponses } from '../data/mongoResponses';
import { normalizeSurveys, normalizeSurvey, normalizeResponses } from '../utilities/normalize';

const { expect } = chai;

describe('REDUCERS', () => {
  // unit tests for update actions
  describe('Update', () => {
    const initialState = {
      surveys,
      questions: {},
      options: {},
      responses: {},
      aggregates: {}
    };
    describe('UPDATE_SURVEYS', () => {
      it('should rewrite all stored survey data', () => {
        const converted = normalizeSurveys(mongoSurveys);

        const action = {
          type: 'UPDATE_SURVEYS',
          surveys: converted
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);
        expect(changedState).to.not.deep.equal(initialState.surveys);
        expect(changedState.surveys).to.deep.equal(converted);
      });
    });
    describe('UPDATE_SURVEY', () => {
      it('should rewrite all stored question and option data', () => {
        const converted = normalizeSurvey(mongoSurvey);

        const action = {
          type: 'UPDATE_SURVEY',
          questions: converted.questions,
          options: converted.options
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState).to.not.deep.equal(
          { questions: initialState.questions, options: initialState.options });
        expect(changedState.questions).to.deep.equal(converted.questions);
        expect(changedState.options).to.deep.equal(converted.options);
      });
    });
    describe('UPDATE_RESPONSES', () => {
      it('should rewrite all stored responses data', () => {
        const converted = normalizeResponses(mongoResponses);

        const action = {
          type: 'UPDATE_RESPONSES',
          responses: converted
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState).to.not.deep.equal(initialState.responses);
        expect(changedState.responses).to.equal(converted);
      });
    });
    describe('UPDATE_AGGREGATES', () => {
      it('should rewrite all stored aggregates data', () => {
        const converted = normalizeResponses(mongoResponses);

        const action = {
          type: 'UPDATE_AGGREGATES',
          aggregates: converted
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState).to.not.deep.equal(initialState.aggregates);
        expect(changedState.aggregates).to.equal(converted);
      });
    });
  });
   // unit tests for surveys reducer
  describe('Surveys', () => {
    const initialState = {
      surveys,
      questions: {},
      options: {},
      responses: {},
      aggregates: {}
    };
    describe('ADD_SURVEY', () => {
      it('should add a survey to the current list of surveys', () => {
        const survey = {
          id: 4,
          title: 'Expanded'
        };

        const action = Object.assign({}, survey, { type: 'ADD_SURVEY' });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.surveys.length).to.equal(4);
        expect(JSON.stringify(changedState.surveys[3])).to.equal(JSON.stringify(survey));
      });
    });

    describe('REMOVE_SURVEY', () => {
      it('should remove a survey from the current list of surveys', () => {
        const action = {
          type: 'REMOVE_SURVEY',
          i: 2
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);
        expect(changedState.surveys.length).to.equal(2);
        expect(changedState.surveys[2]).to.not.exist;
      });
    });

    describe('EDIT_SURVEY', () => {
      it('should edit an existing survey in the list of surveys', () => {
        const survey = {
          title: 'Fabulous'
        };

        const action = Object.assign({}, survey, { type: 'EDIT_SURVEY', i: 1 });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.surveys.length).to.equal(3);
        expect(JSON.stringify(changedState.surveys[1].title))
          .to.equal(JSON.stringify(survey.title));
        expect(JSON.stringify(changedState.surveys[0]))
          .to.equal(JSON.stringify(initialState.surveys[0]));
        expect(JSON.stringify(changedState.surveys[2]))
          .to.equal(JSON.stringify(initialState.surveys[2]));
      });
    });
  });
  // unit tests for questions reducer
  describe('Questions', () => {
    const initialState = {
      surveys,
      questions,
      options,
      responses: {},
      aggregates: {}
    };
    describe('ADD_QUESTION', () => {
      it('should add a question to the current list of questions', () => {
        const question = {
          id: '46ef6467aa8ac36d6d74fb3f',
          kind: 'Scale'
        };

        const action = Object.assign({}, question, { type: 'ADD_QUESTION' });

        deepFreeze(initialState);
        const changedState = reducer(initialState, action);
        expect(Object.keys(changedState.questions).length)
               .to.equal(Object.keys(initialState.questions).length + 1);
        expect(changedState.questions[question.id].kind).to.equal(question.kind);
      });
      it('should include required, title, min, max for SCALE questions', () => {
        const question = {
          id: '46ef6467aa8ac36d6d74fb3f',
          kind: 'Scale'
        };

        const action = Object.assign({}, question, { type: 'ADD_QUESTION' });

        deepFreeze(initialState);
        const changedState = reducer(initialState, action);
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].required).to.be.Boolean;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].title).to.be.String;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].min).to.be.Number;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].max).to.be.Number;
      });
      it('should include required, title, max for TEXT questions', () => {
        const question = {
          id: '46ef6467aa8ac36d6d74fb3f',
          kind: 'Text'
        };

        const action = Object.assign({}, question, { type: 'ADD_QUESTION' });

        deepFreeze(initialState);
        const changedState = reducer(initialState, action);
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].required).to.be.Boolean;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].title).to.be.String;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].max).to.be.Number;
      });
      it('should include required, title, maxSelection for SELECT questions', () => {
        const question = {
          id: '46ef6467aa8ac36d6d74fb3f',
          kind: 'Select'
        };

        const action = Object.assign({}, question, { type: 'ADD_QUESTION' });

        deepFreeze(initialState);
        const changedState = reducer(initialState, action);
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].required).to.be.Boolean;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].title).to.be.String;
        expect(changedState.questions['46ef6467aa8ac36d6d74fb3f'].maxSelection).to.be.Number;
      });
    });
    describe('REMOVE_QUESTION', () => {
      it('should remove a question from the current list of questions', () => {
        const action = {
          type: 'REMOVE_QUESTION',
          id: '58ee6466aa8ac36d6d74fe9f'
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);
        expect(Object.keys(changedState.questions).length)
               .to.equal(Object.keys(initialState.questions).length - 1);
        expect(changedState.questions['58ee6466aa8ac36d6d74fe9f']).to.not.exist;
      });
      it('should remove options if SELECT question', () => {
        const action = {
          type: 'REMOVE_QUESTION',
          id: '58ee63c65a2d576d5125b4c1',
          kind: 'Select'
        };
        deepFreeze(initialState);
        const changedState = reducer(initialState, action);
        expect(Object.keys(changedState.options).length)
               .to.equal(Object.keys(initialState.options).length - 1);
        expect(changedState.options[action.id]).to.not.exist;
      });
    });
    describe('EDIT_QUESTION', () => {
      it('should edit an existing question in the list of questions', () => {
        const question = {
          id: '58ee63c65a2d576d5125b4c1',
          kind: 'Select',
          data: {
            title: 'Are Megan and Jin the best?',
            required: true,
            maxSelection: 1
          }
        };

        const action = Object.assign({}, question, { type: 'EDIT_QUESTION' });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(Object.keys(changedState.questions).length)
               .to.equal(Object.keys(initialState.questions).length);
        expect(changedState.questions[question.id].id)
               .to.equal(initialState.questions[question.id].id);
        expect(changedState.questions[question.id])
               .to.not.deep.equal(initialState.questions[question.id]);
      });
      it('should edit Select questions', () => {
        const question = {
          id: '58ee63c65a2d576d5125b4c1',
          kind: 'Select',
          data: {
            title: 'Are Megan and Jin the best?',
            required: true,
            maxSelection: 1
          }
        };

        const action = Object.assign({}, question, { type: 'EDIT_QUESTION' });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(Object.keys(changedState.questions).length)
        .to.equal(Object.keys(initialState.questions).length);
        expect(changedState.questions[question.id].title)
        .to.equal(question.data.title);
        expect(changedState.questions[question.id].required)
        .to.equal(question.data.required);
        expect(changedState.questions[question.id].maxSelection)
        .to.equal(question.data.maxSelection);
      });
      it('should edit Scale questions', () => {
        const question = {
          id: '58ee6466aa8ac36d6d74fe9f',
          kind: 'Scale',
          data: {
            title: 'How much do you like TACOS?',
            required: true,
            min: 2,
            max: 17
          }
        };

        const action = Object.assign({}, question, { type: 'EDIT_QUESTION' });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(Object.keys(changedState.questions).length)
               .to.equal(Object.keys(initialState.questions).length);
        expect(changedState.questions[question.id].title)
               .to.equal(question.data.title);
        expect(changedState.questions[question.id].required)
               .to.equal(question.data.required);
        expect(changedState.questions[question.id].min)
               .to.equal(question.data.min);
        expect(changedState.questions[question.id].max)
               .to.equal(question.data.max);
      });
      it('should edit Text questions', () => {

      });
    });
  });
  xdescribe('Options', () => {
    xdescribe('ADD_OPTION', () => {
      xit('should add a option to the current list of options', () => {
        const questionId = 1;
        const option = {
          label: 'Cat'
        };

        const action = Object.assign({}, option, { type: 'ADD_OPTION', questionId });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.options[questionId].length).to.equal(4);
        expect(JSON.stringify(changedState.options[questionId][3].label))
          .to.equal(JSON.stringify(option.label));
      });
    });
    xdescribe('REMOVE_OPTION', () => {
      xit('should remove a option from the current list of options', () => {
        const action = {
          questionId: 1,
          type: 'REMOVE_OPTION',
          i: 2
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.options[1].length).to.equal(2);
        expect(changedState.options[1][2]).to.not.exist;
      });
    });
    xdescribe('EDIT_OPTION', () => {
      xit('should edit an existing option in the list of options', () => {
        const questionId = 1;
        const option = {
          i: 1,
          label: 'Megan and Jin are the TRUE WARRIORS'
        };

        const action = Object.assign({}, option, { type: 'EDIT_OPTION', questionId });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.options[questionId].length).to.equal(3);
        expect(JSON.stringify(changedState.options[questionId][option.i].label))
          .to.equal(JSON.stringify(option.label));
        expect(JSON.stringify(changedState.options[questionId][0]))
          .to.equal(JSON.stringify(initialState.options[1][0]));
        expect(JSON.stringify(changedState.options[questionId][2]))
          .to.equal(JSON.stringify(initialState.options[1][2]));
      });
    });
    xdescribe('TOGGLE_SELECT', () => {
      xit('should toggle an option\'s selected status', () => {
        const option = {
          type: 'TOGGLE_SELECT',
          questionId: 1,
          i: 0
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, option);

        expect(changedState.options[1][0].selected)
          .to.equal(true);

        const flippedState = reducer(changedState, option);

        expect(flippedState.options[1][0].selected)
          .to.equal(false);
      });
      xit('should keep track of how many option\'s have been selected', () => {
      });
    });
  });
  xdescribe('TOGGLE_ERROR', () => {
    xit('should toggle signin.error true/false', () => {
      const signin = {
        type: 'TOGGLE_ERROR',
        i: 0
      };

      deepFreeze(initialState);

      const changedState = reducer(initialState, signin);

      expect(changedState.signin.error)
        .to.equal(true);

      const flippedState = reducer(changedState, signin);

      expect(flippedState.signin.error)
        .to.equal(false);
    });
  });
});
