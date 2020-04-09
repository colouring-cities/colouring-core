/**
 * Utility functions for parsing
 *
 */

/**
 * Parse a string as positive integer or NaN
 *
 * @param {string} value
 * @returns {number} integer or NaN
 */
function strictParseInt(value) {
    if (/^([1-9][0-9]*)$/.test(value)) {
        return Number(value);
    }
    return NaN;
}

/**
 * Parse building ID from URL
 *
 * @param {String} url
 * @returns {number|undefined}
 */
function parseBuildingURL(url) {
    const re = /\/(\d+)(\/history)?$/;
    const matches = re.exec(url);

    if (matches && matches.length >= 2) {
        return strictParseInt(matches[1]);
    }
    return undefined;
}

/**
 * Parse category slug from URL
 *
 * @param {String} url
 * @returns {String} [age]
 */
function parseCategoryURL(url) {
    const defaultCat = 'age';
    if (url === '/') {
        return defaultCat;
    }
    const matches = /^\/(view|edit|multi-edit)\/([^/.]+)/.exec(url);
    const cat = (matches && matches.length >= 3) ? matches[2] : defaultCat;
    return cat;
}

export { strictParseInt, parseBuildingURL, parseCategoryURL };
