export function objectToFormData(objectForm: object): FormData {
  const resultForm = new FormData();
  const formKeys = Object.keys(objectForm);
  const formValues = Object.values(objectForm);

  for (let index = 0; index < formKeys.length; index++) {
    resultForm.append(formKeys[index], formValues[index]);
  }

  return resultForm;
}

export function dateToString(date: Date) {
  const originDate = new Date(date);
  const years = originDate.getFullYear();
  const months = (`0${originDate.getMonth() + 1}`).slice(-2);
  const days = (`0${originDate.getDate()}`).slice(-2);
  const hours = (`0${originDate.getHours()}`).slice(-2);
  const minutes = (`0${originDate.getMinutes()}`).slice(-2);
  const seconds = (`0${originDate.getSeconds()}`).slice(-2);
  return `${years}년 ${months}월 ${days}일 ${hours}:${minutes}:${seconds}`;
}
