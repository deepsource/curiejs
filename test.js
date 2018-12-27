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

import Curie from './index.js';
import Chai from 'chai';

describe('Curie.js', function () {

    it('should initalize', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const parameters = {};
        const curie = new Curie(link, parameters);

        Chai.expect(curie.link).to.be.equal(link);
        Chai.expect(curie.parameters).to.be.equal(parameters);
    });

    it('should throw exception on empty initalize', function () {
        Chai.expect(() => new Curie()).to.throw('You must provide at least one string as link!');
    });

    it('should initalize with no parameter', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const curie = new Curie(link);

        Chai.expect(curie.link).to.be.equal(link);
        Chai.expect(curie.parameters).to.be.an('object');
        Chai.expect(curie.parameters).to.be.empty;
    });

    it('should construct valid uri', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const curie = new Curie(link);

        Chai.expect(curie.toUri()).to.be.equal('http://localhost:4000/api/entity');
    });

    it('should get parameters', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const parameters = { page: 1, size: 20, projection: 'detail' };
        const curie = new Curie(link, parameters);

        Chai.expect(curie.getParameters()).to.have.members(['page', 'size', 'projection']);
    });

    it('should construct uri with parameters', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const parameters = { page: 1, size: 20, projection: 'detail' };
        const curie = new Curie(link, parameters);

        Chai.expect(curie.toUri()).to.be.equal('http://localhost:4000/api/entity?page=1&size=20&projection=detail');
    });

    it('should only accept link as string', function () {
        Chai.expect(() => new Curie({})).to.throw('Link must be provided as string!');
    });

    it('should ignore unknown parameters', function () {
        const link = 'http://localhost:4000/api/entity{?page,size,projection}';
        const parameters = { page: 1, size: 20, projection: 'detail', foobar: true };
        const curie = new Curie(link, parameters);

        Chai.expect(curie.toUri()).to.be.equal('http://localhost:4000/api/entity?page=1&size=20&projection=detail');
    });
});
