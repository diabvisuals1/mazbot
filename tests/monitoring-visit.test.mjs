import test from 'node:test';
import assert from 'node:assert/strict';
import { getMonitoringVisit } from '../src/data/monitoring.js';

test('an empty workspace shows an explicitly labelled sample visit', () => {
  const visit = getMonitoringVisit({ bookings: [], workflow: {} });
  assert.equal(visit.isDemo, true);
  assert.equal(visit.helperName, 'Souad Ibrahim');
  assert.equal(visit.progressIndex, 3);
  assert.equal(visit.sourceLabel, 'Sample visit');
});

test('selected visit wins and saved data does not claim live room activity', () => {
  const visit = getMonitoringVisit({ workflow: { selectedBooking: 'chosen' }, bookings: [
    { id: 'chosen', helper: 'Amal Mostafa', service: 'Nanny', status: 'Requested', time: '23:30', hours: 2 },
    { id: 'latest', helper: 'Souad Ibrahim', status: 'Active' },
  ] });
  assert.equal(visit.bookingId, 'chosen');
  assert.equal(visit.image, '/assets/b2a63.png');
  assert.equal(visit.status, 'Requested');
  assert.equal(visit.progressIndex, 0);
  assert.equal(visit.endLabel, '1:30 AM');
  assert.equal(visit.roomName, 'Location not tracked');
  assert.equal(visit.isDemo, false);
});

test('active visit is selected when no booking was selected; missing time stays unknown', () => {
  const visit = getMonitoringVisit({ workflow: {}, bookings: [
    { id: 'old', status: 'Active' }, { id: 'current', status: 'Trial', helper: 'Fatma El-Sayed' },
  ] });
  assert.equal(visit.bookingId, 'current');
  assert.equal(visit.status, 'Trial');
  assert.equal(visit.startLabel, 'Not set');
  assert.equal(visit.endLabel, 'Not set');
  assert.equal(visit.image, '/assets/8526c.png');
});

test('completed and ended visits do not show an in-progress milestone', () => {
  for (const [status, expected] of [['Completed', 4], ['Reviewed', 4], ['Ended', -1]]) {
    const visit = getMonitoringVisit({ workflow: { selectedBooking: 1 }, bookings: [{ id: 1, status }] });
    assert.equal(visit.progressIndex, expected);
    assert.equal(visit.status, status);
  }
});

test('an issue before service starts does not advance the service milestone', () => {
  const app = { workflow: { selectedBooking: 1 }, bookings: [{ id: 1, status: 'Issue reported', history: [{ status: 'Confirmed' }] }] };
  assert.equal(getMonitoringVisit(app).progressIndex, 2);
  app.bookings[0].history.push({ status: 'Active' });
  assert.equal(getMonitoringVisit(app).progressIndex, 3);
});
