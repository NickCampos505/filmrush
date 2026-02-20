import { ImageSourcePropType } from 'react-native';

export type CategoryKey =
  | 'bestPicture'
  | 'bestDirector'
  | 'bestActor'
  | 'bestActress'
  | 'bestScreenplay'
  | 'bestPhotography'
  | 'bestAnimatedFeature'
  | 'bestDocumentaryFeature'
  | 'bestInternationalFeature'
  | 'bestOriginalSong'
  | 'bestVisualEffects'
  | 'bestSound';

export const CATEGORY_POINTS: Record<CategoryKey, number> = {
  bestPicture: 5,
  bestDirector: 8,
  bestActor: 8,
  bestActress: 8,
  bestScreenplay: 10,
  bestPhotography: 12,
  bestAnimatedFeature: 8,
  bestDocumentaryFeature: 8,
  bestInternationalFeature: 8,
  bestOriginalSong: 6,
  bestVisualEffects: 10,
  bestSound: 6,
};

export const CATEGORY_FILTERS: { key: 'all' | CategoryKey; label: string }[] = [
  { key: 'all', label: 'All Categories' },
  { key: 'bestPicture', label: 'Best Picture' },
  { key: 'bestDirector', label: 'Best Director' },
  { key: 'bestActor', label: 'Best Actor' },
  { key: 'bestActress', label: 'Best Actress' },
  { key: 'bestScreenplay', label: 'Best Screenplay' },
  { key: 'bestPhotography', label: 'Best Photography' },
  { key: 'bestAnimatedFeature', label: 'Best Animated Feature' },
  { key: 'bestDocumentaryFeature', label: 'Best Documentary Feature' },
  { key: 'bestInternationalFeature', label: 'Best International Feature' },
  { key: 'bestOriginalSong', label: 'Best Original Song' },
  { key: 'bestVisualEffects', label: 'Best Visual Effects' },
  { key: 'bestSound', label: 'Best Sound' },
];
export type Film = {
  id: string;
  title: string;
  director: string;
  genre: string;
  nominations: number;
  categories: CategoryKey[];
  points: number;
  poster: ImageSourcePropType;
  synopsis: string;
  streamingOn: string;
};

