import catalog from './catalog.json';

export const services = ['Cleaning', 'Housekeeping', 'Gardening', 'Dog walking', 'House management', 'Driving', 'Cooking', 'Nursing', 'Caretaking', 'Nanny'];
export const roleNames = { owner: 'House Owner', helper: 'House Helper', company: 'Company' };
export const roleHomes = { owner: '/', helper: '/helper/home', company: '/company/dashboard' };
export const initialWorkflow = {
  role: 'owner', onboarded: false, authenticated: false, phone: '', verified: false,
  helper: { name: '', services: ['Cleaning'], experience: 0, rate: 400, documents: [], verification: 'Not submitted' },
  company: { name: '', registration: '', documents: [], verification: 'Not submitted' },
  requirements: { service: 'Cleaning', notes: '', hours: 4, trial: false, date: '', time: '10:00', address: '', budget: 600 },
  selectedBooking: null, applications: [], jobs: [], orders: [], reviews: [], team: [], devices: [
    { id: 'living', name: 'Living Room', online: true }, { id: 'entrance', name: 'Entrance', online: true },
    { id: 'kitchen', name: 'Kitchen', online: true }, { id: 'bedroom', name: 'Bedroom', online: false }
  ], cameraAlerts: true, reports: [],
};
export const helperDirectory = Object.entries(catalog.helpers).filter(([id]) => Number(id.split(':')[1]) < 1594)
  .filter(([, h], i, arr) => arr.findIndex(([, a]) => a.name === h.name) === i)
  .map(([id, h], i) => ({ ...h, id, services: [...new Set([services[i % services.length], 'Cleaning'])], days: [0,1,2,3,4], experience: i + 2, jobs: 24 + i * 13, location: ['Giza', 'Nasr City', 'New Cairo'][i % 3] }));
// Sample providers for categories not represented in the original cleaner catalog.
services.forEach((service, i) => {
  if (!helperDirectory.some(h => h.services.includes(service))) {
    const base = helperDirectory[i % helperDirectory.length];
    helperDirectory.push({ ...base, id: 'sample-' + i, name: ['Omar Ali', 'Mariam Adel'][i % 2], services: [service], price: 450, rating: 4.8 });
  }
});
export function localDate(value = new Date()) { const d = new Date(value); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export const uid = () => globalThis.crypto?.randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2);
export const normalizeService = s => ({ Chef:'Cooking', Gardener:'Gardening', Nurse:'Nursing', Driver:'Driving', BabySitter:'Nanny', Cleaner:'Cleaning' }[s] || s);
export function matchesHelper(h, filters) {
  return h.active !== false && (h.services || []).some(service => normalizeService(service) === normalizeService(filters.service || 'Cleaning')) && h.price <= (filters.budget == null || filters.budget === '' ? Infinity : Number(filters.budget)) && h.price >= Number(filters.minBudget || 0) && h.rating >= Number(filters.rating || 0) && (!filters.days?.length || filters.days.every(day => (h.days || [0,1,2,3,4,5,6]).includes(day))) && (!filters.date || (h.days || [0,1,2,3,4,5,6]).includes(new Date(filters.date + 'T12:00:00').getDay()));
}
export { transitions, transitionBooking } from './bookingState.js';
