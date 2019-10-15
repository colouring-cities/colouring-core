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

function compareObjects(objA: object, objB: object): [object, object] {
    const reverse = {}
    const forward = {}
    for (const [key, value] of Object.entries(objB)) {
        if (objA[key] !== value) {
            reverse[key] = objA[key];
            forward[key] = value;
        }
    }
    return [forward, reverse];
}

export { sanitiseURL, compareObjects }
