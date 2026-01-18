const STORAGE_KEY = 'elekin_attribution_v1';

export const ATTR_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  // Common click IDs (useful for ad platform attribution)
  'gclid',
  'fbclid',
  'ttclid',
];

export function readAttributionFromSearch(search) {
  const params = new URLSearchParams(search || '');
  const out = {};

  for (const key of ATTR_KEYS) {
    const val = params.get(key);
    if (val) out[key] = val;
  }

  return out;
}

export function storeAttribution(attribution) {
  try {
    if (!attribution || Object.keys(attribution).length === 0) return;
    const payload = {
      ...attribution,
      capturedAt: new Date().toISOString(),
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function loadAttribution() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const out = {};
    for (const key of ATTR_KEYS) {
      if (parsed?.[key]) out[key] = String(parsed[key]);
    }
    return out;
  } catch {
    return {};
  }
}

export function mergeAttribution(primary, fallback) {
  return { ...(fallback || {}), ...(primary || {}) };
}

export function buildSearch(attribution) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(attribution || {})) {
    if (!v) continue;
    params.set(k, String(v));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function buildTrackedPath(pathname, currentSearch) {
  const current = readAttributionFromSearch(currentSearch);
  const stored = loadAttribution();
  const merged = mergeAttribution(current, stored);
  return `${pathname}${buildSearch(merged)}`;
}


