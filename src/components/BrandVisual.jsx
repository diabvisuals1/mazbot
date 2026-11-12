import React from 'react';

// Reuse the original MAZBOT artwork: same materials, lighting and camera angle.
export function visualFor(context='') {
 const value=context.toLowerCase();
 if(/clean|laundry|housekeep/.test(value))return '4d9d1.png';
 if(/cook|meal/.test(value))return 'a130b.png';
 if(/garden/.test(value))return 'bc4a7.png';
 if(/walk|driv/.test(value))return 'dfcf3.png';
 if(/nanny/.test(value))return 'e49e4.png';
 if(/nurs|care|medical/.test(value))return '35a6b.png';
 if(/chat|support|assistant|message/.test(value))return 'ce296.png';
 if(/document|verif|complet|confirm/.test(value))return '265f7.png';
 if(/location|track|address/.test(value))return 'dfcf3.png';
 if(/device|camera|monitor/.test(value))return '9d2af.png';
 if(/helper|team|job|experience/.test(value))return 'e49e4.png';
 if(/schedule|request|booking|order/.test(value))return 'a362e.png';
 if(/profile|setting|payment|budget/.test(value))return 'c7808.png';
 return 'b713a.png';
}
export function BrandVisual({context,src,className=''}) {
 return <img className={'brand-visual '+className} src={src||'/assets/'+visualFor(context)} alt="" draggable={false}/>;
}
export function BrandIcon({name='arrow',filled=false}) {
 const paths={arrow:'M5 12h14m-6-6 6 6-6 6',back:'M19 12H5m6-6-6 6 6 6',chevron:'m9 5 7 7-7 7',heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z'};
 return <svg className="brand-icon" width="22" height="22" viewBox="0 0 24 24" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.arrow}/></svg>;
}
