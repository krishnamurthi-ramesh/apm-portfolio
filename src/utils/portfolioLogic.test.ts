import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDY_KEYS,
  CASE_STUDIES,
  getNextCaseStudyKey,
  evaluateSimulatorOption,
  toggleMentalModelList,
} from './portfolioLogic';

test('getNextCaseStudyKey cycles forward and backward with wrap-around', () => {
  assert.equal(getNextCaseStudyKey('comet', 1), 'lending');
  assert.equal(getNextCaseStudyKey('lending', 1), 'rag');
  assert.equal(getNextCaseStudyKey('treacle', 1), 'comet');
  assert.equal(getNextCaseStudyKey('comet', -1), 'treacle');
});

test('evaluateSimulatorOption returns accurate SLA and PM verdict for Options A and B', () => {
  const resA = evaluateSimulatorOption('A');
  assert.equal(resA.meetsSla, false);
  assert.equal(resA.latencyMs, 2400);
  assert.match(resA.title, /Costly Overkill/);

  const resB = evaluateSimulatorOption('B');
  assert.equal(resB.meetsSla, true);
  assert.equal(resB.latencyMs, 480);
  assert.match(resB.title, /The Pragmatic Win/);
});

test('toggleMentalModelList adds and removes expanded model IDs cleanly', () => {
  const step1 = toggleMentalModelList([], 1);
  assert.deepEqual(step1, [1]);

  const step2 = toggleMentalModelList(step1, 3);
  assert.deepEqual(step2, [1, 3]);

  const step3 = toggleMentalModelList(step2, 1);
  assert.deepEqual(step3, [3]);
});

test('CASE_STUDIES contains all defined case studies with valid metadata', () => {
  for (const key of STUDY_KEYS) {
    assert.ok(CASE_STUDIES[key]);
    assert.ok(CASE_STUDIES[key].headline.length > 5);
  }
});
