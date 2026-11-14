// Keep the viewer and shared phone chrome in the same mode for every entry point.
export function getCameraPreview(location, devices = []) {
  const isCameraRoute = location.pathname === '/monitoring/cameras'
    || location.pathname === '/flow/devices'
    || location.pathname.startsWith('/flow/device/');
  if (!isCameraRoute) return null;
  const id = new URLSearchParams(location.search).get('room')
    || (location.pathname.startsWith('/flow/device/') ? location.pathname.split('/').at(-1) : null);
  return devices.find(device => device.id === id && device.online) || null;
}
