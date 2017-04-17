import chai from 'chai';
import { surveys } from '../data/surveys';
import { questions } from '../data/questions';
import { options } from '../data/options';
import { responses } from '../data/responses';
import { mongoSurvey } from '../data/mongoSurvey';
import { denormalizeSurvey, denormalizeResponse } from '../utilities/denormalize';

describe('DENORMALIZE', () => {
  describe('denormalizeSurvey', () => {
    it('should convert a survey, questions, and options into mongo form', () => {
      const converted = denormalizeSurvey(surveys['58ee63c65a2d576d5125b4bc'], questions, options);

      expect(converted).to.be.Object;
      expect(converted.id).to.equal('58ee63c65a2d576d5125b4bc');

    });
  });
  describe('denormalizeResponse', () => {
    it('should convert responses into mongo form', () => {

    });
  });
});
