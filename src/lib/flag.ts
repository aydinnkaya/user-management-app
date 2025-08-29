// lib/flags.ts
export type FlagSize = 16 | 20 | 32 | 40 | 48 | 64

const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

export const COUNTRY_TO_ISO2: Record<string, string> = {
  // Europe
  turkey: 'tr',
  turkiye: 'tr',
  türkiye: 'tr',
  'united kingdom': 'gb',
  uk: 'gb',
  'great britain': 'gb',
  england: 'gb',
  scotland: 'gb',
  wales: 'gb',
  germany: 'de',
  deutschland: 'de',
  france: 'fr',
  italy: 'it',
  spain: 'es',
  espana: 'es',
  españa: 'es',
  portugal: 'pt',
  netherlands: 'nl',
  holland: 'nl',
  belgium: 'be',
  switzerland: 'ch',
  austria: 'at',
  ireland: 'ie',
  poland: 'pl',
  'czech republic': 'cz',
  czechia: 'cz',
  denmark: 'dk',
  norway: 'no',
  sweden: 'se',
  finland: 'fi',
  iceland: 'is',
  russia: 'ru',
  ukraine: 'ua',
  romania: 'ro',
  greece: 'gr',
  hungary: 'hu',
  bulgaria: 'bg',
  croatia: 'hr',
  serbia: 'rs',
  slovakia: 'sk',
  slovenia: 'si',

  // Americas
  'united states': 'us',
  usa: 'us',
  'united states of america': 'us',
  america: 'us',
  canada: 'ca',
  mexico: 'mx',
  brasil: 'br',
  brazil: 'br',
  argentina: 'ar',
  chile: 'cl',
  colombia: 'co',
  peru: 'pe',
  uruguay: 'uy',
  paraguay: 'py',

  // Oceania
  australia: 'au',
  'new zealand': 'nz',

  // Asia
  japan: 'jp',
  china: 'cn',
  'hong kong': 'hk',
  taiwan: 'tw',
  'south korea': 'kr',
  'korea, republic of': 'kr',
  'republic of korea': 'kr',
  korea: 'kr',
  'north korea': 'kp',
  "korea, democratic people's republic of": 'kp',
  india: 'in',
  pakistan: 'pk',
  bangladesh: 'bd',
  'sri lanka': 'lk',
  nepal: 'np',
  thailand: 'th',
  vietnam: 'vn',
  'viet nam': 'vn',
  malaysia: 'my',
  singapore: 'sg',
  indonesia: 'id',
  philippines: 'ph',

  // Middle East
  'united arab emirates': 'ae',
  uae: 'ae',
  emirates: 'ae',
  qatar: 'qa',
  'saudi arabia': 'sa',
  kuwait: 'kw',
  oman: 'om',
  bahrain: 'bh',
  israel: 'il',
  iran: 'ir',
  'iran, islamic republic of': 'ir',
  'islamic republic of iran': 'ir',

  // Africa
  egypt: 'eg',
  morocco: 'ma',
  tunisia: 'tn',
  algeria: 'dz',
  'south africa': 'za',
  nigeria: 'ng',
  kenya: 'ke',
  ethiopia: 'et',
  ghana: 'gh',
  tanzania: 'tz',

  // Additional common variations
  tr: 'tr',
  gb: 'gb',
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
  pt: 'pt',
  nl: 'nl',
  be: 'be',
  ch: 'ch',
  at: 'at',
  ie: 'ie',
  pl: 'pl',
  cz: 'cz',
  dk: 'dk',
  no: 'no',
  se: 'se',
  fi: 'fi',
  is: 'is',
  ru: 'ru',
  ua: 'ua',
  ro: 'ro',
  gr: 'gr',
  hu: 'hu',
  bg: 'bg',
  hr: 'hr',
  rs: 'rs',
  sk: 'sk',
  si: 'si',
  us: 'us',
  ca: 'ca',
  mx: 'mx',
  br: 'br',
  ar: 'ar',
  cl: 'cl',
  co: 'co',
  pe: 'pe',
  uy: 'uy',
  py: 'py',
  au: 'au',
  nz: 'nz',
  jp: 'jp',
  cn: 'cn',
  hk: 'hk',
  tw: 'tw',
  kr: 'kr',
  kp: 'kp',
  in: 'in',
  pk: 'pk',
  bd: 'bd',
  lk: 'lk',
  np: 'np',
  th: 'th',
  vn: 'vn',
  my: 'my',
  sg: 'sg',
  id: 'id',
  ph: 'ph',
  ae: 'ae',
  qa: 'qa',
  sa: 'sa',
  kw: 'kw',
  om: 'om',
  bh: 'bh',
  il: 'il',
  ir: 'ir',
  eg: 'eg',
  ma: 'ma',
  tn: 'tn',
  dz: 'dz',
  za: 'za',
  ng: 'ng',
  ke: 'ke',
  et: 'et',
  gh: 'gh',
  tz: 'tz',
}

export function getFlagCode(countryOrIso2: string): string | null {
  if (!countryOrIso2) return null

  const raw = norm(countryOrIso2)
  if (!raw) return null

  // If it's already a valid ISO2 code, return it
  if (/^[a-z]{2}$/.test(raw)) {
    return COUNTRY_TO_ISO2[raw] || raw
  }

  // Otherwise, look it up in our mapping
  return COUNTRY_TO_ISO2[raw] || null
}

export function getFlagUrl(countryOrIso2: string, size: FlagSize = 20): string {
  const code = getFlagCode(countryOrIso2)
  if (code) {
    return `https://flagcdn.com/w${size}/${code}.png`
  }
  // Fallback for unknown countries
  return `https://flagcdn.com/w${size}/xx.png` // Unknown country flag
}
