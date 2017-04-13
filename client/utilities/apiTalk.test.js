import chai from 'chai';
import { questions } from '../data/questions';
import { options } from '../data/options';
import { responses } from '../data/responses';
import { makeAggregates } from '../utilities/apiTalk';
// import { mongoResponse } from '../data/mongoResponse';
// import { mongoUsers } from '../data/mongoUsers';
// import { mongoUser } from '../data/mongoUser';
import { normalizeSurveys, normalizeSurvey, normalizeResponses } from './normalize';

const { expect } = chai;

describe('makeAggregates', () => {
  it('should return a list of aggregated responses to a survey', () => {
    console.log('responsess', responses);
    const aggregates = makeAggregates(questions, options, responses);
    console.log(aggregates);
  });
});
