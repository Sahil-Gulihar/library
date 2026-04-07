export interface Book {
  id: number;
  title: string;
  master: string;
  year: number;
  languages: string[];
  categories: string[];
  abstract: string;
  shelf: string;
  available: boolean;
  parts?: number;
  partNumber?: number;
  seriesId?: number;
}

export const MASTERS = [
  {
    name: "Hazur Baba Sawan Singh Ji Maharaj",
    shortName: "Baba Sawan Singh Ji",
    period: "1858–1948",
    description: "The Great Master who spread the teachings of Sant Mat far and wide, initiating over 125,000 souls during His ministry.",
    colorClass: "sawan",
    bookCount: 3,
  },
  {
    name: "Param Sant Kirpal Singh Ji Maharaj",
    shortName: "Sant Kirpal Singh Ji",
    period: "1894–1974",
    description: "Founder of the World Fellowship of Religions and pioneer of the Unity of Man movement. A prolific author and spiritual luminary.",
    colorClass: "kirpal",
    bookCount: 9,
  },
  {
    name: "Dayal Purush Sant Darshan Singh Ji Maharaj",
    shortName: "Sant Darshan Singh Ji",
    period: "1921–1989",
    description: "One of India's greatest Urdu poets, recipient of the Urdu Academy Award, who expressed the highest mystical truths through sublime verse.",
    colorClass: "darshan",
    bookCount: 7,
  },
  {
    name: "Sant Rajinder Singh Ji Maharaj",
    shortName: "Sant Rajinder Singh Ji",
    period: "1946–Present",
    description: "Current head of Science of Spirituality, a modern-day scientist-saint bridging Eastern spirituality and Western science.",
    colorClass: "rajinder",
    bookCount: 6,
  },
];

export const CATEGORIES = [
  "Meditation", "Surat Shabd Yoga", "Ghazals / Mystic Poetry", "Biography / Life Sketches",
  "Philosophy", "Health & Vegetarianism", "Unity of Man", "Spirituality & Science",
  "Sant Mat", "Prayer", "Karma & Reincarnation",
];

export const LANGUAGES = [
  "English", "Hindi", "Punjabi", "Urdu", "Spanish", "French", "German", "Italian",
  "Portuguese", "Russian", "Dutch", "Japanese", "Chinese", "Tamil", "Telugu",
  "Gujarati", "Marathi", "Bengali", "Polish",
];

