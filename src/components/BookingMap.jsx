import React,{useEffect,useRef,useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export default function BookingMap({value,onChange}){
 const host=useRef(null),map=useRef(null),pin=useRef(null),change=useRef(onChange),initial=useRef(value);
 const [status,setStatus]=useState(value?'Location pinned':'Tap the map to pin your home'),[busy,setBusy]=useState(false),[failed,setFailed]=useState(false);
 change.current=onChange;
 function choose(latlng){const point={lat:Number(latlng.lat.toFixed(6)),lng:Number(latlng.lng.toFixed(6))};change.current(point);setStatus('Location pinned');}
 useEffect(()=>{
  const m=L.map(host.current,{scrollWheelZoom:false,zoomControl:false}).setView(initial.current?[initial.current.lat,initial.current.lng]:[30.0444,31.2357],initial.current?16:12);map.current=m;
  L.control.zoom({position:'topright'}).addTo(m);
  const layer=L.tileLayer(import.meta.env.VITE_MAP_TILE_URL||'https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',maxZoom:19}).addTo(m);
  layer.on('tileerror',()=>setFailed(true));
  m.on('click',e=>choose(e.latlng));
  const observer=new ResizeObserver(()=>m.invalidateSize());observer.observe(host.current);
  return()=>{observer.disconnect();m.remove();map.current=null;pin.current=null;};
 },[]);
 useEffect(()=>{if(!map.current)return;if(!value){if(pin.current){pin.current.remove();pin.current=null;}return;}const point=[value.lat,value.lng];if(pin.current)pin.current.setLatLng(point);else pin.current=L.marker(point,{draggable:true,icon:L.divIcon({className:'booking-map-pin',html:'<span></span>',iconSize:[32,40],iconAnchor:[16,40]}),title:'Your home location'}).addTo(map.current).on('dragend',e=>choose(e.target.getLatLng()));},[value]);
 function locate(){if(!navigator.geolocation){setStatus('Location unavailable. Tap the map instead.');return;}setBusy(true);navigator.geolocation.getCurrentPosition(p=>{if(!map.current)return;const point={lat:p.coords.latitude,lng:p.coords.longitude};choose(point);map.current.setView(point,16);setBusy(false);},()=>{setStatus('Could not access location. Tap the map instead.');setBusy(false);},{enableHighAccuracy:true,timeout:10000});}
 return <div className="booking-map-wrap"><div className="booking-map" ref={host} aria-label="Home location map"/><div className="booking-map-actions"><button type="button" onClick={locate} disabled={busy}>{busy?'Locating…':'◎ Use my location'}</button><button type="button" onClick={()=>choose(map.current.getCenter())}>Pin map centre</button></div><button type="button" className="booking-map-clear" hidden={!value} onClick={()=>{onChange(null);setStatus('Tap the map to pin your home')}}>Clear pin</button><p className="booking-map-status" role="status">{status}{value&&' · '+value.lat.toFixed(4)+', '+value.lng.toFixed(4)}</p>{failed&&<p className="booking-map-error">Some map tiles could not load. You can still enter your address below.</p>}</div>
}
