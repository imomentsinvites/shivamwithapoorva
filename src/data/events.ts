export type ScheduleItem = {
  label: string;
  time: string;
  meal?: boolean;
};

export type WeddingEvent = {
  id: "mehendi" | "haldi" | "sangeet" | "bhaat" | "baraat";
  dateLabel: string;
  title: string;
  schedule: ScheduleItem[];
  location: string;
  mapUrl: string;
  eyebrow: string;
  particle: "leaf" | "marigold" | "rose";
};

const mapSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const SATSANG_BHAWAN = "Satsang Bhawan, Pundrik Vihar, Pitampura, New Delhi - 110034";
const CITY_PARK = "Hotel City Park, Pitampura, New Delhi";

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    dateLabel: "22 November 2026",
    title: "Path & Mehendi",
    schedule: [
      { label: "Sunderkand Path", time: "11:00 AM" },
      { label: "Lunch", time: "1:00 PM", meal: true },
      { label: "Mehendi", time: "4:00 PM" },
      { label: "Dinner", time: "8:00 PM", meal: true },
    ],
    location: "Satsang Bhawan, Pundrik Vihar, Pitampura, N. Delhi - 34",
    mapUrl: mapSearch(SATSANG_BHAWAN),
    eyebrow: "Devotion, colour & a lot of love",
    particle: "rose",
  },
  {
    id: "haldi",
    dateLabel: "23 November 2026",
    title: "Haldi",
    schedule: [
      { label: "Haldi", time: "12:00 PM" },
      { label: "Lunch", time: "1:00 PM", meal: true },
    ],
    location: "3rd Floor, Hotel City Park, Pitampura",
    mapUrl: mapSearch(CITY_PARK),
    eyebrow: "Sunshine, smiles & blessings",
    particle: "marigold",
  },
  {
    id: "sangeet",
    dateLabel: "23 November 2026",
    title: "Tilak & Sangeet",
    schedule: [
      { label: "Tilak", time: "7:00 PM" },
      { label: "Sangeet", time: "8:00 PM" },
    ],
    location: "Rajmahal Hall, Hotel City Park, Pitampura",
    mapUrl: mapSearch(`Rajmahal Hall, ${CITY_PARK}`),
    eyebrow: "An evening of music & celebration",
    particle: "rose",
  },
  {
    id: "bhaat",
    dateLabel: "24 November 2026",
    title: "Bhaat & Gurchadi",
    schedule: [
      { label: "Bhaat", time: "11:00 AM" },
      { label: "Lunch", time: "1:00 PM", meal: true },
      { label: "Gurchadi", time: "6:00 PM" },
    ],
    location: "3rd Floor, Hotel City Park, Pitampura",
    mapUrl: mapSearch(CITY_PARK),
    eyebrow: "Family, blessings & traditions",
    particle: "rose",
  },
  {
    id: "baraat",
    dateLabel: "24 November 2026",
    title: "Reception",
    schedule: [{ label: "Reception", time: "7:00 PM" }],
    location: "Kawatra Tents, behind Keshav Mahavidyalaya, Parwana Road, Pitampura, New Delhi",
    mapUrl: mapSearch("Kawatra Tents, Parwana Road, Pitampura, New Delhi"),
    eyebrow: "The grand celebration",
    particle: "rose",
  },
];

export const rsvpContacts = [
  { name: "Gokal Chand Moda", phone: "9310055332" },
  { name: "Mukesh Kumar Moda", phone: "9811189968" },
  { name: "Shrey Moda", phone: "8076308961" },
];
