import chai from 'chai';

import surveys from '../data/surveys';
import questions from '../data/questions';
import options from '../data/options';
import { mongoSurveys } from '../data/mongoSurveys';
import { mongoSurvey } from '../data/mongoSurvey';
import { mongoResponses } from '../data/mongoResponses';
import { mongoResponse } from '../data/mongoResponse';
import { mongoUsers } from '../data/mongoUsers';
import { mongoUser } from '../data/mongoUser';
import { normalizeSurveys, normalizeSurvey } from './normalize';

const { expect } = chai;

describe('UTILITIES', () => {
  describe('NORMALIZE', () => {
    describe('normalizeSurveys', () => {
      it('should break surveys into surveys redux state', () => {
        const converted = normalizeSurveys(mongoSurveys);
        expect(converted).to.exist;
        expect(converted).to.be.Array;
        expect(converted[0].title).to.equal(mongoSurveys[0].title);
      });
    });
    describe('normalizeSurvey', () => {
      it('should break survey into questions and options redux states', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions).to.exist;
        expect(converted.questions).to.be.Object;
        expect(converted.options).to.exist;
        expect(converted.options).to.be.Object;
      });
      it('should have a boolean required in each question', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].required).to.equal(false);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9e'].required).to.equal(false);
        expect(converted.questions['58ee63c65a2d576d5125b4c1'].required).to.equal(false);
      });
      it('should have a numeric min and a max for SCALE', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].kind).to.equal('Scale');
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].min).to.equal(0);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].min).to.be.Number;
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].max).to.equal(10);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].max).to.be.Number;
      });
      it('should have a numeric max number of characters for TEXT', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9e'].kind).to.equal('Text');
        expect(converted.questions['58ee6466aa8ac36d6d74fe9e'].max).to.equal(1000);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9e'].max).to.be.Number;
      });
      it('should have a numeric maxSelection for SELECT', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions['58ee63c65a2d576d5125b4c1'].kind).to.equal('Select');
        expect(converted.questions['58ee63c65a2d576d5125b4c1'].maxSelection).to.equal(0);
        expect(converted.questions['58ee63c65a2d576d5125b4c1'].maxSelection).to.be.Number;
      });
      it('should only have options for SELECT questions', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.options['58ee63c65a2d576d5125b4c1']).to.exist;
        expect(converted.options['58ee6466aa8ac36d6d74fe9e']).to.not.exist;
        expect(converted.options['58ee6466aa8ac36d6d74fe9f']).to.not.exist;
      });
    });
    // describe('normalizeResponses', () => {
    //   it('should break responses into responses redux state', () => {
    //
    //   });
    // });
    // describe('normalizeResponse', () => {
    //   it('should break response into responses redux state', () => {
    //
    //   });
    // });
    // xdescribe('normalizeUser', () => {
    //
    // });
    // xdescribe('normalizeUsers', () => {
    //
    // });
  });
  // xdescribe('normalize', () => {
  //   it('should break MongoDB data into Redux state chunks', () => {
  //     const converted = normalize(pretendMongoSurveys);
  //
  //     expect(converted.surveys).to.exist;
  //     expect(converted.surveys).isArray;
  //     expect(converted.questions).to.exist;
  //     expect(converted.questions).isObject;
  //     expect(converted.options).to.exist;
  //     expect(converted.options).isObject;
  //     expect(converted.questions[converted.surveys[0].id]).to.exist;
  //     expect(converted.options[converted.questions[converted.surveys[0].id][0].id]).to.exist;
  //   });
  // });
  //
  // xdescribe('Denormalize', () => {
  //   it('should combine Redux state data into a MongoDB survey', () => {
  //     const mongo = denormalize(surveys[0], questions, options);
  //
  //     expect(mongo.title).to.equal(surveys[0].title);
  //     expect(mongo).isObject;
  //     expect(mongo.questions).isArray;
  //     expect(mongo.questions[0]._id).to.equal(questions[surveys[0].id][0].id);
  //     expect(mongo.questions[0].options).isArray;
  //     expect(mongo.questions[0].options[0])
  //           .to.deep.equal(options[questions[surveys[0].id][0].id][0]);
  //   });
  // });
  // xdescribe('getSurveys', () => {
  //
  // });
});
