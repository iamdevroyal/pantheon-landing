export interface ContinentData {
  id: 'AFRICA' | 'EUROPE' | 'ASIA' | 'AMERICAS' | 'OCEANIA' | 'MIDDLE_EAST';
  name: string;
  emoji: string;
  color: string;
  lat: number;
  lng: number;
  tagline: string;
  lore: string;
  featuredGod: string;
  godImage: string;
  deityCount: number;
}

export const CONTINENTS: ContinentData[] = [
  {
    id: 'AFRICA',
    name: 'Africa',
    emoji: '🌍',
    color: '#FF9900',
    lat: 7.4,
    lng: 3.9,
    tagline: 'Realm of Thunder, Fire & Sacred Earth',
    lore: 'The drums of Oyo thunder across the heavens. Ṣàngó strikes his burning double-axe into the sky, raining lightning upon the mortals below to forge legendary kings and divine windfalls.',
    featuredGod: 'Ṣàngó (Lord of Thunder & Flame)',
    godImage: '/assets/gods/shango.jpg',
    deityCount: 60,
  },
  {
    id: 'EUROPE',
    name: 'Europe',
    emoji: '🌍',
    color: '#3B82F6',
    lat: 54.0,
    lng: 15.0,
    tagline: 'Pinnacles of Mount Olympus & Asgard',
    lore: 'Zeus commands blinding bolts of heavenly sovereignty from the peaks of Olympus, while All-Father Odin unleashes cosmic runes from the branches of the world tree Yggdrasil.',
    featuredGod: 'Zeus (Olympian God of Storms)',
    godImage: '/assets/gods/zeus.jpg',
    deityCount: 48,
  },
  {
    id: 'ASIA',
    name: 'Asia',
    emoji: '🌏',
    color: '#EF4444',
    lat: 34.0,
    lng: 100.0,
    tagline: 'Celestial Courts & The Radiant Lotus',
    lore: 'The Heavenly Empress Amaterasu illuminates the cosmic void with blinding solar grace, awakening jade dragons and cosmic lotuses to shower fortune upon those who dare awaken her.',
    featuredGod: 'Amaterasu (Celestial Solar Empress)',
    godImage: '/assets/gods/amaterasu.jpg',
    deityCount: 48,
  },
  {
    id: 'AMERICAS',
    name: 'Americas',
    emoji: '🌎',
    color: '#10B981',
    lat: 10.0,
    lng: -75.0,
    tagline: 'Feathered Serpents & Sun Pyramids',
    lore: 'Quetzalcoatl descends upon the sacred ziggurats on wings of emerald jade and crackling turquoise wind, weaving the cosmic balance between earth, sky, and boundless gold.',
    featuredGod: 'Quetzalcoatl (Feathered Serpent of Winds)',
    godImage: '/assets/gods/quetzalcoatl.jpg',
    deityCount: 36,
  },
  {
    id: 'OCEANIA',
    name: 'Oceania',
    emoji: '🌏',
    color: '#06B6D4',
    lat: -25.0,
    lng: 135.0,
    tagline: 'The Boundless Deep & Celestial Dreamtime',
    lore: 'Tangaroa commands the crushing tides and bioluminescent abyssal currents with his glowing trident, pulling islands and oceanic treasures from the depths of the primordial sea.',
    featuredGod: 'Tangaroa (Sovereign of the Boundless Abyss)',
    godImage: '/assets/gods/tangaroa.jpg',
    deityCount: 24,
  },
  {
    id: 'MIDDLE_EAST',
    name: 'Middle East',
    emoji: '🌍',
    color: '#F59E0B',
    lat: 28.0,
    lng: 45.0,
    tagline: 'Golden Sands & The Eternal Sun Barque',
    lore: 'Ra soars across the cosmic horizon in the golden solar barque, crushing the serpent of darkness under blinding sunbeams and showering golden ankhs upon his chosen worshippers.',
    featuredGod: 'Ra (The Eternal Sun God)',
    godImage: '/assets/gods/ra.jpg',
    deityCount: 24,
  },
];
