export function maskCep(value: string): string {
  if (!value) {
    return '';
  }

  value = value.replace(/[^0-9]/g, '');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');

  if (value.length > 9) {
    value = value.substring(0, 9);
  }

  return value;
}

export function phoneMask(value: string): string {
  if (!value) {
    return '';
  }

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');

  if (value.length <= 13) {
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  }

  if (value.length > 15) {
    value = value.substring(0, 15);
  }

  return value;
}

export function oneDigitMask(value: string): string {
  if (!value) {
    return '';
  }

  value = value.replace(/\D/g, '');

  if (value.length > 1) {
    value = value.substring(0, 1);
  }

  return value;
}
