export function deleteNull(value: any) {
  Object.keys(value).forEach(el => {
    const element = value[el];

    if (element === null || element === undefined || element === 'null') {
      delete value[el];
    }
  });
}
