export function ObjectToFormData(objectForm: object): FormData {
  const resultForm = new FormData();
  const formKeys = Object.keys(objectForm);
  const formValues = Object.values(objectForm);

  for (let index = 0; index < formKeys.length; index++) {
    resultForm.append(formKeys[index], formValues[index]);
  }

  return resultForm;
}

export function JSToDBDateType(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year.toString()}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
