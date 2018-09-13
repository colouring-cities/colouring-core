/**
 * Utility functions for parsing
 */

/**
 * Parse a string as positive integer or NaN
 *
 * @param {string} value
 */
function strictParseInt(value) {
    if (/^([1-9][0-9]+)$/.test(value))
        return Number(value);
    return NaN;
}


function parseBuildingURL(url){
    const re = /^\/building\/([1-9][0-9]+).html$/;
    const matches = re.exec(url);
    if (matches && matches.length === 2) {
        return parseInt(matches[1])
    }
    return undefined;
}

export { strictParseInt, parseBuildingURL };