export const FILMS: Film[] = [
  {
    id: 'sinners',
    title: 'Sinners',
    director: 'Ryan Coogler',
    genre: 'Horror / Drama',
    nominations: 16,
    categories: ['bestPicture', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: require('@/assets/images/sinners.png.jpg'),
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
    categories: ['bestPicture', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: require('@/assets/images/one-battle-after-another.jpg'),
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
    categories: ['bestPicture', 'bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography'],
    points: 43,
    poster: require('@/assets/images/marty-supreme.jpg'),
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
    categories: ['bestPicture', 'bestDirector', 'bestScreenplay'],
    points: 23,
    poster: require('@/assets/images/hamnet.jpg'),
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
    categories: ['bestPicture', 'bestDirector', 'bestScreenplay'],
    points: 23,
    poster: require('@/assets/images/sentimental-value.jpg'),
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
    categories: ['bestPicture', 'bestScreenplay', 'bestPhotography'],
    points: 27,
    poster: require('@/assets/images/frankenstein.jpg'),
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
    categories: ['bestPicture', 'bestScreenplay'],
    points: 15,
    poster: require('@/assets/images/bugonia.jpg'),
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
    categories: ['bestPicture', 'bestActor'],
    points: 13,
    poster: require('@/assets/images/the-secret-agent.jpg'),
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
    categories: ['bestPicture'],
    points: 5,
    poster: require('@/assets/images/f1.jpg'),
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
    categories: ['bestPicture', 'bestScreenplay', 'bestPhotography'],
    points: 27,
    poster: require('@/assets/images/train-dreams.jpg'),
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
    poster: require('@/assets/images/blue-moon.jpg'),
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
    poster: require('@/assets/images/it-was-just-an-accident.jpg'),
    synopsis:
      'A chance road accident brings together strangers who each believe they recognize the driver as the person who once informed on them to the authorities — a tense and darkly comic thriller from Iranian master Jafar Panahi.',
    streamingOn: 'In Theaters',
  },
  {
    id: 'arco',
    title: 'Arco',
    director: 'Ugo Bienvenu',
    genre: 'Animated / Sci-Fi / Adventure',
    nominations: 0,
    categories: ['bestAnimatedFeature', 'bestInternationalFeature'],
    points: 16,
    poster: require('@/assets/images/posters/arco.jpg'),
    synopsis:
      'In 2075, a boy from the future accidentally travels to 1975 and must find his way back while two children help him evade a powerful corporation that wants to exploit his technology.',
    streamingOn: 'In Theaters (US)',
  },
  {
    id: 'avatar-fire-and-ash',
    title: 'Avatar: Fire and Ash',
    director: 'James Cameron',
    genre: 'Epic Sci-Fi / Action / Adventure',
    nominations: 0,
    categories: ['bestPicture', 'bestDirector', 'bestPhotography', 'bestVisualEffects', 'bestSound'],
    points: 41,
    poster: require('@/assets/images/posters/avatar-fire-and-ash.jpg'),
    synopsis:
      'Jake Sully, Neytiri and their family face a new Na’vi clan and escalating conflict on Pandora as old and new enemies force them into another war for survival.',
    streamingOn: 'In Theaters (US) / Disney+ (TBA)',
  },
  {
    id: 'come-see-me-in-the-good-light',
    title: 'Come See Me in the Good Light',
    director: 'Ryan White',
    genre: 'Documentary',
    nominations: 0,
    categories: ['bestDocumentaryFeature'],
    points: 8,
    poster: require('@/assets/images/posters/come-see-me-in-the-good-light.jpg'),
    synopsis:
      'A moving documentary following poets Andrea Gibson and Megan Falley as they navigate love, creativity and terminal illness with humor and emotional honesty.',
    streamingOn: 'Apple TV+ (US)',
  },
  {
    id: 'cutting-through-rocks',
    title: 'Cutting Through Rocks',
    director: 'Sara Khaki / Mohammadreza Eyni',
    genre: 'Documentary',
    nominations: 0,
    categories: ['bestDocumentaryFeature', 'bestInternationalFeature', 'bestPhotography'],
    points: 28,
    poster: require('@/assets/images/posters/cutting-through-rocks.jpg'),
    synopsis:
      'Set in rural Iran, the film follows Sara Shahverdi, a trailblazing elected councilwoman, as she confronts corruption and patriarchal resistance in her community.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'diane-warren-relentless',
    title: 'Diane Warren: Relentless',
    director: 'Bess Kargman',
    genre: 'Documentary / Music',
    nominations: 0,
    categories: ['bestDocumentaryFeature', 'bestOriginalSong'],
    points: 14,
    poster: require('@/assets/images/posters/diane-warren-relentless.jpg'),
    synopsis:
      'An intimate portrait of legendary songwriter Diane Warren, tracing her creative process, career-defining songs and relentless pursuit of artistic excellence.',
    streamingOn: 'Rent/Buy (US)',
  },
  {
    id: 'elio',
    title: 'Elio',
    director: 'Adrian Molina / Domee Shi / Madeline Sharafian',
    genre: 'Animated / Sci-Fi / Family',
    nominations: 0,
    categories: ['bestAnimatedFeature', 'bestSound'],
    points: 14,
    poster: require('@/assets/images/posters/elio.jpg'),
    synopsis:
      'An imaginative boy is beamed into space and mistaken for Earth’s leader, forcing him to navigate an intergalactic council and discover what makes him truly belong.',
    streamingOn: 'In Theaters (US) / Disney+ (TBA)',
  },
  {
    id: 'if-i-had-legs-id-kick-you',
    title: "If I Had Legs I'd Kick You",
    director: 'Mary Bronstein',
    genre: 'Drama / Dark Comedy',
    nominations: 0,
    categories: ['bestPicture', 'bestDirector', 'bestActress', 'bestScreenplay'],
    points: 31,
    poster: require('@/assets/images/posters/if-i-had-legs-id-kick-you.jpg'),
    synopsis:
      'As her child’s chronic illness worsens and her personal life fractures, a mother spirals through anxiety, guilt and absurdity while trying to keep everything together.',
    streamingOn: 'In Theaters (US)',
  },
  {
    id: 'jurassic-world-rebirth',
    title: 'Jurassic World Rebirth',
    director: 'Gareth Edwards',
    genre: 'Action / Adventure / Sci-Fi',
    nominations: 0,
    categories: ['bestVisualEffects', 'bestSound'],
    points: 16,
    poster: require('@/assets/images/posters/jurassic-world-rebirth.jpg'),
    synopsis:
      'A new team ventures into isolated dinosaur territory to recover genetic material tied to a life-saving medical breakthrough, triggering a fresh survival nightmare.',
    streamingOn: 'In Theaters (US)',
  },
  {
    id: 'kokuho',
    title: 'Kokuho',
    director: 'Lee Sang-il',
    genre: 'Drama',
    nominations: 0,
    categories: ['bestDirector', 'bestActor', 'bestScreenplay', 'bestPhotography', 'bestInternationalFeature'],
    points: 46,
    poster: require('@/assets/images/posters/kokuho.jpg'),
    synopsis:
      'A sweeping Japanese drama about art, legacy and identity, following an adopted heir in the world of traditional performance as personal ambition collides with heritage.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'kpop-demon-hunters',
    title: 'KPop Demon Hunters',
    director: 'Maggie Kang / Chris Appelhans',
    genre: 'Animated / Action / Fantasy / Musical',
    nominations: 0,
    categories: ['bestAnimatedFeature', 'bestOriginalSong', 'bestSound'],
    points: 20,
    poster: require('@/assets/images/posters/kpop-demon-hunters.jpg'),
    synopsis:
      'By day they are global K-pop superstars; by night they secretly hunt demons threatening the balance between worlds in this music-driven animated fantasy adventure.',
    streamingOn: 'Netflix (US)',
  },
  {
    id: 'little-amelie-or-the-character-of-rain',
    title: 'Little Amélie or the Character of Rain',
    director: 'Liane-Cho Han / Maïlys Vallade',
    genre: 'Animated / Drama',
    nominations: 0,
    categories: ['bestAnimatedFeature', 'bestInternationalFeature'],
    points: 16,
    poster: require('@/assets/images/posters/little-amelie-or-the-character-of-rain.jpg'),
    synopsis:
      'Adapted from Amélie Nothomb’s autobiographical novel, the film follows a child’s poetic, intense view of the world while growing up between cultures.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'mr-nobody-against-putin',
    title: 'Mr. Nobody Against Putin',
    director: 'David Borenstein / Pavel Talankin',
    genre: 'Documentary',
    nominations: 0,
    categories: ['bestDocumentaryFeature', 'bestInternationalFeature'],
    points: 16,
    poster: require('@/assets/images/posters/mr-nobody-against-putin.jpg'),
    synopsis:
      'A Russian school videographer quietly documents how wartime propaganda permeates classrooms, risking personal safety to expose state-driven indoctrination.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'sirat',
    title: 'Sirāt',
    director: 'Óliver Laxe',
    genre: 'Drama / Road Movie',
    nominations: 0,
    categories: ['bestDirector', 'bestScreenplay', 'bestPhotography', 'bestInternationalFeature'],
    points: 38,
    poster: require('@/assets/images/posters/sirat.jpg'),
    synopsis:
      'A father and son cross the deserts of Morocco searching for a missing loved one, confronting grief, spirituality and violence on a haunted journey.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'song-sung-blue',
    title: 'Song Sung Blue',
    director: 'Craig Brewer',
    genre: 'Drama / Music',
    nominations: 0,
    categories: ['bestPicture', 'bestActor', 'bestActress', 'bestOriginalSong'],
    points: 27,
    poster: require('@/assets/images/posters/song-sung-blue.jpg'),
    synopsis:
      'Based on a true story, two Milwaukee performers form a Neil Diamond tribute act that transforms their lives, marriage and dreams of stardom.',
    streamingOn: 'Peacock (US)',
  },
  {
    id: 'the-alabama-solution',
    title: 'The Alabama Solution',
    director: 'Andrew Jarecki / Charlotte Kaufman',
    genre: 'Documentary',
    nominations: 0,
    categories: ['bestDocumentaryFeature'],
    points: 8,
    poster: require('@/assets/images/posters/the-alabama-solution.jpg'),
    synopsis:
      'This documentary investigates Alabama’s prison system, exposing severe overcrowding, violence and political failures through testimony and on-the-ground reporting.',
    streamingOn: 'Max (US)',
  },
  {
    id: 'the-lost-bus',
    title: 'The Lost Bus',
    director: 'Paul Greengrass',
    genre: 'Drama / Thriller',
    nominations: 0,
    categories: ['bestPicture', 'bestActor', 'bestScreenplay', 'bestSound'],
    points: 29,
    poster: require('@/assets/images/posters/the-lost-bus.jpg'),
    synopsis:
      'Inspired by real events from the Camp Fire, a bus driver and a teacher fight through chaos to rescue children trapped by a fast-moving wildfire.',
    streamingOn: 'Apple TV+ (US)',
  },
  {
    id: 'the-perfect-neighbor',
    title: 'The Perfect Neighbor',
    director: 'Geeta Gandbhir',
    genre: 'Documentary',
    nominations: 0,
    categories: ['bestDocumentaryFeature'],
    points: 8,
    poster: require('@/assets/images/posters/the-perfect-neighbor.jpg'),
    synopsis:
      'A vérité documentary examining neighborhood tensions, race and justice in America through a case that spirals from conflict into tragedy.',
    streamingOn: 'Netflix (US)',
  },
  {
    id: 'the-smashing-machine',
    title: 'The Smashing Machine',
    director: 'Benny Safdie',
    genre: 'Biographical Drama / Sports',
    nominations: 0,
    categories: ['bestPicture', 'bestDirector', 'bestActor', 'bestScreenplay'],
    points: 31,
    poster: require('@/assets/images/posters/the-smashing-machine.jpg'),
    synopsis:
      'A biographical drama about MMA legend Mark Kerr, charting the brutality of elite fighting and the personal cost of fame, pain and addiction.',
    streamingOn: 'In Theaters (US)',
  },
  {
    id: 'the-ugly-stepsister',
    title: 'The Ugly Stepsister',
    director: 'Emilie Blichfeldt',
    genre: 'Body Horror / Dark Comedy',
    nominations: 0,
    categories: ['bestInternationalFeature', 'bestActress', 'bestScreenplay'],
    points: 26,
    poster: require('@/assets/images/posters/the-ugly-stepsister.jpg'),
    synopsis:
      'A grotesque feminist reimagining of Cinderella, told from the stepsister’s perspective as beauty standards, jealousy and social pressure turn monstrous.',
    streamingOn: 'Shudder (US)',
  },
  {
    id: 'the-voice-of-hind-rajab',
    title: 'The Voice of Hind Rajab',
    director: 'Kaouther Ben Hania',
    genre: 'Drama',
    nominations: 0,
    categories: ['bestInternationalFeature', 'bestActress', 'bestScreenplay'],
    points: 26,
    poster: require('@/assets/images/posters/the-voice-of-hind-rajab.jpg'),
    synopsis:
      'Based on true events tied to Hind Rajab’s emergency calls from Gaza, the film dramatizes a family trapped in war and a child’s voice that resonated worldwide.',
    streamingOn: 'In Theaters (US Limited)',
  },
  {
    id: 'viva-verdi',
    title: 'Viva Verdi!',
    director: 'Yannick Kergoat',
    genre: 'Documentary / Music',
    nominations: 0,
    categories: ['bestDocumentaryFeature', 'bestOriginalSong'],
    points: 14,
    poster: require('@/assets/images/posters/viva-verdi.jpg'),
    synopsis:
      'Inside Milan’s Casa Verdi, retired musicians and opera artists reflect on aging, art and community in a joyful documentary about music as a way of life.',
    streamingOn: 'US Festival / Theatrical Screenings',
  },
  {
    id: 'weapons',
    title: 'Weapons',
    director: 'Zach Cregger',
    genre: 'Horror / Mystery / Thriller',
    nominations: 0,
    categories: ['bestPicture', 'bestDirector', 'bestScreenplay', 'bestPhotography', 'bestSound'],
    points: 41,
    poster: require('@/assets/images/posters/weapons.jpg'),
    synopsis:
      'When children from the same class vanish overnight, a community unravels amid intersecting stories, hidden violence and a growing supernatural dread.',
    streamingOn: 'In Theaters (US)',
  },
  {
    id: 'zootopia-2',
    title: 'Zootopia 2',
    director: 'Jared Bush / Byron Howard',
    genre: 'Animated / Comedy / Adventure',
    nominations: 0,
    categories: ['bestAnimatedFeature', 'bestOriginalSong', 'bestSound'],
    points: 20,
    poster: require('@/assets/images/posters/zootopia-2.jpg'),
    synopsis:
      'Judy Hopps and Nick Wilde return for a new case that expands the city’s social tensions and mysteries while testing their partnership in fresh ways.',
    streamingOn: 'In Theaters (US) / Disney+ (TBA)',
  },
];
