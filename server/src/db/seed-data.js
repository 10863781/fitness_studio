// The studio data that used to be hardcoded in the React app (client/src/data/studio.js).
// It now lives here only so the seed script can copy it into the database.

export const memberships = [
  {
    id: "monthly",
    name: "Monthly",
    blurb: "Perfect for those who want to try out the studio or have a flexible schedule.",
    price: 50,
    period: "month",
  },
  {
    id: "quarterly",
    name: "Quarterly",
    blurb: "Great for those who want to commit to a longer period of time and save money.",
    price: 135,
    period: "quarter",
  },
  {
    id: "annual",
    name: "Annual",
    blurb: "Best for those who want to commit to a full year and get the best value.",
    price: 450,
    period: "year",
  },
]

export const classes = [
  {
    name: "Yoga",
    category: "Mind & Body",
    trainer: "John Mario",
    startTime: "19:00",
    durationMinutes: 60,
    maxSpots: 12,
    image: "/images/yoga.jpg",
    description:
      "Our yoga classes help you build flexibility, balance and calm. Move through flowing sequences and breathing work that leave you stronger and more relaxed.",
  },
  {
    name: "Pilates",
    category: "Mind & Body",
    trainer: "Mario Rossi",
    startTime: "15:00",
    durationMinutes: 45,
    maxSpots: 10,
    image: "/images/pilates.jpg",
    description:
      "Our Pilates classes are designed to improve your core strength, flexibility, and posture. Our certified instructors will guide you through a series of controlled movements that target your deep stabilizing muscles.",
  },
  {
    name: "Cardio Training",
    category: "Cardio",
    trainer: "Smith Stam",
    startTime: "17:00",
    durationMinutes: 45,
    maxSpots: 15,
    image: "/images/cardio.jpg",
    description:
      "Our cardio classes are designed to improve your heart health, increase your stamina, and help you burn calories. You'll be able to choose from a variety of activities including running, cycling, and rowing.",
  },
  {
    name: "Zumba",
    category: "Cardio",
    trainer: "Sara Johanson",
    startTime: "10:00",
    durationMinutes: 60,
    maxSpots: 20,
    image: "/images/zumba.jpg",
    description:
      "Our Zumba classes are a fun and energetic way to get your heart pumping and burn calories. You'll dance to the beat of Latin and international music while getting a full-body workout.",
  },
  {
    name: "Strength Training",
    category: "Strength",
    trainer: "John Mario",
    startTime: "18:00",
    durationMinutes: 60,
    maxSpots: 8,
    image: "/images/strength.jpg",
    description:
      "Our strength training classes are designed to help you build muscle, increase endurance, and improve overall fitness. Our certified trainers will guide you through a variety of exercises using free weights, resistance bands, and bodyweight movements.",
  },
]
