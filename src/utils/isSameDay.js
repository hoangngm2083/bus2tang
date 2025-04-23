function isSameDay(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default isSameDay;
