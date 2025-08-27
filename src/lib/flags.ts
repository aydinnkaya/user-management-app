export type FlagSize = 16 | 20 | 32 | 40 | 48 | 64

const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

// Ülke adı -> ISO2
const COUNTRY_TO_ISO2: Record<string, string> = {
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
  canada: 'ca',
  mexico: 'mx',
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
}

export function getFlagCode(countryOrIso2: string): string | null {
  if (!countryOrIso2) return null
  const raw = norm(countryOrIso2)

  // ISO2 formatıysa
  if (/^[a-z]{2}$/.test(raw)) return raw

  // Direkt map
  if (COUNTRY_TO_ISO2[raw]) return COUNTRY_TO_ISO2[raw]

  // Alias sadeleştirme
  const simplified = raw
    .replace(/^islamic republic of\s+/, '')
    .replace(/^republic of\s+/, '')
    .replace(/\s*\(.*\)\s*$/g, '')
    .trim()

  return COUNTRY_TO_ISO2[simplified] ?? null
}

export function getFlagUrl(countryOrIso2: string, size: FlagSize = 20): string {
  const code = getFlagCode(countryOrIso2)
  if (code) {
    return `https://flagcdn.com/w${size}/${code}.png`
  }
  return `https://countryflagsapi.com/png/${encodeURIComponent(countryOrIso2)}`
}
