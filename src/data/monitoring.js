const fallbackVisit = {
  helperName: 'Souad Ibrahim', image: '/assets/e91be.png', service: 'Cleaning',
  status: 'In progress', startLabel: '10:05 AM', endLabel: '11:30 AM',
  roomId: 'living', roomName: 'Living Room', activity: 'Tidying the living room',
  isDemo: true, bookingId: null, progressIndex: 3, dateLabel: '', sourceLabel: 'Sample visit',
};

const knownPortraits = {
  'Souad Ibrahim': '/assets/e91be.png', 'Fatma El-Sayed': '/assets/8526c.png',
  'Amal Mostafa': '/assets/b2a63.png', 'Shaimaa Ali': '/assets/867ad.png',
};
const activeStatuses = ['Active', 'Trial', 'Confirmed', 'Issue reported'];
const stages = {
  Requested: 0, 'Changes proposed': 0, Accepted: 1, 'Agreement signed': 1,
  'Summary ready': 1, Confirmed: 2, Trial: 3, Active: 3, 'Issue reported': 3,
  Completed: 4, Reviewed: 4,
};
function formatTime(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value || '');
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return null;
  const hours = Number(match[1]), minutes = Number(match[2]);
  return { minutes: hours * 60 + minutes, label: `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}` };
}
function formatMinutes(minutes) {
  const time = ((minutes % 1440) + 1440) % 1440;
  return formatTime(`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`).label;
}

// All monitoring surfaces share the same saved visit. Room activity is only
// provided for the labelled sample, since bookings do not contain live location.
export function getMonitoringVisit(app = {}) {
  const bookings = Array.isArray(app.bookings) ? app.bookings : [];
  const selected = app.workflow?.selectedBooking;
  const booking = bookings.find(item => item && String(item.id) === String(selected))
    || [...bookings].reverse().find(item => item && activeStatuses.includes(item.status));
  if (!booking) return { ...fallbackVisit };

  const helperName = booking.helper || 'Your helper';
  const time = formatTime(booking.time || booking.requirements?.time);
  const hours = Number(booking.hours ?? booking.requirements?.hours);
  const endLabel = time && Number.isFinite(hours) && hours > 0 && hours <= 24
    ? formatMinutes(time.minutes + Math.round(hours * 60)) : 'Not set';
  const status = booking.status || 'Requested';
  const activity = status === 'Active' ? 'Service in progress'
    : status === 'Trial' ? 'Trial visit in progress'
    : status === 'Confirmed' ? 'Visit confirmed · awaiting service update'
    : ['Completed', 'Reviewed'].includes(status) ? 'Service completed'
    : status === 'Issue reported' ? 'Issue reported · awaiting review'
    : `Booking ${status.toLowerCase()}`;
  const date = booking.date && /^\d{4}-\d{2}-\d{2}$/.test(booking.date) ? new Date(`${booking.date}T12:00:00`) : null;
  return {
    helperName, image: booking.helperImage || knownPortraits[helperName] || '/assets/home-avatar.svg',
    service: booking.service || 'Home service', status: status === 'Active' ? 'In progress' : status,
    startLabel: time?.label || 'Not set', endLabel, roomId: 'living', roomName: 'Location not tracked',
    activity, isDemo: false, bookingId: booking.id,
    progressIndex: status === 'Issue reported'
      ? (booking.history?.some(event => ['Active', 'Trial'].includes(event.status)) ? 3 : 2)
      : stages[status] ?? -1,
    dateLabel: date && Number.isFinite(date.getTime()) ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '',
    sourceLabel: 'Saved booking',
  };
}
