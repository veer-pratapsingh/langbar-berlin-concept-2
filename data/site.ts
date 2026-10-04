export interface DJEvent {
  date: string;
  dayName: string;
  fullDate: string;
  artist: string;
  genre: string;
  timeSlot: string;
}

export const SITE_CONFIG = {
  name: "Lang Bar Berlin",
  logo: "/images/langbar-logo.png",
  location: "Waldorf Astoria Berlin, 1st Floor",
  address: "Hardenbergstraße 28, 10623 Berlin, Germany",
  googleMapsUrl: "https://maps.google.com/?q=Waldorf+Astoria+Berlin+Hardenbergstra%C3%9Fe+28+10623+Berlin",
  instagramUrl: "https://www.instagram.com/langbar_berlin/",
  instagramHandle: "@langbar_berlin",
  openingHoursNotice: "Hours subject to venue confirmation — please enquire directly with the team", // PLACEHOLDER
  hoursPlaceholder: "Tuesday – Saturday: From 18:00 (To be confirmed with the venue)", // PLACEHOLDER
  dressCode: "Smart Casual / Evening Elegant — Athletic wear and caps politely declined", // PLACEHOLDER
  phonePlaceholder: "+49 (0)30 814000 0", // Waldorf Astoria main line // PLACEHOLDER
  emailPlaceholder: "berlin.langbar@waldorfastoria.com", // PLACEHOLDER
  nightClockMilestones: [
    { time: "19:00", label: "Arrival", sectionId: "hero" },
    { time: "20:00", label: "The Room", sectionId: "story" },
    { time: "21:00", label: "The Pour", sectionId: "cocktails" },
    { time: "22:00", label: "The Atmosphere", sectionId: "gallery" },
    { time: "23:00", label: "The Night Turns", sectionId: "dj-nights" },
    { time: "00:00", label: "Your Night", sectionId: "private-events" },
    { time: "01:00", label: "Last Call", sectionId: "visit" },
  ],
};

/**
 * Computes the next 6 upcoming Fridays and Saturdays from a given reference date.
 * Explicitly marks each performer as "DJ to be announced" without inventing names.
 */
export function getUpcomingDJNights(count = 6, fromDate = new Date()): DJEvent[] {
  const events: DJEvent[] = [];
  const current = new Date(fromDate);
  // Reset time to start of day
  current.setHours(0, 0, 0, 0);

  let iterations = 0;
  while (events.length < count && iterations < 45) {
    iterations++;
    const day = current.getDay();
    if (day === 5 || day === 6) {
      // 5 = Friday, 6 = Saturday
      const dayName = day === 5 ? "Friday" : "Saturday";
      const formattedDate = current.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      const fullDate = current.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      events.push({
        date: formattedDate,
        dayName,
        fullDate,
        artist: "DJ to be announced", // Verified: No invented names per brief
        genre: day === 5 ? "Deep House · Nu-Disco" : "Afro House · Lounge Grooves", // PLACEHOLDER
        timeSlot: "From 21:30 until Late", // PLACEHOLDER
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return events;
}
