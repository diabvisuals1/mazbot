export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function pinchTransform(start,a,b,width,height){
 const distance=Math.hypot(b.x-a.x,b.y-a.y);
 const scale=clamp(start.scale*distance/Math.max(1,start.distance),1,2.5);
 const center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
 const ratio=scale/start.scale;
 return {scale,x:clamp(center.x-(start.center.x-start.x)*ratio,-width*(scale-1)/2,width*(scale-1)/2),y:clamp(center.y-(start.center.y-start.y)*ratio,-height*(scale-1)/2,height*(scale-1)/2)};
}
