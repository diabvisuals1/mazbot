// Keep older saved labels readable without changing the stored workflow data.
export const displayLabel = value => String(value || '')
  .replace(/\s*\(preview\)/gi, '')
  .replace(/\bpreview\s+([a-z])/gi, (_, letter) => letter.toUpperCase())
  .replace(/\s+in preview$/i, '')
  .trim();
