import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRESENTATION_SLIDES,
  WORKFLOW_PRESENTATION_STEPS,
  getNextSlideIndex,
  getPrevSlideIndex,
  clampSlideIndex,
} from './presentationData.ts';

test('PRESENTATION_SLIDES has exactly 9 slides', () => {
  assert.equal(PRESENTATION_SLIDES.length, 9);
});

test('Slide 1 is Chirurgien du futur with valid quote and image', () => {
  const slide1 = PRESENTATION_SLIDES[0];
  assert.equal(slide1.id, 1);
  assert.equal(slide1.title, 'Chirurgien du futur');
  assert.match(slide1.quote || '', /Dans le futur, les robots/);
  assert.equal(slide1.imageKey, 'hero');
});

test('Slide 3 has 5 interactive workflow steps', () => {
  const slide3 = PRESENTATION_SLIDES[2];
  assert.equal(slide3.id, 3);
  assert.equal(slide3.title, 'Comment ça fonctionne ?');
  assert.ok(slide3.steps);
  assert.equal(slide3.steps?.length, 5);
  assert.equal(slide3.steps[0].title, 'Données du patient');
  assert.equal(slide3.steps[1].title, 'Analyse par l\'IA');
  assert.equal(slide3.steps[2].title, 'Préparation de l\'opération');
  assert.equal(slide3.steps[3].title, 'Le robot opère');
  assert.equal(slide3.steps[4].title, 'Surveillance');
});

test('Slide navigation helpers clamp properly', () => {
  assert.equal(getNextSlideIndex(0, 9), 1);
  assert.equal(getNextSlideIndex(8, 9), 8); // at last slide
  assert.equal(getPrevSlideIndex(0), 0);
  assert.equal(getPrevSlideIndex(5), 4);
  assert.equal(clampSlideIndex(-2, 9), 0);
  assert.equal(clampSlideIndex(15, 9), 8);
  assert.equal(clampSlideIndex(4, 9), 4);
});
