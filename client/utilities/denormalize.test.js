import chai from 'chai';
import { surveys } from '../data/surveys';
import { questions } from '../data/questions';
import { options } from '../data/options';
import { responses } from '../data/responses';
import { response } from '../data/response';
import { mongoSurvey } from '../data/mongoSurvey';
import { denormalizeSurvey, denormalizeResponse } from '../utilities/denormalize';

const { expect } = chai;

describe('DENORMALIZE', () => {
  describe('denormalizeSurvey', () => {
    const converted = denormalizeSurvey(surveys['58ee63c65a2d576d5125b4bc'], questions, options);
    it('should convert a survey, questions, and options into mongo form', () => {
      expect(converted).to.be.Object;
      expect(converted.title).to.equal(surveys['58ee63c65a2d576d5125b4bc'].title);
      expect(converted.questions).to.be.Array;
      expect(converted.questions[0]).to.be.Object;
      expect(converted.questions.length).to.equal(Object.keys(questions).length);
    });
    it('should include Select questions', () => {
      expect(converted.questions[2].kind).to.equal('Select');
      expect(converted.questions[2].title).to.be.String;
      expect(converted.questions[2].required).to.be.Boolean;
      expect(converted.questions[2].options).to.be.Array;
      expect(converted.questions[2].options[0]._id).to.be.String;
      expect(converted.questions[2].options[0].label).to.be.String;
      expect(converted.questions[2].maxSelection).to.be.Number;
    });
    it('should include Scale questions', () => {
      expect(converted.questions[0].kind).to.equal('Scale');
      expect(converted.questions[0].title).to.be.String;
      expect(converted.questions[0].required).to.be.Boolean;
      expect(converted.questions[0].min).to.be.Number;
      expect(converted.questions[0].max).to.be.Number;
    });
    it('should include Text questions', () => {
      expect(converted.questions[1].kind).to.equal('Text');
      expect(converted.questions[1].title).to.be.String;
      expect(converted.questions[1].required).to.be.Boolean;
      expect(converted.questions[1].max).to.be.Number;
    });
  });
  describe('denormalizeResponse', () => {
    it('should convert responses into mongo form', () => {
      const converted = denormalizeResponse('58ee63c65a2d576d5125b4bc', response, questions);
      expect(converted).to.be.Object;
      expect(converted.survey).to.equal('58ee63c65a2d576d5125b4bc');
      expect(converted.answers).to.be.Array;
      expect(converted.answers[0]).to.be.Object;
      expect(converted.answers[0].question).to.be.String;
      expect(converted.answers[0].kind).to.equal(questions[converted.answers[0].question].kind);
      expect(converted.answers[0].value)
             .to.equal(response.questions[converted.answers[0].question].value);
    });
  });
});
