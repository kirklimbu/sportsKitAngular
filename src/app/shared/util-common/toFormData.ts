export function toFormData<Blob>(formValue: any) {
  const formData = new FormData();
  formData.append('file', formValue);
  // for (const key of Object.keys(formValue)) {
  //     const value = formValue[key];
  //     formData.append(key, value);
  // }
  return formData;
}
