import urlapi from 'url';

function sanitiseURL(string){
  let url_

  // http or https
  if (!(string.substring(0, 7) === 'http://' || string.substring(0, 8) === 'https://')){
      return null
  }

  try {
      url_ = document.createElement('a')
      url_.href = string
  } catch (error) {
      try {
          url_ = urlapi.parse(string)
      } catch (error) {
          return null
      }
  }

  // required (www.example.com)
  if (!url_.hostname || url_.hostname === '' || url_.hostname === 'localhost'){
      return null
  }

  // optional (/some/path)
  // url_.pathname;

  // optional (?name=value)
  // url_.search;

  // optional (#anchor)
  // url_.hash;

  return `${url_.protocol}//${url_.hostname}${url_.pathname || ''}${url_.search || ''}${url_.hash || ''}`
}

function arrayToDictionary<T>(arr: T[], keyAccessor: (obj: T) => string): {[key: string]: T[]} {
    return arr.reduce((obj, item) => {
        (obj[keyAccessor(item)] = obj[keyAccessor(item)] || []).push(item);
        return obj;
    }, {});
}

/**
 * Parse a string containing 
 * @param isoUtcDate a date string in ISO8601 format
 * 
 */
function parseDate(isoUtcDate: string): Date {
    const [year, month, day, hour, minute, second, millisecond] = isoUtcDate.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d{3})Z$/)
        .splice(1)
        .map(x => parseInt(x, 10));
    return new Date(Date.UTC(year, month-1, day, hour, minute, second, millisecond));
}

export {
    sanitiseURL,
    arrayToDictionary,
    parseDate
};
