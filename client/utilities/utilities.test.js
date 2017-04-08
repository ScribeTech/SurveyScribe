import chai from 'chai';

import surveys from '../data/surveys';
import questions from '../data/questions';
import options from '../data/options';
import pretendMongoSurveys from '../data/pretendMongoSurveys';
import { normalize, denormalize } from './normalize';

const { expect } = chai;

describe('UTILITIES', () => {
  describe('Normalize', () => {
    it('should break MongoDB data into Redux state chunks', () => {
      const converted = normalize(pretendMongoSurveys);

      expect(converted.surveys).to.exist;
      expect(converted.surveys).isArray;
      expect(converted.questions).to.exist;
      expect(converted.questions).isObject;
      expect(converted.options).to.exist;
      expect(converted.options).isObject;
      expect(converted.questions[converted.surveys[0].id]).to.exist;
      expect(converted.options[converted.questions[converted.surveys[0].id][0].id]).to.exist;
    });
  });

  describe('Denormalize', () => {
    it('should combine Redux state data into a MongoDB survey', () => {
      const mongo = denormalize(surveys, questions, options, 0);

      expect(mongo.title).to.equal(surveys[0].title);
      expect(mongo).isObject;
      expect(mongo.questions).isArray;
      expect(mongo.questions[0]._id).to.equal(questions[surveys[0].id][0].id);
      expect(mongo.questions[0].options).isArray;
      expect(mongo.questions[0].options[0])
            .to.deep.equal(options[questions[surveys[0].id][0].id][0]);
    });
  });
});
