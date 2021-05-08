const timeZone = [
  "Africa/Abidjan",
  "Africa/Accra",
  "Africa/Addis_Ababa",
  "America/Adak",
  "America/Anguilla",
  "America/Atka",
  "America/Indiana/Knox",
  "Chile/Continental",
  "Brazil/East",
  "Europe/Bucharest",
  "Europe/Oslo",
  "Indian/Kerguelen",
  "Pacific/Chatham",
  "US/Hawaii"
]

const randomTimezone = () => {
  const randomNum = Math.floor(Math.random() * timeZone.length);
  return timeZone[randomNum];
}

export { randomTimezone };