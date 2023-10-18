export function queryBuilder(
  url: string,
  params: {[key: string]: any},
): string {
  const query = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      query.push(`${key}=${params[key]}`);
    }
  }
  const queryString = query.join('&');
  if (queryString) {
    return `${url}?${queryString}`;
  }
  return url;
}
