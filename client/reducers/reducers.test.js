import chai from 'chai';
import deepFreeze from 'deep-freeze';
import reducer from './index';

import surveys from '../data/surveys';
import { questions } from '../data/questions';
import { options } from '../data/options';
import { responses } from '../data/responses';
import { aggregates } from '../data/responses';
import { mongoSurveys } from '../data/mongoSurveys';
import { mongoSurvey } from '../data/mongoSurvey';
import { normalizeSurveys, normalizeSurvey } from '../utilities/normalize';

const initialState = {
  surveys,
  questions,
  options
};

const { expect } = chai;

describe('REDUCERS', () => {
  // unit tests for update actions
  describe('Update', () => {
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
        expect(changedState).to.deep.equal(converted);
      });
    });
    describe('UPDATE_SURVEY', () => {
      it('should rewrite all stored question data', () => {
        const converted = normalizeSurvey(mongoSurvey);

        const action = {
          type: 'UPDATE_SURVEY',
          questions: converted.questions,
          options: converted.options
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState).to.not.deep.equal(initialState.questions);
        expect(changedState.questions).to.deep.equal(converted.questions);
      });
    });
  });
   // unit tests for surveys reducer
  describe('Surveys', () => {
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
    describe('ADD_QUESTION', () => {
      it('should add a question to the current list of questions', () => {
        const surveyId = 1;
        const question = {
          id: 10,
          label: 'Meow?'
        };

        const action = Object.assign({}, question, { type: 'ADD_QUESTION', surveyId });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.questions[surveyId].length).to.equal(4);
        expect(JSON.stringify(changedState.questions[surveyId][3]))
          .to.equal(JSON.stringify(question));
      });
    });
    describe('REMOVE_QUESTION', () => {
      it('should remove a question from the current list of questions', () => {
        const action = {
          surveyId: 1,
          type: 'REMOVE_QUESTION',
          i: 2
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.questions[1].length).to.equal(2);
        expect(changedState.questions[1][2]).to.not.exist;
      });
    });
    describe('EDIT_QUESTION', () => {
      it('should edit an existing question in the list of questions', () => {
        const surveyId = 1;
        const question = {
          i: 1,
          label: 'Megan and Jin are the BEST'
        };

        const action = Object.assign({}, question, { type: 'EDIT_QUESTION', surveyId });

        deepFreeze(initialState);

        const changedState = reducer(initialState, action);

        expect(changedState.questions[1].length).to.equal(3);
        expect(JSON.stringify(changedState.questions[1][1].label))
          .to.equal(JSON.stringify(question.label));
        expect(JSON.stringify(changedState.questions[1][0]))
          .to.equal(JSON.stringify(initialState.questions[1][0]));
        expect(JSON.stringify(changedState.questions[1][2]))
          .to.equal(JSON.stringify(initialState.questions[1][2]));
      });
    });
  });
  describe('Options', () => {
    describe('ADD_OPTION', () => {
      it('should add a option to the current list of options', () => {
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
    describe('REMOVE_OPTION', () => {
      it('should remove a option from the current list of options', () => {
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
    describe('EDIT_OPTION', () => {
      it('should edit an existing option in the list of options', () => {
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
    describe('INCREMENT_VOTES', () => {
      it('should increment the votes for an existing option', () => {
        const option = {
          type: 'INCREMENT_VOTES',
          questionId: 2,
          i: 1
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, option);

        expect(changedState.options[2][1].votes)
          .to.equal(initialState.options[2][1].votes + 1);
      });
    });
    describe('DECREMENT_VOTES', () => {
      it('should decrement the votes for an existing option', () => {
        const option = {
          type: 'DECREMENT_VOTES',
          questionId: 2,
          i: 1
        };

        deepFreeze(initialState);

        const changedState = reducer(initialState, option);

        expect(changedState.options[2][1].votes)
          .to.equal(initialState.options[2][1].votes - 1);
      });
    });
    describe('TOGGLE_SELECT', () => {
      it('should toggle an option\'s selected status', () => {
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
    });
  });
  describe('TOGGLE_ERROR', () => {
    it('should toggle signin.error true/false', () => {
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
