import { getMonitoringVisit } from './monitoring.js';

export const ASSISTANT_COPY_VERSION = 2;

export function getAssistantReply(question, app = {}) {
  const q = String(question || '').toLowerCase();
  const devices = Array.isArray(app.workflow?.devices) ? app.workflow.devices : [];
  const bookings = Array.isArray(app.bookings) ? app.bookings : [];
  const online = devices.filter(d => d.online), offline = devices.filter(d => !d.online);
  const cameraText = devices.length
    ? `Your camera list shows ${online.length} of ${devices.length} cameras online.${offline.length ? ` ${offline.map(d => d.name).join(', ')} ${offline.length === 1 ? 'is' : 'are'} marked offline.` : ' All cameras are connected.'}`
    : 'There are no cameras in your camera list yet.';
  const cameras = { icon: 'camera', label: 'Explore my cameras', detail: 'Room views & connection status', to: '/monitoring/cameras' };
  const helper = { icon: 'helper', label: 'Message your helper', detail: 'Get an update directly', to: '/chats' };
  const room = devices.find(d => q.includes(String(d.name).toLowerCase()) || q.includes(String(d.id).toLowerCase()));
  const visit = getMonitoringVisit(app);
  const activity = String(visit.activity || visit.status).replace(/\s*·\s*saved update/gi, '');
  const visitText = `${visit.helperName}’s visit is marked ${String(visit.status).toLowerCase()}. ${activity}.${visit.startLabel && visit.startLabel !== 'Not set' ? ` Start time: ${visit.startLabel}.` : ''}`;
  const answer = (text, actions, tag) => ({ text, actions, tag, copyVersion: ASSISTANT_COPY_VERSION });

  if (/schedule|bookings?|upcoming|next visit|موعد|جدول|حجوزات/.test(q)) return answer(
    bookings.length ? `You have ${bookings.length} booking${bookings.length === 1 ? '' : 's'}. Open your schedule to review dates, helpers and each request’s status.` : 'Your schedule is clear. Once you book a helper, you’ll find your requests and upcoming visits here.',
    [{ icon: 'helper', label: 'Open my schedule', detail: 'Visits & booking details', to: '/schedule' }], 'Your schedule',
  );
  if (room && !/helper|doing|arriv|clean|activity|هيلبر|بيعمل/.test(q)) return answer(
    room.online ? `The ${room.name} camera is marked online. Open its room view to explore the space in 360° and check the connection details.` : `The ${room.name} camera is marked offline. Check that it has power and a Wi-Fi connection, then reconnect it using your camera provider’s app.\n\nYou can open its details below.`,
    [{ icon: 'camera', label: `Open ${room.name}`, detail: room.online ? 'Room view & camera details' : 'Offline camera details', to: '/flow/device/' + encodeURIComponent(room.id) }, cameras], `${room.name} · ${room.online ? 'Online' : 'Offline'}`,
  );
  if (/offline|disconnect|not working|connection|reconnect|مش شغال|مفصول/.test(q)) return answer(`${cameraText}\n\nFor an offline camera, check its power and Wi-Fi first, then reconnect it in your camera provider’s app.`, [cameras], 'Connection guide');
  if (/camera|connected|360|room|كاميرا|اوض/.test(q) && !/helper|doing|arriv|clean|activity|هيلبر|بيعمل/.test(q)) return answer(`${cameraText}\n\nChoose a room to explore its 360° view and camera details.`, [cameras], 'Camera overview');
  if (/find|match|hire|book|حجز|دور/.test(q)) return answer('Let’s find someone who fits your home. Tell us the service, your preferred days and your budget. You can compare profiles before sending a booking request.', [{ icon: 'heart', label: 'Let’s find your match', detail: 'Your needs, your perfect fit', to: '/flow/requirements' }], 'A helping hand');
  if (/helper|doing|arriv|clean|activity|هيلبر|بيعمل/.test(q)) return answer(`${visitText}\n\nFor a personal update, send your helper a message.`, [helper, { icon: 'camera', label: 'Explore your home', detail: 'Rooms & camera details', to: '/monitoring/cameras' }], 'Helper update');
  if (/home|check|okay|summary|update|safe|بيت|ملخص/.test(q)) return answer(`${cameraText}\n\n${visitText}\n\nOpen your cameras or message your helper for a closer look.`, [cameras, helper], 'Your home at a glance');
  if (/thank|شكرا|شكر/.test(q)) return answer('You’re welcome. A little less to think about, a little more peace of mind. What would you like to explore next?', [cameras], 'Here for your home');
  return answer('Let’s focus on your home. I can help you find camera details, check visit information, review bookings, or choose a helper.\n\nTry “Are all my cameras connected?” or “Help me find a helper.”', [cameras, { icon: 'heart', label: 'Find my match', detail: 'Start with what your home needs', to: '/flow/requirements' }], 'Let’s explore');
}

function allowedAction(action) {
  return action && typeof action.label === 'string' && typeof action.to === 'string'
    && (['/monitoring/cameras', '/monitoring', '/flow/requirements', '/chats', '/schedule'].includes(action.to) || /^\/flow\/device\/(living|entrance|kitchen|bedroom)$/.test(action.to));
}

export function restoreAssistantMessages(saved, app = {}) {
  if (!Array.isArray(saved)) return [];
  let previousQuestion = '';
  return saved.filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.id === 'string' && typeof m.text === 'string' && m.text.length <= 4000).slice(-40).map(m => {
    const message = {
      id: m.id, role: m.role, text: m.text, tag: typeof m.tag === 'string' ? m.tag : '', copyVersion: m.copyVersion,
      actions: Array.isArray(m.actions) ? m.actions.filter(allowedAction).map(a => ({ label: a.label, to: a.to, detail: typeof a.detail === 'string' ? a.detail : '', icon: typeof a.icon === 'string' ? a.icon : 'spark' })) : [],
    };
    if (message.role === 'user') { previousQuestion = message.text; return message; }
    // Refresh only obsolete generated responses. User-authored content is retained exactly.
    if (message.copyVersion !== ASSISTANT_COPY_VERSION) return { ...message, ...getAssistantReply(previousQuestion, app) };
    return message;
  });
}
