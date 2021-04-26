import _ from 'lodash';
import urlapi from 'url';

function sanitiseURL(string){
  let url_;

  // http or https
  if (!(string.substring(0, 7) === 'http://' || string.substring(0, 8) === 'https://')){
      return null;
  }

  try {
      url_ = document.createElement('a');
      url_.href = string;
  } catch (error) {
      try {
          url_ = urlapi.parse(string);
      } catch (error) {
          return null;
      }
  }

  // required (www.example.com)
  if (!url_.hostname || url_.hostname === '' || url_.hostname === 'localhost'){
      return null;
  }

  // optional (/some/path)
  // url_.pathname;

  // optional (?name=value)
  // url_.search;

  // optional (#anchor)
  // url_.hash;

  return `${url_.protocol}//${url_.hostname}${url_.pathname || ''}${url_.search || ''}${url_.hash || ''}`;
}

/**
 * Transform an array of objects into a dictionary of arrays of objects,
 * where the objects are grouped into arrays given an arbitrary key function
 * that gives a key for each object.
 * @param arr array of objects to group
 * @param keyAccessor function returning the grouping key for each object in the original array
 */
function arrayToDictionary<T>(arr: T[], keyAccessor: (obj: T) => string): {[key: string]: T[]} {
    return arr.reduce((obj, item) => {
        (obj[keyAccessor(item)] = obj[keyAccessor(item)] || []).push(item);
        return obj;
    }, {});
}

/**
 * Parse a string containing an ISO8601 formatted date
 * @param isoUtcDate a date string in ISO8601 format, assuming UTC
 * @returns a JS Date object with the UTC time encoded
 */
function parseDate(isoUtcDate: string): Date {
    const [year, month, day, hour, minute, second, millisecond] = isoUtcDate.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d{3})Z$/)
        .splice(1)
        .map(x => parseInt(x, 10));
    return new Date(Date.UTC(year, month-1, day, hour, minute, second, millisecond));
}

function compareObjects(objA: object, objB: object): [object, object] {
    const reverse = {};
    const forward = {};
    for (const [key, value] of Object.entries(objB)) {
        if (!_.isEqual(objA[key], value)) {
            reverse[key] = objA[key];
            forward[key] = value;
        }
    }
    return [forward, reverse];
}

export {
  sanitiseURL,
  arrayToDictionary,
  parseDate,
  compareObjects
};
