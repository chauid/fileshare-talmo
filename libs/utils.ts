export function dateToString(date: Date) {
  const originDate = new Date(date);
  const years = originDate.getFullYear();
  const months = `0${originDate.getMonth() + 1}`.slice(-2);
  const days = `0${originDate.getDate()}`.slice(-2);
  const hours = `0${originDate.getHours()}`.slice(-2);
  const minutes = `0${originDate.getMinutes()}`.slice(-2);
  const seconds = `0${originDate.getSeconds()}`.slice(-2);
  return `${years}년 ${months}월 ${days}일 ${hours}:${minutes}:${seconds}`;
}

export function localeDateToKR(date: Date) {
  date.setTime(date.getTime() + (9 * 60 * 60 * 1000));
  return date;
}
