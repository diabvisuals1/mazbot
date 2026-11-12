import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionBooking as step } from '../src/data/bookingState.js';

const request=()=>({id:'request',status:'Requested',price:400,date:'2099-01-01',history:[]});
function confirmed(trialRequired=false){
 let b={...request(),trialRequired};
 for(const [event,role,data] of [['accept','helper'],['sign','owner'],['equipment','owner',{equipment:[],equipmentTotal:0}],['pay','owner',{paid:400}]])b=step(b,event,role,data);
 return b;
}
test('accepted request reaches completion, balance and review with an audit history',()=>{
 let b=confirmed();b=step(b,'start','helper');assert.equal(b.status,'Active');
 b=step(b,'complete','helper');b=step(b,'review','owner',{review:{rating:5,text:'Great work'}});
 assert.equal(b.status,'Reviewed');assert.equal(b.review.rating,5);assert.equal(b.history.length,7);
});
test('owner-approved changes become the actual booking terms',()=>{
 let b=step(request(),'propose','helper',{proposal:{price:500,date:'2099-01-02'}});
 b=step(b,'acceptChanges','owner');assert.equal(b.price,500);assert.equal(b.date,'2099-01-02');assert.equal(b.status,'Accepted');
});
test('declined requests and rejected changes close without entering agreement',()=>{
 assert.equal(step(request(),'decline','helper').status,'Declined');
 const proposed=step(request(),'propose','helper',{proposal:{price:500}});
 assert.equal(step(proposed,'rejectChanges','owner').status,'Request closed');
});
test('trial supports continue, replacement and end/refund branches',()=>{
 const trial=step(confirmed(true),'start','helper');assert.equal(trial.status,'Trial');
 assert.equal(step(trial,'continue','owner').status,'Active');
 assert.equal(step(trial,'replace','owner').status,'Replacement requested');
 let b=step(trial,'end','owner');b=step(b,'refund','owner');b=step(b,'settleRefund','company',{refundAmount:400});assert.equal(b.status,'Refunded');
});
test('company intervention supports all three resolution branches',()=>{
 const active=step(confirmed(),'start','helper');const issue=step(active,'issue','owner',{issue:'Service problem'});
 assert.equal(step(issue,'resolve','company').status,'Active');assert.equal(step(issue,'replace','company').status,'Replacement requested');assert.equal(step(issue,'end','company').status,'Ended');
});
test('invalid roles, skipped stages and duplicate payment are rejected',()=>{
 assert.throws(()=>step(request(),'accept','owner'));
 assert.throws(()=>step(request(),'pay','owner'));
 assert.throws(()=>step(confirmed(),'pay','owner'));
 assert.throws(()=>step(confirmed(),'complete','helper'));
 assert.throws(()=>step(request(),'unknown','company'));
});
test('transitions preserve the source record and append rather than overwrite history',()=>{
 const original=request();const accepted=step(original,'accept','company');
 assert.equal(original.status,'Requested');assert.equal(original.history.length,0);assert.equal(accepted.history.length,1);
});
