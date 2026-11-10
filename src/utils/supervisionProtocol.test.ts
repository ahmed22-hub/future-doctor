import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialSupervisionState,
  validateCurrentPhase,
  triggerManualOverride,
  restoreAutonomousMode,
} from './supervisionProtocol.ts';

test('initial supervision state starts at phase index 1 awaiting doctor validation', () => {
  const state = createInitialSupervisionState();
  assert.equal(state.currentPhaseIndex, 1);
  assert.equal(state.isManualOverride, false);
  assert.equal(state.phases[0].status, 'validated');
  assert.equal(state.phases[1].status, 'awaiting_validation');
});

test('doctor validation moves to the next surgical phase', () => {
  const initial = createInitialSupervisionState();
  const next = validateCurrentPhase(initial);

  assert.equal(next.phases[1].status, 'validated');
  assert.equal(next.currentPhaseIndex, 2);
  assert.equal(next.phases[2].status, 'awaiting_validation');
  assert.match(next.lastActionMessage, /validée par le médecin/i);
});

test('manual override halts autonomy and increments intervention count', () => {
  const initial = createInitialSupervisionState();
  const overridden = triggerManualOverride(initial);

  assert.equal(overridden.isManualOverride, true);
  assert.equal(overridden.totalInterventionsCount, 1);
  assert.equal(overridden.phases[1].status, 'manual_override');

  // Attempting to validate while in override should be blocked
  const attempt = validateCurrentPhase(overridden);
  assert.match(attempt.lastActionMessage, /action refusée/i);
});

test('restoring autonomous mode puts system back to awaiting validation', () => {
  const initial = createInitialSupervisionState();
  const overridden = triggerManualOverride(initial);
  const restored = restoreAutonomousMode(overridden);

  assert.equal(restored.isManualOverride, false);
  assert.equal(restored.phases[1].status, 'awaiting_validation');
  assert.match(restored.lastActionMessage, /réactivé/i);
});
