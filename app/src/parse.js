/**
 * Utility functions for parsing
 */

/**
 * Parse a string as positive integer or NaN
 *
 * @param {string} value
 */
function strictParseInt(value) {
    if (/^([1-9][0-9]*)$/.test(value))
        return Number(value);
    return NaN;
}


function parseBuildingURL(url){
    const re = /\/building\/([^/]+).html/;
    const matches = re.exec(url);

    if (matches && matches.length >= 2) {
        return strictParseInt(matches[1])
    }
    return undefined;
}

function parseCategoryURL(url) {
    const default_cat = 'age';
    if (url === "/") {
        return default_cat
    }
    const matches = /^\/(view|edit)\/([^/.]+)/.exec(url);
    const cat = (matches && matches.length >= 3)? matches[2] : default_cat;
    return cat;
}

export { strictParseInt, parseBuildingURL, parseCategoryURL };
