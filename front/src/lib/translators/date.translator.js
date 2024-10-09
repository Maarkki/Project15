export default function dateTranslator(date) {
  if (date == null) return "Не указано";
  const nDate = new Date(date);
  return `${new Intl.DateTimeFormat("ru-Ru").format(nDate)}`;
}

export function dateRangeTranslator(firstDate, secondDate) {
  if (firstDate === secondDate || (firstDate !== null && secondDate === null))
    return dateTranslator(firstDate);
  return `${dateTranslator(firstDate)} - ${dateTranslator(secondDate)}`;
}
