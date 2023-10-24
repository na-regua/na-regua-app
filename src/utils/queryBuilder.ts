export function queryBuilder(
  url: string,
  params: {[key: string]: any},
  path?: string,
): string {
  if (path) {
    if (url.includes(':')) {
      url = url
        .split('/')
        .map(part => {
          if (part.includes(':')) {
            return path;
          }

          return part;
        })
        .join('/');
    } else {
      url = `${url}${url.endsWith('/') ? '' : '/'}${path}`;
    }
  }

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
