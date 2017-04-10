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
      it('should create different question shapes for each type', () => {
        const converted = normalizeSurvey(mongoSurvey);
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].type).to.equal('Scale');
        expect(converted.questions['58ee6466aa8ac36d6d74fe9f'].type).to.equal('Scale');
        expect(converted.questions['58ee6466aa8ac36d6d74fe9e'].type).to.equal('Text');
        expect(converted.questions['58ee63c65a2d576d5125b4c1'].type).to.equal('Select');
      });
      it('should only have options for SELECT questions', () => {

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
