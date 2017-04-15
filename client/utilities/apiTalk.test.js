import chai from 'chai';
import { questions } from '../data/questions';
import { responses } from '../data/responses';
import { makeAggregates } from '../utilities/apiTalk';

const { expect } = chai;

describe('makeAggregates', () => {
  const aggregates = makeAggregates(questions, responses);
  it('should return an object of aggregated responses to a survey', () => {
    expect(aggregates).to.be.Object;
    expect(aggregates['58ee6466aa8ac36d6d74fe9f']).to.be.Object;
    expect(aggregates['58ee6466aa8ac36d6d74fe9e']).to.be.Object;
    expect(aggregates['58ee63c65a2d576d5125b4c1']).to.be.Object;
  });
  it('should create an array of responses for SCALE and TEXT', () => {
    expect(questions['58ee6466aa8ac36d6d74fe9e'].kind).to.equal('Text');
    expect(aggregates['58ee6466aa8ac36d6d74fe9e']).to.be.Array;
    expect(aggregates['58ee6466aa8ac36d6d74fe9e'][0]).to.be.String;
    expect(questions['58ee6466aa8ac36d6d74fe9f'].kind).to.equal('Scale');
    expect(aggregates['58ee6466aa8ac36d6d74fe9f']).to.be.Array;
    expect(aggregates['58ee6466aa8ac36d6d74fe9f'][0]).to.be.Number;
  });
  it('should create an object of option-votes key-values for SELECT', () => {
    expect(questions['58ee63c65a2d576d5125b4c1'].kind).to.equal('Select');
    expect(aggregates['58ee63c65a2d576d5125b4c1']).to.be.Object;
    expect(aggregates['58ee63c65a2d576d5125b4c1']['']).to.be.String;
  });
});
