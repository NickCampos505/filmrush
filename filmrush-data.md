# Filmrush — Oscar 2026 Data & Scoring System
## 98th Academy Awards (March 15, 2026)

---

## SCORING LOGIC

When a user marks a film as watched, they automatically earn points for **every app category that film appears in**.

### Category Points
| Category | Points |
|---|---|
| Best Picture | 5 pts |
| Best Director | 8 pts |
| Best Actor | 8 pts |
| Best Screenplay | 10 pts |
| Best Photography | 12 pts |

**Points per film = sum of all categories it appears in.**

---

## NOMINEES BY CATEGORY

### Best Picture (5 pts)
- Sinners
- One Battle After Another
- Marty Supreme
- Hamnet
- Sentimental Value
- Frankenstein
- Bugonia
- The Secret Agent
- F1
- Train Dreams

### Best Director (8 pts)
- Ryan Coogler — Sinners
- Paul Thomas Anderson — One Battle After Another
- Josh Safdie — Marty Supreme
- Chloé Zhao — Hamnet
- Joachim Trier — Sentimental Value

### Best Actor (8 pts)
- Michael B. Jordan — Sinners
- Leonardo DiCaprio — One Battle After Another
- Timothée Chalamet — Marty Supreme
- Wagner Moura — The Secret Agent
- Ethan Hawke — Blue Moon

### Best Screenplay (10 pts)
**Original:**
- Sinners — Ryan Coogler
- Marty Supreme — Ronald Bronstein & Josh Safdie
- Sentimental Value — Joachim Trier & Eskil Vogt
- Blue Moon — Robert Kaplow
- It Was Just an Accident — Jafar Panahi et al.

**Adapted:**
- One Battle After Another — Paul Thomas Anderson
- Hamnet — Maggie O'Farrell & Chloé Zhao
- Bugonia — Will Tracy
- Frankenstein — Guillermo del Toro
- Train Dreams — Clint Bentley & Greg Kwedar

### Best Photography / Cinematography (12 pts)
- Sinners — Autumn Durald Arkapaw
- Marty Supreme — Darius Khondji
- One Battle After Another — Michael Bauman
- Frankenstein — Dan Laustsen
- Train Dreams — Adolpho Veloso

---

## FILMS DATA

