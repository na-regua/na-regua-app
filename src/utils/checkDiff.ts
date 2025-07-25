import {deleteNull} from './deleteNull';

export function checkDiff(arr: any, oldArr: any): boolean {
  const isArray = Array.isArray(arr);

  const checkDiffObject = (obj: any, oldObj: any): boolean => {
    return Object.keys(obj).some(key => {
      deleteNull(arr);
      deleteNull(oldArr);

      if (
        obj[key] &&
        oldObj[key] &&
        typeof obj[key] === 'object' &&
        typeof oldObj[key] === 'object'
      ) {
        return checkDiff(obj[key], oldObj[key]);
      }

      return obj[key] !== oldObj[key];
    });
  };

  if (isArray) {
    if (arr.length !== oldArr.length) {
      return true;
    }

    return arr.some((element: any, index: any) => {
      if (
        element &&
        oldArr[index] &&
        typeof element === 'object' &&
        typeof oldArr[index] === 'object'
      ) {
        return checkDiffObject(element, oldArr[index]);
      }

      return element !== oldArr[index];
    });
  } else {
    return checkDiffObject(arr, oldArr);
  }
}
