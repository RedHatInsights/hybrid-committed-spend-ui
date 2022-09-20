export function getToday(hrs: number = 0, min: number = 0, sec: number = 0) {
  const today = new Date();

  today.setHours(hrs);
  today.setMinutes(min);
  today.setSeconds(sec);

  return today;
}
