/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Sebastian Ullrich
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import assert from 'assert';

class Curie {

    /**
     * Default constructor that accepts the curie link and parameters.
     * @param {*} link curie link
     * @param {*} parameters paramters to attach to curie link
     */
    constructor(link, parameters) {
        this.REGEX_MATCHER_CURIE_PARAMS = /\{\?(.+)\}/;
        this.REGEX_MATCHER_PARAM_SPIT = /\s*\,\s*/;

        assert(link, 'Link must be provided!');

        this.link = link;
        this.parameters = parameters || {};
    }

    /**
     * Constructs URI from provided link and parameters.
     * If no parameters defined a sanitized URI will be returned.
     */
    toUri() {
        assert(this.link, 'Link must be provided!');

        if (Object.getOwnPropertyNames(this.parameters).length === 0) {
            // No paramerters provided, return sanitized link
            return this.sanitize();
        }

        const processedParams = this.getParameters()
            .map(parameterName => parameterName + '=' + this.parameters[parameterName])
            .filter(parameterValue => parameterValue.length > 0);

        return this.sanitize() + '?' + processedParams.join('&');
    }

    /**
     * Sanitizes the given link by removing curies.
     */
    sanitize() {
        assert(this.link, 'Link must be provided!');
        return this.link.replace(this.REGEX_MATCHER_CURIE_PARAMS, '');
    }

    /**
     * Returns an array of all available curie paramter names.
     */
    getParameters() {
        assert(this.link, 'Link must be provided!');
        const matches = this.REGEX_MATCHER_CURIE_PARAMS.exec(this.link);
        if (!matches || !matches[1]) return [];
        return matches[1].split(this.REGEX_MATCHER_PARAM_SPIT);
    }
}

export default Curie;