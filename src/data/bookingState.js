export const transitions = {
  accept: { from:['Requested'], roles:['helper','company'], to:'Accepted' },
  decline: { from:['Requested'], roles:['helper','company'], to:'Declined' },
  propose: { from:['Requested'], roles:['helper','company'], to:'Changes proposed' },
  acceptChanges: { from:['Changes proposed'], roles:['owner'], to:'Accepted' },
  rejectChanges: { from:['Changes proposed'], roles:['owner'], to:'Request closed' },
  sign: { from:['Accepted'], roles:['owner'], to:'Agreement signed' },
  equipment: { from:['Agreement signed'], roles:['owner'], to:'Summary ready' },
  pay: { from:['Summary ready'], roles:['owner'], to:'Confirmed' },
  start: { from:['Confirmed'], roles:['helper','company'], to:b=>b.trialRequired?'Trial':'Active' },
  continue: { from:['Trial'], roles:['owner'], to:'Active' },
  issue: { from:['Active','Trial','Confirmed'], roles:['owner','helper'], to:'Issue reported' },
  resolve: { from:['Issue reported'], roles:['company'], to:'Active' },
  replace: { from:['Trial','Issue reported'], roles:['owner','company'], to:'Replacement requested' },
  end: { from:['Trial','Active','Issue reported'], roles:['owner','company'], to:'Ended' },
  refund: { from:['Ended'], roles:['owner','company'], to:'Refund review' },
  settleRefund: { from:['Refund review'], roles:['company'], to:'Refunded' },
  complete: { from:['Active'], roles:['helper','company'], to:'Completed' },
  review: { from:['Completed'], roles:['owner'], to:'Reviewed' },
  cancel: { from:['Requested','Changes proposed','Accepted'], roles:['owner'], to:'Cancelled' },
};
export function transitionBooking(booking, event, role, data={}) {
  const t=transitions[event];
  if(!t || !t.from.includes(booking.status) || !t.roles.includes(role)) throw new Error('This action is not available for the current booking state.');
  const status=typeof t.to==='function'?t.to(booking):t.to;
  const changes=event==='acceptChanges'?{...booking.proposal}:{};
  return { ...booking, ...changes, ...data, status, history:[...(booking.history||[]),{event,status,role,at:new Date().toISOString()}] };
}
