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
    const aggregates = makeAggregates(questions, responses);
    expect(aggregates).to.be.Object;
    expect(aggregates['58ee6466aa8ac36d6d74fe9f']).to.be.Object;
    expect(aggregates['58ee6466aa8ac36d6d74fe9f']).to.be.Array;
    expect(aggregates['58ee6466aa8ac36d6d74fe9f'][0]).to.be.Number;
    expect(aggregates['58ee6466aa8ac36d6d74fe9e']).to.be.Object;
    expect(aggregates['58ee6466aa8ac36d6d74fe9e']).to.be.Array;
    expect(aggregates['58ee6466aa8ac36d6d74fe9e'][0]).to.be.String;
    expect(aggregates['58ee63c65a2d576d5125b4c1']).to.be.Object;
    expect(aggregates['58ee63c65a2d576d5125b4c1']).to.be.Object;
    expect(aggregates['58ee63c65a2d576d5125b4c1']['']).to.be.String;
  });
});
