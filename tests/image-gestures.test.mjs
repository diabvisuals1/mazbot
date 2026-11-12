import test from 'node:test';
import assert from 'node:assert/strict';
import {pinchTransform} from '../src/components/imageGestures.js';
const start={scale:1,distance:100,center:{x:0,y:0},x:0,y:0};
test('pinch tracks finger distance instead of jumping between zoom steps',()=>{
 assert.deepEqual(pinchTransform(start,{x:-75,y:0},{x:75,y:0},320,260),{scale:1.5,x:0,y:0});
});
test('moving the pinch center moves the image with the fingers',()=>{
 assert.deepEqual(pinchTransform(start,{x:-50,y:20},{x:100,y:20},320,260),{scale:1.5,x:25,y:20});
});
test('zoom and pan stay bounded, including when returning to original size',()=>{
 const max=pinchTransform(start,{x:-1000,y:900},{x:1000,y:900},320,260);
 assert.equal(max.scale,2.5);assert.equal(max.y,195);
 const min=pinchTransform({...start,scale:2,x:80,y:60},{x:0,y:0},{x:1,y:0},320,260);
 assert.equal(min.scale,1);assert.equal(Math.abs(min.x),0);assert.equal(Math.abs(min.y),0);
});