```js
const films = [
  {
    id: "sinners",
    title: "Sinners",
    director: "Ryan Coogler",
    genre: "Horror / Drama",
    nominations: 16,
    categories: ["bestPicture", "bestDirector", "bestActor", "bestScreenplay", "bestPhotography"],
    points: 43, // 5+8+8+10+12
    poster: "", // fill from TMDB
    synopsis: "In 1930s Mississippi, twin brothers Smoke and Stack return home to escape their violent past, only to unleash something far more terrifying than anything they left behind.",
    streamingOn: "HBO Max",
    watched: false,
  },
  {
    id: "one-battle-after-another",
    title: "One Battle After Another",
    director: "Paul Thomas Anderson",
    genre: "Drama",
    nominations: 13,
    categories: ["bestPicture", "bestDirector", "bestActor", "bestScreenplay", "bestPhotography"],
    points: 43, // 5+8+8+10+12
    poster: "",
    synopsis: "A former revolutionary navigates love, ideology and survival in a sprawling portrait of 20th-century struggle, anchored by a career-defining performance from Leonardo DiCaprio.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "marty-supreme",
    title: "Marty Supreme",
    director: "Josh Safdie",
    genre: "Drama / Sports",
    nominations: 8,
    categories: ["bestPicture", "bestDirector", "bestActor", "bestScreenplay", "bestPhotography"],
    points: 43, // 5+8+8+10+12
    poster: "",
    synopsis: "The frenetic true story of Marty Reisman, a legendary and controversial table tennis champion whose relentless drive for greatness consumed everything around him.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "hamnet",
    title: "Hamnet",
    director: "Chloé Zhao",
    genre: "Drama / Historical",
    nominations: 8,
    categories: ["bestPicture", "bestDirector", "bestScreenplay"],
    points: 23, // 5+8+10
    poster: "",
    synopsis: "Set in Elizabethan England, the story of Agnes and her husband — a young William Shakespeare — as they grieve the devastating loss of their son Hamnet, and how that grief shapes one of literature's greatest works.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "sentimental-value",
    title: "Sentimental Value",
    director: "Joachim Trier",
    genre: "Drama",
    nominations: 9,
    categories: ["bestPicture", "bestDirector", "bestScreenplay"],
    points: 23, // 5+8+10
    poster: "",
    synopsis: "A Norwegian family drama about an estranged father and famous film director who reconnects with his daughters during the making of his final film — a story that blurs the line between art and real life.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    director: "Guillermo del Toro",
    genre: "Horror / Drama",
    nominations: 7,
    categories: ["bestPicture", "bestScreenplay", "bestPhotography"],
    points: 27, // 5+10+12
    poster: "",
    synopsis: "Guillermo del Toro's deeply personal reimagining of Mary Shelley's gothic masterpiece, exploring creation, abandonment and what it means to be human through the eyes of the monster himself.",
    streamingOn: "Netflix",
    watched: false,
  },
  {
    id: "bugonia",
    title: "Bugonia",
    director: "Yorgos Lanthimos",
    genre: "Dark Comedy / Sci-Fi",
    nominations: 5,
    categories: ["bestPicture", "bestScreenplay"],
    points: 15, // 5+10
    poster: "",
    synopsis: "Two corporate employees become convinced their company's CEO is a dangerous alien and plot to stop her — a darkly absurd Lanthimos comedy starring Emma Stone.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "the-secret-agent",
    title: "The Secret Agent",
    director: "Kleber Mendonça Filho",
    genre: "Thriller",
    nominations: 5,
    categories: ["bestPicture", "bestActor"],
    points: 13, // 5+8
    poster: "",
    synopsis: "A Brazilian man living in exile returns to his homeland after years abroad and finds himself entangled in a web of political secrets, surveillance and unresolved personal history.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "f1",
    title: "F1",
    director: "Joseph Kosinski",
    genre: "Action / Sports",
    nominations: 4,
    categories: ["bestPicture"],
    points: 5,
    poster: "",
    synopsis: "A legendary Formula 1 driver comes out of retirement to mentor a young rookie, racing together on the same team in a high-stakes season that tests both their limits.",
    streamingOn: "Apple TV+",
    watched: false,
  },
  {
    id: "train-dreams",
    title: "Train Dreams",
    director: "Clint Eastwood",
    genre: "Drama / Western",
    nominations: 3,
    categories: ["bestPicture", "bestScreenplay", "bestPhotography"],
    points: 27, // 5+10+12
    poster: "",
    synopsis: "Based on Denis Johnson's novella, the quiet and devastating life of a day laborer in early 20th-century America — a man who builds railroads, loses everything, and keeps going anyway.",
    streamingOn: "Netflix",
    watched: false,
  },
  {
    id: "blue-moon",
    title: "Blue Moon",
    director: "Richard Linklater",
    genre: "Drama / Music",
    nominations: 2,
    categories: ["bestActor", "bestScreenplay"],
    points: 18, // 8+10
    poster: "",
    synopsis: "The true story of Lorenz Hart, one of Broadway's most gifted lyricists, told through one fateful night in 1943 where he grappled with his greatest fears — irrelevance, loneliness and being left behind.",
    streamingOn: "In Theaters",
    watched: false,
  },
  {
    id: "it-was-just-an-accident",
    title: "It Was Just an Accident",
    director: "Jafar Panahi",
    genre: "Drama / Thriller",
    nominations: 2,
    categories: ["bestScreenplay"],
    points: 10,
    poster: "",
    synopsis: "A chance road accident brings together strangers who each believe they recognize the driver as the person who once informed on them to the authorities — a tense and darkly comic thriller from Iranian master Jafar Panahi.",
    streamingOn: "In Theaters",
    watched: false,
  },
]
```

---

## CATEGORY FILTER MAP

```js
const categoryFilters = {
  all: "All Categories",
  bestPicture: "Best Picture",
  bestDirector: "Best Director",
  bestActor: "Best Actor",
  bestScreenplay: "Best Screenplay",
  bestPhotography: "Best Photography",
}
```

---

## IMPLEMENTATION NOTES
- `watched: false` is the default local state
- When user taps "Mark as Watched": set `watched: true` and add `film.points` to user total
- Filter films by category: `film.categories.includes(selectedCategory)`
- "All Categories" shows all films
- Poster URLs to be filled from TMDB API (themoviedb.org)
- Best Screenplay covers both Original and Adapted — user earns 10pts if the film appears in either
- streamingOn shows the subscription platform (HBO Max, Netflix, Apple TV+) or "In Theaters" if not yet streaming