export const books: Book[] = [
  // Philosophy of the Masters — 5 volumes, seriesId 100
  { id: 1, title: "Philosophy of the Masters (Gurmat Sidhant) – Vol. I", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1963, languages: ["English", "Hindi", "Punjabi"], categories: ["Sant Mat", "Philosophy", "Surat Shabd Yoga"], abstract: "The first volume of a comprehensive five-volume exposition of the Sikh scriptures and Sant Mat philosophy, explaining the nature of God, the soul, and the path of Naam.", shelf: "Shelf A – Row 1 – Position 1", available: true, parts: 5, partNumber: 1, seriesId: 100 },
  { id: 26, title: "Philosophy of the Masters (Gurmat Sidhant) – Vol. II", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1964, languages: ["English", "Hindi", "Punjabi"], categories: ["Sant Mat", "Philosophy", "Surat Shabd Yoga"], abstract: "The second volume continues the exposition on the inner Sound Current and the stages of spiritual ascent as described in Sikh and Sant Mat scriptures.", shelf: "Shelf A – Row 1 – Position 2", available: true, parts: 5, partNumber: 2, seriesId: 100 },
  { id: 27, title: "Philosophy of the Masters (Gurmat Sidhant) – Vol. III", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1965, languages: ["English", "Hindi", "Punjabi"], categories: ["Sant Mat", "Philosophy", "Surat Shabd Yoga"], abstract: "The third volume delves deeper into the metaphysics of creation, the nature of mind and matter, and the role of the Master.", shelf: "Shelf A – Row 1 – Position 3", available: false, parts: 5, partNumber: 3, seriesId: 100 },
  { id: 28, title: "Philosophy of the Masters (Gurmat Sidhant) – Vol. IV", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1966, languages: ["English", "Hindi"], categories: ["Sant Mat", "Philosophy", "Surat Shabd Yoga"], abstract: "Volume four discusses the moral and ethical foundation necessary for the spiritual journey, with extensive references from the saints.", shelf: "Shelf A – Row 1 – Position 4", available: true, parts: 5, partNumber: 4, seriesId: 100 },
  { id: 29, title: "Philosophy of the Masters (Gurmat Sidhant) – Vol. V", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1967, languages: ["English", "Hindi"], categories: ["Sant Mat", "Philosophy", "Surat Shabd Yoga"], abstract: "The concluding volume summarizes the entire path, from initiation to final liberation, as taught by the Great Master.", shelf: "Shelf A – Row 1 – Position 5", available: true, parts: 5, partNumber: 5, seriesId: 100 },

  { id: 2, title: "Spiritual Gems", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1965, languages: ["English", "Hindi"], categories: ["Spirituality & Science", "Meditation", "Sant Mat"], abstract: "A collection of letters written by Hazur Maharaj Ji to his disciples across the world, offering personal guidance on meditation, daily life, and the inner spiritual journey. These gems of wisdom illuminate the practical and mystical aspects of the path.", shelf: "Shelf A – Row 1 – Position 6", available: true },
  { id: 3, title: "Dawn of Light", master: "Hazur Baba Sawan Singh Ji Maharaj", year: 1970, languages: ["English", "Hindi", "Punjabi", "Urdu"], categories: ["Sant Mat", "Spirituality & Science", "Philosophy"], abstract: "Letters and discourses by Hazur Baba Sawan Singh Ji that offer profound spiritual direction to seekers. The book illuminates the inner path with clarity and compassion, drawing on scripture and personal experience of the Divine Light within.", shelf: "Shelf A – Row 2 – Position 1", available: false },
  { id: 4, title: "The Crown of Life", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1961, languages: ["English", "Hindi", "German", "French", "Spanish"], categories: ["Surat Shabd Yoga", "Philosophy", "Sant Mat"], abstract: "A definitive comparative study of the various yoga systems with a special focus on Surat Shabd Yoga — the yoga of the inner Light and Sound. Widely considered a masterwork, this book guides seekers through the science of the soul's ascent to God.", shelf: "Shelf B – Row 1 – Position 3", available: true },
  { id: 5, title: "Naam or Word", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1960, languages: ["English", "Hindi", "Punjabi", "German", "Dutch"], categories: ["Surat Shabd Yoga", "Meditation", "Philosophy"], abstract: "An in-depth study of the Celestial Sound Current — the God-into-Expression Power known by many names: Naam, Word, Shabd, Music of the Spheres. This work traces its presence across all major world religions and spiritual traditions.", shelf: "Shelf B – Row 1 – Position 6", available: true },
  { id: 6, title: "The Jap Ji: The Message of Guru Nanak", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1959, languages: ["English", "Hindi", "Punjabi", "Spanish", "French", "Italian"], categories: ["Philosophy", "Sant Mat", "Spirituality & Science"], abstract: "An extensive commentary on the Jap Ji Sahib, the opening scripture of the Sikh Granth Sahib and the morning prayer of all Sikhs. Sant Kirpal Singh unveils the deep spiritual truths encoded in Guru Nanak's masterful hymn.", shelf: "Shelf B – Row 2 – Position 2", available: false },
  { id: 7, title: "Morning Talks", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1970, languages: ["English", "Hindi", "German", "French"], categories: ["Meditation", "Spirituality & Science", "Philosophy"], abstract: "A beloved collection of short, informal morning discourses given by Sant Kirpal Singh to his close disciples at Sawan Ashram, Delhi. Each talk offers practical, warm wisdom on spirituality, meditation, and daily living.", shelf: "Shelf B – Row 2 – Position 7", available: true },
  { id: 8, title: "Godman", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1967, languages: ["English", "Hindi", "Punjabi", "German"], categories: ["Biography / Life Sketches", "Sant Mat", "Philosophy"], abstract: "An exploration of the mission, nature, and necessity of a living spiritual Master. Sant Kirpal Singh explains how a true Godman serves as a human pole through which the divine Power can manifest to uplift souls back to their Source.", shelf: "Shelf B – Row 3 – Position 1", available: true },
  { id: 9, title: "The Mystery of Death", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1968, languages: ["English", "Hindi", "Spanish", "French", "Italian"], categories: ["Karma & Reincarnation", "Philosophy", "Sant Mat"], abstract: "Saints know the shadowy character of death and teach that it is not what it seems. This book dispels the fear of death by revealing the soul's immortal nature and its journey beyond the physical, drawing on mystical experience and scriptural testimony.", shelf: "Shelf B – Row 3 – Position 4", available: false },
  { id: 10, title: "The Wheel of Life", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1965, languages: ["English", "Hindi", "German", "Dutch", "Portuguese"], categories: ["Karma & Reincarnation", "Philosophy"], abstract: "A profound discourse on the law of karma — 'As you sow, so shall you reap.' Sant Kirpal Singh explains the workings of karma across multiple lifetimes and how one can transcend the cycle of birth and death through Naam.", shelf: "Shelf B – Row 4 – Position 2", available: true },

  // Spiritual Elixir — 2 parts, seriesId 101
  { id: 11, title: "Spiritual Elixir – Part I", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1975, languages: ["English", "Hindi"], categories: ["Meditation", "Spirituality & Science"], abstract: "The first part of a rich collection of questions and answers from disciples' private correspondence with Sant Kirpal Singh, covering practical meditation guidance and spiritual experiences.", shelf: "Shelf B – Row 4 – Position 8", available: true, parts: 2, partNumber: 1, seriesId: 101 },
  { id: 30, title: "Spiritual Elixir – Part II", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1976, languages: ["English", "Hindi"], categories: ["Meditation", "Spirituality & Science"], abstract: "The second part continues the spiritual Q&A, covering deeper aspects of meditation practice, inner experiences, and life situations on the path.", shelf: "Shelf B – Row 4 – Position 9", available: true, parts: 2, partNumber: 2, seriesId: 101 },

  { id: 12, title: "Prayer: Its Nature and Technique", master: "Param Sant Kirpal Singh Ji Maharaj", year: 1959, languages: ["English", "Hindi", "Spanish", "French", "German"], categories: ["Prayer", "Meditation", "Spirituality & Science"], abstract: "A masterful guide on the nature, science, and technique of prayer. Sant Kirpal Singh explains how genuine prayer transcends mere petition and becomes a living communion with the Divine Power within.", shelf: "Shelf C – Row 1 – Position 1", available: true },
  { id: 13, title: "Cry of the Soul", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1980, languages: ["English", "Hindi", "Urdu", "Spanish", "French", "German", "Italian"], categories: ["Ghazals / Mystic Poetry", "Philosophy", "Sant Mat"], abstract: "A landmark collection of mystic poetry by Sant Darshan Singh Ji, one of India's greatest Urdu poets. These ghazals and verses cry out for union with the Beloved — God — and reveal the soul's deep longing for its Divine Source through the language of love.", shelf: "Shelf C – Row 2 – Position 3", available: true },
  { id: 14, title: "The Secret of Secrets", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1978, languages: ["English", "Hindi", "Spanish", "French", "German", "Portuguese"], categories: ["Meditation", "Sant Mat", "Spirituality & Science"], abstract: "Spiritual discourses by Sant Darshan Singh Ji revealing the deepest truths of the inner path. With characteristic warmth and poetic beauty, he expounds on meditation, the nature of the soul, and the experience of inner Light and Sound.", shelf: "Shelf C – Row 2 – Position 6", available: false },
  { id: 15, title: "Spiritual Awakening", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1983, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Dutch"], categories: ["Meditation", "Philosophy", "Spirituality & Science"], abstract: "A collection of discourses covering the fundamentals of spirituality, the discipline of the spiritual path, and the alchemy of love that transforms the human into the divine. An inspiring guide for seekers at all stages of the inner journey.", shelf: "Shelf C – Row 3 – Position 2", available: true },
  { id: 16, title: "Portrait of Perfection", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1981, languages: ["English", "Hindi"], categories: ["Biography / Life Sketches", "Sant Mat"], abstract: "A pictorial biography of Param Sant Kirpal Singh Ji Maharaj, compiled with deep love and reverence by his spiritual successor. This tribute captures the life, mission, and divine grace of the Master through photographs and biographical narrative.", shelf: "Shelf C – Row 3 – Position 5", available: true },
  { id: 17, title: "A Tear and a Star", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1986, languages: ["English", "Hindi", "Urdu", "Spanish", "French"], categories: ["Ghazals / Mystic Poetry", "Sant Mat"], abstract: "A luminous collection of mystic verse by Sant Darshan Singh Ji — winner of the Urdu Academy Award. These poems balance the tear of longing with the star of hope, weaving a tapestry of divine love, inner experience, and mystical beauty.", shelf: "Shelf C – Row 4 – Position 1", available: true },
  { id: 18, title: "The Wonders of Inner Space", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1988, languages: ["English", "Hindi", "Spanish", "German", "French", "Italian"], categories: ["Meditation", "Surat Shabd Yoga", "Spirituality & Science"], abstract: "Inspiring discourses on the inner spiritual regions accessible through meditation on the inner Light and Sound. Sant Darshan Singh Ji describes the wonders that await the soul as it ascends through higher planes of consciousness toward God.", shelf: "Shelf C – Row 4 – Position 4", available: false },
  { id: 19, title: "Streams of Nectar", master: "Dayal Purush Sant Darshan Singh Ji Maharaj", year: 1985, languages: ["English", "Hindi", "Spanish"], categories: ["Biography / Life Sketches", "Sant Mat", "Philosophy"], abstract: "An exploration of the lives and teachings of many saints across diverse traditions, showing the common thread of inner Light and Sound that unites all true mystics. A nectar of wisdom drawn from the ocean of sainthood.", shelf: "Shelf C – Row 5 – Position 2", available: true },
  { id: 20, title: "Empowering Your Soul Through Meditation", master: "Sant Rajinder Singh Ji Maharaj", year: 1999, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", "Russian", "Japanese", "Chinese", "Tamil", "Gujarati"], categories: ["Meditation", "Spirituality & Science", "Surat Shabd Yoga"], abstract: "A practical guide to awakening the soul's innate qualities — wisdom, fearlessness, immortality, unconditional love, and bliss — through the transformative power of meditation. Chapters guide the reader step by step toward inner liberation.", shelf: "Shelf D – Row 1 – Position 1", available: true },
  { id: 21, title: "Inner and Outer Peace Through Meditation", master: "Sant Rajinder Singh Ji Maharaj", year: 1996, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Polish", "Russian", "Dutch"], categories: ["Meditation", "Unity of Man", "Spirituality & Science"], abstract: "A beloved guide presenting meditation as the path to personal peace and world harmony. Sant Rajinder Singh Ji explains how the inner sanctuary of meditation can become a private refuge, transforming individuals and by extension the world.", shelf: "Shelf D – Row 1 – Position 4", available: true },
  { id: 22, title: "Spark of the Divine", master: "Sant Rajinder Singh Ji Maharaj", year: 2004, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Russian"], categories: ["Spirituality & Science", "Meditation", "Philosophy"], abstract: "Hidden within each person is a spark of the Divine waiting to be uncovered. Sant Rajinder Singh Ji charts the journey taken by those who have discovered this inner treasure through meditation, providing a clear and practical blueprint for seekers.", shelf: "Shelf D – Row 2 – Position 2", available: false },
  { id: 23, title: "Meditation as Medication for the Soul", master: "Sant Rajinder Singh Ji Maharaj", year: 2006, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", "Russian"], categories: ["Health & Vegetarianism", "Meditation", "Spirituality & Science"], abstract: "Bringing together insights from Western medical research and Eastern spiritual wisdom, this groundbreaking book demonstrates meditation's proven benefits for physical, mental, and spiritual health — from reducing stress and disease to expanding consciousness.", shelf: "Shelf D – Row 2 – Position 5", available: true },
  { id: 24, title: "Detox the Mind", master: "Sant Rajinder Singh Ji Maharaj", year: 2012, languages: ["English", "Hindi", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese", "Tamil", "Telugu", "Gujarati", "Marathi", "Bengali"], categories: ["Meditation", "Health & Vegetarianism", "Spirituality & Science"], abstract: "A step-by-step plan with practical exercises for achieving a joyful, tranquil life through mental detoxification and meditation. Sant Rajinder Singh Ji guides readers to remove mental and emotional blockages that block inner peace, love, and bliss.", shelf: "Shelf D – Row 3 – Position 1", available: true },
  { id: 25, title: "Visions of Spiritual Unity and Peace", master: "Sant Rajinder Singh Ji Maharaj", year: 1994, languages: ["English", "Hindi", "Spanish", "French", "German"], categories: ["Unity of Man", "Philosophy", "Spirituality & Science"], abstract: "Addresses the deep human hunger for spiritual unity and inner peace, exploring how meditation and love can bridge the divides of religion, nationality, and culture. A vision for a world transformed by the light of inner realization.", shelf: "Shelf D – Row 3 – Position 4", available: true },
];

export function getMasterColorClass(master: string): string {
  if (master.includes("Sawan Singh")) return "sawan";
  if (master.includes("Kirpal Singh")) return "kirpal";
  if (master.includes("Darshan Singh")) return "darshan";
  if (master.includes("Rajinder Singh")) return "rajinder";
  return "sawan";
}

export function getRelatedParts(book: Book): Book[] {
  if (!book.seriesId) return [];
  return books.filter(b => b.seriesId === book.seriesId && b.id !== book.id).sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0));
}
