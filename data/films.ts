export type CategoryKey =
  | 'bestMovie'
  | 'bestDirector'
  | 'bestActor'
  | 'bestScreenplay'
  | 'bestPhotography';

export const CATEGORY_POINTS: Record<CategoryKey, number> = {
  bestMovie: 5,
  bestDirector: 8,
  bestActor: 8,
  bestScreenplay: 10,
  bestPhotography: 12,
};

export const CATEGORY_FILTERS: { key: 'all' | CategoryKey; label: string }[] = [
  { key: 'all', label: 'All Categories' },
  { key: 'bestMovie', label: 'Best Movie' },
  { key: 'bestDirector', label: 'Best Director' },
  { key: 'bestActor', label: 'Best Actor' },
  { key: 'bestScreenplay', label: 'Best Screenplay' },
  { key: 'bestPhotography', label: 'Best Photography' },
];

export type Film = {
  id: string;
  title: string;
  director: string;
  genre: string;
  nominations: number;
  categories: CategoryKey[];
  points: number;
  poster: string;
  synopsis: string;
  streamingOn: string;
};

// Placeholder until TMDB poster URLs are filled in
const PLACEHOLDER_POSTER = 'https://www.figma.com/api/mcp/asset/12cc8765-1d63-4ef2-b75d-79074c293545';

export const FILMS: Film[] = [
  {
    id: 'sinners',
    title: 'Sinners',
    director: 'Ryan Coogler',
    genre: 'Horror / Drama',
    nominations: 16,
    categories: ['bestMovie', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'In 1930s Mississippi, twin brothers Smoke and Stack return home to escape their violent past, only to unleash something far more terrifying than anything they left behind.',
    streamingOn: 'HBO Max',
  },
  {
    id: 'one-battle-after-another',
    title: 'One Battle After Another',
    director: 'Paul Thomas Anderson',
    genre: 'Drama',
    nominations: 13,
    categories: ['bestMovie', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'A former revolutionary navigates love, ideology and survival in a sprawling portrait of 20th-century struggle, anchored by a career-defining performance from Leonardo DiCaprio.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'marty-supreme',
    title: 'Marty Supreme',
    director: 'Josh Safdie',
    genre: 'Drama / Sports',
    nominations: 8,
    categories: ['bestMovie', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'The frenetic true story of Marty Reisman, a legendary and controversial table tennis champion whose relentless drive for greatness consumed everything around him.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'hamnet',
    title: 'Hamnet',
    director: 'Chloé Zhao',
    genre: 'Drama / Historical',
    nominations: 8,
    categories: ['bestMovie', 'bestDirector', 'bestScreenplay'],
    points: 23,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'Set in Elizabethan England, the story of Agnes and her husband — a young William Shakespeare — as they grieve the devastating loss of their son Hamnet, and how that grief shapes one of literature\'s greatest works.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'sentimental-value',
    title: 'Sentimental Value',
    director: 'Joachim Trier',
    genre: 'Drama',
    nominations: 9,
    categories: ['bestMovie', 'bestDirector', 'bestScreenplay'],
    points: 23,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'A Norwegian family drama about an estranged father and famous film director who reconnects with his daughters during the making of his final film — a story that blurs the line between art and real life.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    director: 'Guillermo del Toro',
    genre: 'Horror / Drama',
    nominations: 7,
    categories: ['bestMovie', 'bestScreenplay', 'bestPhotography'],
    points: 27,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      "Guillermo del Toro's deeply personal reimagining of Mary Shelley's gothic masterpiece, exploring creation, abandonment and what it means to be human through the eyes of the monster himself.",
    streamingOn: 'Netflix',
  },
  {
    id: 'bugonia',
    title: 'Bugonia',
    director: 'Yorgos Lanthimos',
    genre: 'Dark Comedy / Sci-Fi',
    nominations: 5,
    categories: ['bestMovie', 'bestScreenplay'],
    points: 15,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'Two corporate employees become convinced their company\'s CEO is a dangerous alien and plot to stop her — a darkly absurd Lanthimos comedy starring Emma Stone.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'the-secret-agent',
    title: 'The Secret Agent',
    director: 'Kleber Mendonça Filho',
    genre: 'Thriller',
    nominations: 5,
    categories: ['bestMovie', 'bestActor'],
    points: 13,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'A Brazilian man living in exile returns to his homeland after years abroad and finds himself entangled in a web of political secrets, surveillance and unresolved personal history.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'f1',
    title: 'F1',
    director: 'Joseph Kosinski',
    genre: 'Action / Sports',
    nominations: 4,
    categories: ['bestMovie'],
    points: 5,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'A legendary Formula 1 driver comes out of retirement to mentor a young rookie, racing together on the same team in a high-stakes season that tests both their limits.',
    streamingOn: 'Apple TV+',
  },
  {
    id: 'train-dreams',
    title: 'Train Dreams',
    director: 'Clint Eastwood',
    genre: 'Drama / Western',
    nominations: 3,
    categories: ['bestMovie', 'bestScreenplay', 'bestPhotography'],
    points: 27,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      "Based on Denis Johnson's novella, the quiet and devastating life of a day laborer in early 20th-century America — a man who builds railroads, loses everything, and keeps going anyway.",
    streamingOn: 'Netflix',
  },
  {
    id: 'blue-moon',
    title: 'Blue Moon',
    director: 'Richard Linklater',
    genre: 'Drama / Music',
    nominations: 2,
    categories: ['bestActor', 'bestScreenplay'],
    points: 18,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'The true story of Lorenz Hart, one of Broadway\'s most gifted lyricists, told through one fateful night in 1943 where he grappled with his greatest fears — irrelevance, loneliness and being left behind.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'it-was-just-an-accident',
    title: 'It Was Just an Accident',
    director: 'Jafar Panahi',
    genre: 'Drama / Thriller',
    nominations: 2,
    categories: ['bestScreenplay'],
    points: 10,
    poster: PLACEHOLDER_POSTER,
    synopsis:
      'A chance road accident brings together strangers who each believe they recognize the driver as the person who once informed on them to the authorities — a tense and darkly comic thriller from Iranian master Jafar Panahi.',
    streamingOn: 'In Theaters',
  },
];
